import {IDictionary} from '..';

export const createArrayOf = (dataType: any, length: number): any[] => Array.apply(null, new Array(length)).map(_ => dataType);

export const arrayToDictionary = <T>(arr: T[], dictionaryIndex: string): IDictionary<T> =>
    arr.reduce((acc, curr) => {
        acc[curr[dictionaryIndex]] = curr;
        return acc;
    }, {});
