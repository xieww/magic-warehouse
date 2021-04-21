const DEFAULT_CONFIG = { method: "GET", async: true };
const request = function (url, config) {
  const { method, async, headers, data } = config || DEFAULT_CONFIG;
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHttp");
    xhr.open(method, url, async);
    xhr.setRequestHeader("Accept", "application/json");
    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    data ? xhr.send(data) : xhr.send();
  });
};
