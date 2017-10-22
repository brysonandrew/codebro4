export function buildMap(obj) {
    let map = new Map();
    Object.keys(obj).map(key => {
        map.set(key, obj[key]);
    });
    return map;
}
