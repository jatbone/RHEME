export declare const isFunction: (value: any) => any;
export declare const get: (obj: any, path: string, defValue?: null) => any;
export declare const set: (obj: any, path: string[] | string, value: any) => any;
export declare const processConfig: (obj: object) => {
    [key: string]: string;
};
export declare const getThemeCssPropName: (path: string, prefix?: string) => string;
export declare const setDocumentStyleProperty: (fullPath: string, newValue: string) => void;
export declare function r(refPath: string, cb?: (value: string) => string | null): (from: any) => {
    refPath: string;
    value: any;
    cb: ((value: string) => string | null) | undefined;
};
export declare const getFullPath: (path: string, prop: string) => string;
