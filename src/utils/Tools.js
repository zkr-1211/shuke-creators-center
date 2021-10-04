class Tools {
    /* 函数节流 */
    static throttle(fn, interval) {
        let timer; // 维护一个 timer
        let delay = interval || 500; // 设置间隔时间，如果interval不传，则默认500ms
        return function () {
            let _this = this;
            let args = arguments;
            if (timer) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(_this, args);
                timer = null;
                // 在interval后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
            }, delay);
        };
    }

    /* 函数防抖 */
    static debounce(fn, interval) {
        let timer; // 维护一个 timer
        let delay = interval || 1000; // 间隔时间，如果interval不传，则默认1000ms
        return function () {
            let that = this;
            let args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                fn.apply(that, args); // 用apply指向调用debounce的对象，相当于this.fn(args);
            }, delay);
        };
    }
}

export default Tools;
