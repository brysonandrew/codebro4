const params = [
    "/",
    "activePagePath",
    "activeViewPath"
];

export const toParams =
    (path) =>
        path.split("/")
            .reduce((acc, curr, i) => {
                acc[params[i]] = curr;
                return acc;
            }, {});

export const toPath =
    (name) =>
        name.replace(/-/g, "")
            .replace(/\s/g, "-")
            .replace(/[.,]/g, "")
            .toLowerCase();
