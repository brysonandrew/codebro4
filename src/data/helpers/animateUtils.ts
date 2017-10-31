export const linearize = (n: number, origin: number, target: number): number => {
    return origin * (n / 100)  + (target - target * n / 100);
};

export const interval = (dur: number, iterations: number, action: () => void) => {
    let count = 0;

    let intervalId = setInterval(() => {
        if (count < iterations) {
            count++;
            action();
        } else {
            clearInterval(intervalId);
        }
    }, dur);

};
