# ES6 高频知识点

## 什么是提升？什么是暂时性死区？var、let 及 const 区别？

> 对于这个问题，我们应该先来了解提升（hoisting）这个概念。

```js
console.log(a); // undefined
var a = 1;
```

从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升，并且提升的是声明。

对于这种情况，我们可以把代码这样来看

```js
var a;
console.log(a); // undefined
a = 1;
```

接下来我们再来看一个例子

```js
var a = 10;
var a;
console.log(a);
```

对于这个例子，如果你认为打印的值为 <code>undefined</code> 那么就错了，答案应该是 <code>10</code>，对于这种情况，我们这样来看代码

```js
var a;
var a;
a = 10;
console.log(a);
```

到这里为止，我们已经了解了 <code>var</code> 声明的变量会发生提升的情况，其实不仅**变量**会提升**函数**也会被提升。

```js
console.log(a); // ƒ a() {}
function a() {}
var a = 1;
```

对于上述代码，打印结果会是 `ƒ a() {}`，即使变量声明在函数之后，这也说明了函数会被提升，并且优先于变量提升。
