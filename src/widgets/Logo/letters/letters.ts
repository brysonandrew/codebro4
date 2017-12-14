const x = [
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 2
    },
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 3
    },
    {
        type: "forward",
        columnIndex: 3,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 3
    }
];

const c = [
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 3
    }
];
const o = [
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 3
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 3,
        rowIndex: 2
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 3
    },
];

const d = [
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 2
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 3
    },
];
const e = [
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 3
    }
];

const b = [
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 2
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 3
    }
];
const r = [
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 3
    }
];
const l = [
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 3
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 3
    }
];
const g = [
    {
        type: "forward",
        columnIndex: 2,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 3
    },
    {
        type: "forward",
        columnIndex: 3,
        rowIndex: 3
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 3
    },
];
const w = [
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 0,
        rowIndex: 3
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 3
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 3
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 3,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 2
    },
    {
        type: "forward",
        columnIndex: 3,
        rowIndex: 3
    }
];
const k = [
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 0
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 1,
        rowIndex: 3
    },
    {
        type: "forward",
        columnIndex: 0,
        rowIndex: 0
    },
    {
        type: "forward",
        columnIndex: 1,
        rowIndex: 1
    },
    {
        type: "backward",
        columnIndex: 2,
        rowIndex: 2
    },
    {
        type: "backward",
        columnIndex: 3,
        rowIndex: 3
    }
];

export let findLetter = (letter) => {
    let ltr = letter.toLowerCase();
    if        (ltr === "x") { return x;
    } else if (ltr === "c") { return c;
    } else if (ltr === "o") { return o;
    } else if (ltr === "d") { return d;
    } else if (ltr === "e") { return e;
    } else if (ltr === "b") { return b;
    } else if (ltr === "r") { return r;
    } else if (ltr === "l") { return l;
    } else if (ltr === "g") { return g;
    } else if (ltr === "w") { return w;
    } else if (ltr === "k") { return k;
    }
    return [];
};
