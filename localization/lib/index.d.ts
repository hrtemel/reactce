export interface ILocalizationItems {
    [index: string]: string;
}
export interface ILocalizationItemsDefs {
    [index: string]: ILocalizationItems;
}
export declare function l(strings: TemplateStringsArray | string, ...values: any): string;
export declare function addLocale(lang: string, mx: ILocalizationItems): void;
export declare function getLocale(lang: string): ILocalizationItems;
export declare function useLocale(lang: string, warn: boolean): void;
export declare function getCurrentLocale(): string;
export default l;
