function sleep(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}

sleep(2000).then((res) => {
  console.log("res", res);
});
