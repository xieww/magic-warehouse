function http(value, flag){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(Math.random() < 0.5){ // 设定一个成功或者失败的条件
        resolve(value)
        console.log(flag?'重新请求成功':'第一次请求成功',value)
      }else{
        console.log(flag?'重新请求失败':'第一次请求失败',value)
        resolve(http(value,true))
      }
    }, 2000)
  })
}
let A = http('A');
let B = http('B');
let C = http('C');
let D = http('D');

Promise.all([A,B,C,D]).then(res=>{
  console.log('成功',res)
})