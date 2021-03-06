import {IDictionary} from '..';

export const isArray = (x) => x.constructor === Array;

export const createArrayOf = (dataType: any, length: number): any[] => Array.apply(null, new Array(length)).map(_ => dataType);

export const arrayToDictionary = <T>(arr: T[], dictionaryIndex: string): IDictionary<T> =>
    arr.reduce((acc, curr) => {
        acc[curr[dictionaryIndex]] = curr;
        return acc;
    }, {});

export function createArray(length: number): null[] {
    return Array.apply(null, new Array(length));
}

export function setInArray(arr, index, val) {
    return Object.assign([...arr], {[index]: val});
}

export function sortByName(a, b) {
    if (typeof a.name === 'number') {
        return a.name - (b.name as any);
    } else {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
}

export function sortBy(prop, a, b) {
    if (typeof a[prop] === 'number') {
        return a[prop] - (b[prop] as any);
    } else {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    }
}
