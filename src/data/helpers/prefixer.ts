import { IDictionary } from '../models';

export const prefixer = (obj: IDictionary<string | number>): IDictionary<string | number> => {

    if ("transform" in obj) {
        const value = obj["transform"];
        obj = {
            ...obj,
            WebkitTransform: value,
            MsTransform: value
        }
    }

    if ("filter" in obj) {
        const value = obj["filter"];
        obj = {
            ...obj,
            WebkitFilter: value
        }
    }

    return obj
};
