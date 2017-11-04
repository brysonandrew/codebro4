import {IDictionary} from '../models';

export const listeners = (el: EventTarget, action: string, type: "interaction" | "resize" | "game", callback: () => any) => {
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
        ],
        game: [
            "keypress",
            "keyup",
            "mousemove"
        ]
    };
    events[type].map(type => {
        el[action](type, callback, false);
    });
};
