const DEFAULT_CONFIG = {
  method: "GET",
  async: true,
  headers: {
    Accept: "application/json",
  },
  credentials: "same-origin",
};
const request = function (url, config = DEFAULT_CONFIG) {
  const { method, async, headers, data, credentials } = config;
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHttp");
    xhr.open(method, url, async);
    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }
    // 是否携带cookie，same-origin,include,omit
    if (credentials === "include") {
      xhr.withCredentials = true;
    } else if (credentials === "omit") {
      xhr.withCredentials = false;
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
