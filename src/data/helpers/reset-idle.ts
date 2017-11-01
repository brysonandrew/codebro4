const TIME_UNTIL_IDLE = 30000; // 300000ms = 5 minutes
let isIdle = false;

export const resetIdle = (that) => {
    if (isIdle) {
        // wake up!
        that.props.store.onAppMount(true);
    }
    isIdle = false;
    clearTimeout(that.idleTimeoutId);
    that.idleTimeoutId = setTimeout(() => {
        // go to sleep...
        isIdle = true;
        that.props.store.onAppMount(false);
    }, TIME_UNTIL_IDLE);
};
