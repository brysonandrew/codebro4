export const Fonts = () => {
    adventProFont();
    inconsolataFont();
};

const adventProFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Advent+Pro';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
};

const inconsolataFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Inconsolata';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
};
