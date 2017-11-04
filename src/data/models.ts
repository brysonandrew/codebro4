export interface IDictionary<T> {
    [key: string]: T
}

export interface IInlineStyles {
    [key: string]: IDictionary<string | number>
}

export interface IParams {
    activePagePath?: string
    activeViewPath?: string
}

export interface IPage {
    name: string
    path: string
    component?: JSX.Element
}

export interface IWork {
    name: string
    link: string
}

export interface ILabProject {
    name: string
    path: string
    technologies: string[] | null
    component: JSX.Element
    subComponents?: any[]
}
