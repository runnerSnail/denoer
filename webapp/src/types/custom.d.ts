declare module '*.json' {
    const value: any;
    export default value;
}
declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png' {
    const value: any;
    export default value;
}
declare module '*.jpg' {
    const value: any;
    export default value;
}