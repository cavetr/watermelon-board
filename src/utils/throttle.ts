export function throttle(fn: (...args: any) => void, interval = 100) {
  let lastTime = 0;
  const _throttle = function (this: unknown, ...args: any) {
    const nowTime = new Date().getTime();
    const remainTime = nowTime - lastTime;
    if (remainTime - interval >= 0) {
      fn.apply(this, args);
      lastTime = nowTime;
    }
  }
  return _throttle;
}