/**
 * 算术表达式求值 该类是一个能够解释给定字符串所表达的运算并计算得到结果的程序
 *
 * 控制台输入一个需要计算的算术表达式：由左右括号、运算符、算术表达式组成的表达式 运算优先级有括号()确定。运算符支持+、-、*和接收一个参数的算术平方根。
 * 计算过程： 用两个栈：一个栈存运算符，一个存操作数 运算式忽略左括号 将操作数压栈 将运算符压栈
 * 在遇到右括号时，弹出一个运算符，弹出所需数量的操作数，并将运算符合操作数的运算结果压入操作数栈
 * 最后操作数栈中存的即是 表达式的值
 */
//  public class Evaluate {
//   public static void main(String[] args) {
//       // 运算符栈
//       Stack<String> ops = new Stack<>();
//       // 操作数栈
//       Stack<Double> vals = new Stack<>();
//       System.out.println("请输入算术表达式 一个字符一行:");
//       Scanner scanner = new Scanner(System.in);
//       while (scanner.hasNext()) { // ctrl+z结束
//           String s = scanner.next().trim();
//           // 如果是字符 压入运算符栈中
//           if (s.equals("(")) ;
//           else if (s.equals("+")) {
//               ops.push(s);
//           }
//           else if (s.equals("*")) {
//               ops.push(s);
//           } else if (s.equals("/")) {
//               ops.push(s);
//           } else if (s.equals("sqrt")) {
//               ops.push(s);
//           } else if (s.equals(")")) {
//               String op = ops.pop();
//               double val = vals.pop();
//               if (op.equals("+"))
//                   val = vals.pop() + val;
//               else if (op.equals("-"))
//                   val = vals.pop() - val;
//               else if (op.equals("*"))
//                   val = vals.pop() * val;
//               else if (op.equals("/")) {
//                   if (val == 0) {
//                       System.out.println("被除数为0");
//                       return;
//                   }
//                   val = vals.pop() / val;
//               } else if (op.equals("sqrt"))
//                   val = Math.sqrt(val);
//               vals.push(val);
//           } else { // 若既不是运算符也不是括号，则将它作为double压入栈
//               vals.push(Double.parseDouble(s));
//           }
//       }
//       System.out.println(vals.pop());
//   }
// }

function calculator(s) {
  var q = [];
  let n = "";
  let f = "+";
  let a = typeof s === "string" ? Array.from(s).reverse() : s;
  while (a.length || n) {
    var p = a.pop();
    if (p === " ") {
      continue;
    }
    if (p === "(") {
      n = calculator(a);
    } else if (/\D/.test(p)) {
      switch (f) {
        case "+":
          q.push(n);
          break;
        case "-":
          q.push(-n);
          break;
        case "*":
          q.push(q.pop() * n);
          break;
        case "/":
          q.push((q.pop() / n) | 0);
      }
      if (p === ")") {
        break;
      }
      f = p;
      n = "";
    } else {
      n += p;
    }
  }
  return q.reduce((p, v) => p + (v | 0), 0);
}

console.log(calculator("4*5+(8/4)-3"));
console.log(calculator("((2 + (3 * 2) ) * (2 + 3) + (3 - 1) )"));
