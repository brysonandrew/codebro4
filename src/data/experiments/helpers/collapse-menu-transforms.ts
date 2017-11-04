export const inAC = (s) => {
    s.draw('80% - 24', '80%', 0.3, {
        delay: 0.1,
        callback: () => inAC2(s)
    });
};

const cubicIn = (t) => {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const inAC2 = (s) => {
    s.draw('100% - 54.5', '100% - 30.5', 0.6, {
        easing: cubicIn
    });
};

export const inB = (s) => {
    s.draw(8 - 6, 32 + 6, 0.1, {
        callback: () => {
            inB2(s)
        }
    });
};

export const inB2 = (s) => {
    s.draw(8 + 12, 32 - 12, 0.3, {
        easing: cubicIn
    });
};

export const outAC = (s) => {
    s.draw('90% - 24', '90%', 0.1, {
        easing: cubicIn,
        callback: () => {
            outAC2(s)
        }
    });
};

export const outAC2 = (s) => {
    s.draw('20% - 24', '20%', 0.3, {
        callback: () => {
            outAC3(s)
        }
    });
};

export const outAC3 = (s) => {
    s.draw(8, 32, 0.7, {
        easing: cubicIn
    });
};

export const outB = (s) => {
    s.draw(8, 32, 0.7, {
        delay: 0.1,
        easing: cubicIn});
};
