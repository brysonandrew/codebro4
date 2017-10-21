export const Fonts = () => {
    adventProFont();
};

const adventProFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Advent+Pro';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
};
