const { Parser } = require("node-sql-parser");
const parser = new Parser();

/**
 * 解析 SQL 并遍历 AST 记录字段与表的对应关系及别名
 * @param {string} sql - 需要解析的 SQL 查询
 * @returns {Object} 包含字段与表的对应关系及别名映射
 */
function traverseAST(sql) {
  let ast;
  try {
    ast = parser.astify(sql);
  } catch (e) {
    console.error("SQL解析错误:", e.message);
    return;
  }

  const fieldTableMap = {}; // 字段与表的对应关系 (字段 -> [表1, 表2, ...])
  const aliasFieldMap = {}; // 字段别名与字段的对应关系

  /**
   * 递归遍历 AST
   * @param {Object|Array} node - 当前 AST 节点
   * @param {Object} context - 当前上下文中的表别名映射
   */
  function traverse(node, context = {}) {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach((child) => traverse(child, context));
      return;
    }

    switch (node.type) {
      case "select":
        handleSelect(node, context);
        break;
      case "binary_expr":
      case "or":
      case "and":
        traverse(node.left, context);
        traverse(node.right, context);
        break;
      case "unary_expr":
        traverse(node.expr, context);
        break;
      case "function":
        if (node.args && node.args.expr) {
          traverse(node.args.expr, context);
        } else if (node.args && Array.isArray(node.args)) {
          node.args.forEach((arg) => traverse(arg, context));
        }
        break;
      case "case":
        if (node.args) {
          node.args.forEach((arg) => traverse(arg, context));
        }
        break;
      case "when":
        traverse(node.cond, context);
        traverse(node.result, context);
        break;
      case "column_ref":
        handleColumnRef(node, context);
        break;
      case "value_list":
        traverse(node.value, context);
        break;
      case "expr_list":
        traverse(node.value, context);
        break;
      case "subquery":
        traverse(node.query, context);
        break;
      default:
        // 处理其他可能的表达式类型
        break;
    }
  }

  /**
   * 处理 SELECT 语句
   * @param {Object} node - SELECT 节点
   * @param {Object} parentContext - 父级上下文中的表别名映射
   */
  function handleSelect(node, parentContext) {
    // 创建当前作用域的上下文副本
    const currentContext = { ...parentContext };

    // 处理 FROM 子句，更新当前上下文的表别名映射
    if (node.from) {
      node.from.forEach((fromItem) => {
        if (fromItem.table) {
          const tableName = fromItem.db ? `${fromItem.db}_${fromItem.table}`: `${fromItem.table}`;
          const alias = fromItem.as || tableName;
          currentContext[alias] = tableName;
        } else if (fromItem.type === "subquery") {
          // 处理子查询
          const subAlias = fromItem.as;
          if (subAlias) {
            // 递归处理子查询，获取子查询的字段与表映射
            traverse(fromItem, currentContext);
            // 在当前上下文中将子查询的别名映射为子查询
            currentContext[subAlias] = subAlias; // 这里假设子查询作为一个虚拟表
          }
        } else if (fromItem?.expr?.ast) {
          traverse(fromItem?.expr.ast, currentContext);
        }
      });
    }

    // 处理 JOIN 子句，更新当前上下文的表别名映射
    if (node.join) {
      node.join.forEach((joinItem) => {
        if (joinItem.type === "table") {
          const tableName = joinItem.table;
          const alias = joinItem.as || tableName;
          currentContext[alias] = tableName;
        } else if (joinItem.type === "subquery") {
          const subAlias = joinItem.as;
          if (subAlias) {
            traverse(joinItem, currentContext);
            currentContext[subAlias] = subAlias;
          }
        }

        // 处理 ON 条件
        if (joinItem.on) {
          traverse(joinItem.on, currentContext);
        }
      });
    }

    // 处理 SELECT 字段
    if (node.columns) {
      node.columns.forEach((column) => {
        if (column.expr) {
          traverse(column.expr, currentContext);
          // 处理别名
          if (column.as && column.expr.type === "column_ref") {
            const originalField = column.expr.column;
            aliasFieldMap[column.as] = originalField;
          }
        } else if (column.type === "expression") {
          traverse(column, currentContext);
        }
      });
    }

    // 处理 WHERE, GROUP, HAVING, ORDER 等子句
    const clauseTypes = ["where", "group", "having", "order", "limit", "into"];
    clauseTypes.forEach((clause) => {
      if (node[clause]) {
        traverse(node[clause], currentContext);
      }
    });
  }

  /**
   * 处理列引用
   * @param {Object} node - column_ref 节点
   * @param {Object} context - 当前上下文中的表别名映射
   */
  function handleColumnRef(node, context) {
    const tableAlias = node.table;
    const columnName = node.column;

    if (tableAlias) {
      const actualTable = context[tableAlias];
      if (actualTable) {
        if (!fieldTableMap[columnName]) {
          fieldTableMap[columnName] = new Set();
        }
        fieldTableMap[columnName].add(actualTable);
      } else {
        // 如果别名未在上下文中找到，仍记录别名
        if (!fieldTableMap[columnName]) {
          fieldTableMap[columnName] = new Set();
        }
        fieldTableMap[columnName].add(tableAlias);
      }
    } else {
      // 无表别名时，尝试匹配所有可能的表
      Object.keys(context).forEach((alias) => {
        const table = context[alias];
        if (!fieldTableMap[columnName]) {
          fieldTableMap[columnName] = new Set();
        }
        fieldTableMap[columnName].add(table);
      });
    }
  }

  // 开始遍历 AST
  traverse(ast);

  console.log('fieldTableMap',fieldTableMap)
  // 将 Set 转换为数组
  const fieldTableMapFinal = {};
  for (const [field, tables] of Object.entries(fieldTableMap)) {
    fieldTableMapFinal[field] = Array.from(tables);
  }

  return { fieldTableMap: fieldTableMapFinal, aliasFieldMap };
}

