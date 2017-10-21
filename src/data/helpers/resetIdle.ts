const TIME_UNTIL_IDLE = 300000; // 300000ms = 5 minutes
let isIdle = false;

export const resetIdle = (that) => {
    if (isIdle) {
        that.setState({
            isMounted: true
        });
    }
    isIdle = false;
    clearTimeout(that.idleTimeoutId);
    that.idleTimeoutId = setTimeout(() => {
        isIdle = true;
        that.setState({
            isMounted: false
        });
    }, TIME_UNTIL_IDLE);
};
