import {IDictionary} from '../models';

export const listeners = (el: EventTarget, type: "interaction" | "resize", action: string, callback: () => any) => {
    const events: IDictionary<string[]> = {
        interaction: [
            "mousemove",
            "click",
            "scroll",
            "wheel"
        ],
        resize: [
            "resize",
            "load"
        ]
    };
    events[type].map(type => {
        el[action](type, callback, false);
    });
};
