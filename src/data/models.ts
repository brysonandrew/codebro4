export interface IDictionary<T> {
    [key: string]: T
}

export interface IInlineStyles {
    [key: string]: IDictionary<string | number>
}

export interface IParams {
    activePagePath?: string
}

export interface IPage {
    name: string
    path: string
    backgroundImagePath?: string
    component?: JSX.Element
}
