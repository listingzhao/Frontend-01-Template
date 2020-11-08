// 构造函数
function PromiseT(fn) {
    this.status = 'pending';
    this.data = undefined;
    this.onFullfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve = (value) => {
        if (this.status === 'pending') {
            this.status = 'resolved';
            this.data = value;
            setTimeout(() => {
                for (let i = 0; i < this.onFullfilledCallback.length; i++) {
                    this.onFullfilledCallback[i](value);
                }
            });
        }
    };
    const reject = (err) => {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.data = value;
            setTimeout(() => {
                for (let i = 0; i < this.onRejectedCallback.length; i++) {
                    this.onRejectedCallback[i](value);
                }
            });
        }
    };

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// then
PromiseT.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled =
        typeof onFulfilled === 'function'
            ? onFulfilled
            : function (v) {
                  return v;
              };
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : function (r) {
                  return r;
              };

    // Promise 存在三种状态
    if (this.status === 'resolved') {
        return new PromiseT((resolve, reject) => {
            setTimeout(() => {
                try {
                    let ret = onFulfilled(this.data);
                    if (ret instanceof PromiseT) {
                        ret.then(resolve, reject);
                    } else {
                        resolve(ret);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (this.status === 'rejected') {
        return new PromiseT((resolve, reject) => {
            setTimeout(() => {
                try {
                    let ret = onRejected(this.data);
                    if (ret instanceof PromiseT) {
                        ret.then(resolve, reject);
                    } else {
                        resolve(ret);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (this.status === 'pending') {
        // 状态处在pending 不能确定调用 onFulfilled 或 onRejected 只能等到状态确定后才能决定
        return new PromiseT((resolve, reject) => {
            this.onFullfilledCallback.push((value) => {
                setTimeout(() => {
                    try {
                        let ret = onFulfilled(this.data);
                        if (ret instanceof PromiseT) {
                            ret.then(resolve, reject);
                        } else {
                            resolve(ret);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            this.onRejectedCallback.push((value) => {
                setTimeout(() => {
                    try {
                        let ret = onRejected(this.data);
                        if (ret instanceof PromiseT) {
                            ret.then(resolve, reject);
                        } else {
                            resolve(ret);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        });
    }
};

// catch
PromiseT.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

// const p = new PromiseT((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 2000);
// });

// p.then((v) => {
//     console.log(v);
//     return 2;
// })
//     .then((v) => {
//         console.log(v);
//         return new PromiseT((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(3);
//             }, 3000);
//         });
//     })
//     .then((v) => {
//         console.log(v);
//     });

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 2000);
// });

// p2.then((v) => {
//     console.log(v);
//     return 2;
// })
//     .then((v) => {
//         console.log(v);
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(3);
//             }, 3000);
//         });
//     })
//     .then((v) => {
//         console.log(v);
//     });

// 极简玩具版本
// class Prome {
//     callbacks = [];
//     state = 'pending'; // 初始
//     value = null;
//     constructor(fn) {
//         fn(this._resolve.bind(this));
//     }
//     then(onFulfilled) {
//         if (this.state === 'pending') {
//             this.callbacks.push(onFulfilled);
//         } else {
//             onFulfilled(this.value);
//         }
//         return this;
//     }
//     _resolve(value) {
//         this.state = 'fulfilled';
//         this.value = value;
//         this.callbacks.forEach((fn) => fn(value));
//     }
// }

let promiseCount = 1;

class Prome {
    callbacks = [];
    state = 'pending'; // 初始
    value = null;
    constructor(fn) {
        this.name = `Promise-${promiseCount++}`;
        console.log('[%s]:constructor', this.name);
        fn(this._resolve.bind(this), this._reject.bind(this));
    }

    static resolve(value) {
        if (value && value instanceof Prome) {
            return value;
        } else if (value && typeof value === 'object' && typeof value.then === 'function') {
            let then = value.then;
            return new Prome((resolve) => {
                then(resolve);
            });
        } else if (value) {
            return new Prome((resolve) => resolve(value));
        } else {
            return new Prome((resolve) => resolve());
        }
    }

    static reject(value) {
        if (value && typeof value === 'object' && typeof value.then === 'function') {
            let then = value.then;
            return new Prome((resolve, reject) => {
                then(reject);
            });
        } else {
            return new Prome((resolve, reject) => reject(value));
        }
    }

    static all(promises) {
        return new Prome((resolve, reject) => {
            const itemNum = promises.length;
            let rets = Array.from({ length: itemNum });
            let fulfilledCount = 0;
            promises.forEach((item, i) => {
                Prome.resolve(item).then(
                    (res) => {
                        fulfilledCount++;
                        rets[i] = res;
                        if (fulfilledCount === itemNum) {
                            resolve(rets);
                        }
                    },
                    (err) => reject(err)
                );
            });
        });
    }

    static race(promises) {
        return new Prome((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                Prome.resolve(promises[i]).then(
                    (res) => resolve(res),
                    (err) => reject(err)
                );
            }
        });
    }

    then(onFulfilled, onRejected) {
        console.log('[%s]:then', this.name);
        return new Prome((resolve, reject) => {
            this._handle({
                onFulfilled,
                onRejected,
                resolve,
                reject,
            });
        });
    }

    catch(onError) {
        return this.then(null, onError);
    }

    finally(onDone) {
        if (typeof onDone !== 'function') {
            return this.then();
        }
        let Promise = this.constructor;
        console.log(Promise);

        return this.then(
            (value) => Promise.resolve(onDone()).then(() => value),
            (err) =>
                Promise.resolve(onDone()).then(() => {
                    throw err;
                })
        );
    }

    _handle(cb) {
        console.log('[%s]:_handle', this.name, 'state=', this.state);
        if (this.state === 'pending') {
            this.callbacks.push(cb);
            console.log('[%s]:_handle', this.name, 'callbacks=', this.callbacks);
            return;
        }

        let onFunc = this.state === 'fulfilled' ? cb.onFulfilled : cb.onRejected;
        let func = this.state === 'fulfilled' ? cb.resolve : cb.reject;
        // 如果 then 没传递值
        if (!cb) {
            func(this.value);
            return;
        }
        let res;

        try {
            res = onFunc(this.value);
        } catch (e) {
            res = e;
            func = cb.reject;
        } finally {
            func(res);
        }
    }

    _resolve(value) {
        console.log('[%s]:_resolve', this.name);
        console.log('[%s]:_resolve', this.name, 'value=', value);

        if (value && (typeof value === 'function' || typeof value === 'object')) {
            let then = value.then;
            if (typeof then === 'function') {
                then.call(value, this._resolve.bind(this), this._reject.bind(this));
                return;
            }
        }

        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach((cb) => this._handle(cb));
    }

    _reject(error) {
        this.state = 'rejected';
        this.value = error;
        this.callbacks.forEach((cb) => this._handle(cb));
    }
}

const mockAjax = (url, s, callback) => {
    setTimeout(() => {
        callback(url + '异步请求耗时' + s + '秒');
    }, 1000 * s);
};

// new Prome((resolve, reject) => {
//     mockAjax('getUserId', 1, function (result, error) {
//         if (error) {
//             reject(error);
//         } else {
//             resolve(result);
//         }
//     });
// })
//     .then((result) => {
//         console.log(a);
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     .finally(() => {
//         console.log('onDone');
//     });

const p1 = new Prome((resolve, reject) => {
    setTimeout(() => resolve('p1'), 1000);
});

const p2 = new Prome((resolve, reject) => {
    setTimeout(() => resolve('p2'), 5000);
});

Prome.all([p1, p2]).then((rets) => {
    console.log(rets); // ['p1','p2']
});
// new Prome((resolve) => {
//     mockAjax('getUserId', 1, function (result) {
//         resolve(result);
//     });
//     // resolve('getUserId同步请求');
// })
//     .then((result) => {
//         console.log(result);
//         return '前置:' + result;
//     })
//     .then((exResult) => {
//         console.log(exResult);
//     });

// const pUserId = new Prome((resolve) => {
//     mockAjax('getUserId', 1, function (result) {
//         resolve(result);
//     });
// });
// const pUserName = new Prome((resolve) => {
//     mockAjax('getUserName', 2, function (result) {
//         resolve(result);
//     });
// });

// pUserId
//     .then((id) => {
//         console.log(id);
//         return pUserName;
//     })
//     .then((name) => {
//         console.log(name);
//     });

// 1. 精简
// 2. 链式调用
// 3. 延迟机制
// 4. 实现状态

// let jP = new Prome((resolve) => {
//     console.log('tb');
//     resolve('tb');
// });

// jP.then((v) => {
//     console.log('then1', v);
// }).then((v) => {
//     console.log('then2', v);
// });

// setTimeout(() => {
//     jP.then((v) => {
//         console.log('then3', v);
//     });
// });

// 正规

// const promise = new Promise((resovle) => {
//     console.log('1');
//     resovle('a');
// });
// promise.then(() => {
//     console.log('2');
// });
// console.log('3');

// toyPromise

// console.log('=======toyPromise=======');

// const promise2 = new Prome((resovle) => {
//     console.log('1');
//     resovle('a');
// });
// promise2.then(() => {
//     console.log('2');
// });
// console.log('3');
