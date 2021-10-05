export interface ILocalizationItems{
  [index:string]:string
}

export interface ILocalizationItemsDefs{
  [index:string]:ILocalizationItems
}

const messages:ILocalizationItemsDefs={"en":{}};

let currentLocale="en";

export function l(strings:TemplateStringsArray |string,...values:any) {  
  let str=undefined;
  if (typeof(strings)==="string"){
    str=messages[currentLocale][strings] ||strings;
  }else{
    const key = strings.slice(0, -1).reduceRight((memo:string, curr:string, i:number) => `${curr}{${i}}${memo}`, strings[strings.length - 1]);
    str = messages[currentLocale][key] ||key;
  }
  if (values && values.length)
    return (str as string).replace(/{(\d)}/g, (_, index) => values[Number(index)]);
  else
    return (str as string);
};

export function addLocale(lang:string,mx:ILocalizationItems){
    messages[lang]=mx;
}

export function getLocale(lang:string){
  return messages[lang];
}

export function useLocale(lang:string,warn:boolean){
  warn && console.warn("using locale",lang);
  if (messages[lang])
    currentLocale=lang;
  else
    console.warn("no locale found "+lang);
}

export function getCurrentLocale(){
  return currentLocale;
}

export default l;