// 示例 SQL 语句
const sql = `
select
  max(case 
      when coalesce(new_account_status,lst_mon_account_status) not in ('r1-3','r2-4')
      and biz_type in ('41','42','43')
      and biz_regulator_code <> 'D20000000'
      then coalesce(t5.credit_amt,t2.account_credit_amount,t2.loan_amount,0)
      else -1
      end
      ) as RT_UNKNOWN_CREDIT_AMT,
  max(case 
      when coalesce(new_account_status,lst_mon_account_status) not in ('r1-3','r2-4')
      and secured_type = '6'
      and biz_type in ('41','42','43')
      and biz_regulator_code <> 'D20000000'
      then coalesce(t5.credit_amt,t2.account_credit_amount,t2.loan_amount,0)
      else -1
      end
      ) as RT_UNKNOWN_EDIT_CREDIT_AMT,
  sum(case 
      when coalesce(new_account_status,lst_mon_account_status) not in ('r1-3','r2-4')
      and account_type in ('r1')
      and biz_regulator_code <> 'D20000000'
      then coalesce(t3.new_balance,t4.lst_mon_balance,t5.used_amt,0)
      else 0
      end
      ) as RT_UNKNOWN_EDIT_CREDIT_TOTAL_AMT
from (
    select t1.entity_code_
           ,t1.reportno_ as query_no
    from credit_table.headerBlock_headerUnit_signSegment_ t1
    left join credit_table.headerBlock_headerUnit_requestSegment_ t2
    on t1.entity_code_ = t2.entity_code_
    and t1.parent_id_ = t2.parent_id_
    where t2.certNo_ is not null
    group by t1.entity_code_
            ,t1.reportno_
) t1
left join (
    select entity_code_
          ,parent_id_
          ,bizType_ as biz_type
          ,accountCount_ as account_count
          ,accountType_ as account_type
          ,bizRegulatorCode_ as biz_regulator_code
          ,bizRegulatorType_ as biz_regulator_type
          ,securedType_ as secured_type
          ,currency_ as currency
          ,issuanceDate_ as issuance_date
          ,accountCreditAmount_ as account_credit_amount
          ,loanAmount_ as loan_amount
          ,creditArgeementNo_ as credit_argeement_no
    from credit_table.accountBlock_accountUnitList_baseSegment_
    where bizType_ in ('31','42','77','66')
) t2
on t1.entity_code_ = t2.entity_code_
left join (
    select entity_code_
          ,parent_id_
          ,coalesce(balance_,0) as new_balance
          ,accountStatus_ as new_account_status
    from credit_table.accountBlock_accountUnitList_westSegment_
  ) t3
on t2.entity_code_ = t3.entity_code_
and t2.parent_id_ = t3.parent_id_
left join (
    select entity_code_
          ,parent_id_
          ,coalesce(balance_,0) as lst_mon_balance
          ,accountStatus_ as lst_mon_account_status
    from credit_table.accountBlock_accountUnitList_latSegment_
  ) t4
on t2.entity_code_ = t4.entity_code_
and t2.parent_id_ = t4.parent_id_
left join (
    select entity_code_
          ,creditAmount_ as credit_amt
          ,creditArgeementNo_ as credit_no
          ,usedAmount_ as used_amt
          ,creditAmountUse_ as credit_amt_use
    from credit_table.agreemenntBlock_agreementUnitList_agreementBaseSegment_
    where creditAgreementStatus_ = '1'
) t5
on t2.entity_code_ = t5.entity_no
and t2.credit_argeement_no = t5.credit_no
`;

const s = `
SELECT fuser_id, datediff('2022-06-26', fdate_max) AS fconsecutive_days
FROM (
    SELECT fuser_id, max(fdate) AS fdate_max
    FROM t_user_attendence
    WHERE fis_sign_in = 0
    GROUP BY fuser_id
) t1;
`;

// 执行遍历
const { fieldTableMap, aliasFieldMap } = traverseAST(sql);

// 输出结果
console.log("字段与表的对应关系:", fieldTableMap, aliasFieldMap);
for (const [field, tables] of Object.entries(fieldTableMap)) {
  console.log(`字段: ${field}, 表: ${tables.join(", ")}`);
}

console.log("\n字段别名与字段的对应关系:");
for (const [alias, field] of Object.entries(aliasFieldMap)) {
  console.log(`别名: ${alias}, 字段: ${field}`);
}
