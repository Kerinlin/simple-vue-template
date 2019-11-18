import axios from 'axios';
axios.defaults.timeout = 10000; // 响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头

axios.defaults.retry = 5; // 重试次数
axios.defaults.retryDelay = 1000; // 重试延时
axios.defaults.shouldRetry = error => true; // 重试条件，默认只要是错误都需要重试

// 对超时进行处理
axios.interceptors.response.use(undefined, err => {
  var config = err.config;
  // 判断是否配置了重试
  if (!config || !config.retry) return Promise.reject(err);

  if (!config.shouldRetry || typeof config.shouldRetry !== 'function') {
    return Promise.reject(err);
  }

  // 判断是否满足重试条件
  if (!config.shouldRetry(err)) {
    return Promise.reject(err);
  }

  // 设置重置次数，默认为0
  config.__retryCount = config.__retryCount || 0;

  // 判断是否超过了重试次数
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  // 重试次数自增
  config.__retryCount += 1;

  // 延时处理
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // 重新发起axios请求
  return backoff.then(function () {
    return axios(config);
  });
});

// 返回一个Promise(发送post请求)
export function fetchpost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
/// /返回一个Promise(发送get请求)
export function fetchget(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export default {
  fetchpost,
  fetchget,
};
