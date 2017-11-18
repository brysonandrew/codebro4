const TIME_UNTIL_IDLE = 30000; // 300000ms = 5 minutes
let isAsleep = true;

export const wakeUp = (that) => {
    if (isAsleep) {
        // wake up!
        that.props.store.onAwake(true);
    }
    isAsleep = false;
    clearTimeout(that.idleTimeoutId);
    that.idleTimeoutId = setTimeout(() => {
        // go to sleep...
        isAsleep = true;
        that.props.store.onAwake(false);
    }, TIME_UNTIL_IDLE);
};
