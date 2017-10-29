export const createArrayOf = (dataType: any, length: number): any[] => Array.apply(null, new Array(length)).map(_ => dataType);
