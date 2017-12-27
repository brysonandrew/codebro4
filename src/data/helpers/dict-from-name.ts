import {toPath} from './route-utils';

export const dict = (arr) => arr.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
