export function IEVersion() {
    if (typeof window === 'undefined') {
        return undefined;
    }

    const match = window.navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
}
