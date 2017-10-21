export const setBodyStyle = (property: string, value: string | number) => {
    document.body.style[property] = value;
    document.documentElement.style[property] = value;
};
