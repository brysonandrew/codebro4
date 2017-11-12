const GOOGLE_FONT_STRING = "Mallanna";
export const CSS_FONT_STRING = GOOGLE_FONT_STRING.replace(/\+/g, " ");

export const Fonts = () => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css?family=${GOOGLE_FONT_STRING}`;
    link.rel = 'stylesheet';

    document.head.appendChild(link);
};
