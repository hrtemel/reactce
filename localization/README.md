

# Introduction

@documentica/localization is **a simple but very useful localization library** written by Haydar Rıdvan TEMEL, as a part of **[Documentica Project](http://documentica.com)**.

It does **not** support most of the standard localization features such as plurals, context, format. But it provides complete localization solution to **all types of javascript projects**.

# Code

In fact, whole library consists of  3 lines of code

```javascript
...
const  messages={"en":{}};
const lang="en";
...
export  function  l(strings:string[], ...values:any) {
	const  key  =  strings.slice(0, -1).reduceRight((memo:string, curr:string, i:number) =>  `${curr}{${i}}${memo}`, strings[strings.length  -  1]);
	const  str  =  messages[currentLocale][key] ||key;
	return  str.replace(/{(\d)}/g, (_, index) =>  values[Number(index)]);
};
...
```
[Complete Code](https://github.com/hrtemel/documentica-localization/blob/master/src/index.ts)

# Install

```sh
$ npm install --save @documentica.localization
```
```
$ yarn add @documentica.localization
```
# Samples

## Pure Javascript Sample

```javascript
const {default:l,useLocale,addLocale}=require("@documentica/localization");
addLocale("tr",{
	"Showing {0}th item of {1}":"{1} elemandan {0}. gösteriliyor"
});

for (var  i=0;i<5;i++){
	if (i%2)
		useLocale("tr");
	else
		useLocale("en");
	console.log(l`Showing ${i+1} item of ${5}`);
}
```
Result:
```
Showing 1 item of 5
5 elemandan 2 gösteriliyor
Showing 3 item of 5
5 elemandan 4 gösteriliyor
Showing 5 item of 5
```
## React Sample

### init.js
```javascript
import  turkishLocales  from  './localization.tr';
import {useLocale,addLocale} from  '@documentica/localization';

....
addLocale2("tr",turkishLocales);
useLocale("tr");
...

```
### localization.tr.js
```javascript 
export  default {
...
	"Ok":"Tamam",
	"Cancel":"İptal",
	"Ok button clicked {0}":"Tamam düğmesi{0} kez tıklandı.",
	"Cancel button clicked {0}":"İptal düğmesi{0} kez tıklandı."
...
}
```
### Component.js
```javascript
import  React  from  'react';
import { DefaultButton, PrimaryButton } from  'office-ui-fabric-react/lib/Button';
import  l  from  '@documentica/localization';

export  default  class  ButtonTest  extends  React.Component{
	state={
		okCount:0,
		cancelCount:0
	};
	render() {
		return <div>
			<PrimaryButton  onClick={()=> this.setState({okCount:this.state.okCount+1},console.log(l`Ok button clicked ${this.state.okCount}`))}>
				{l`OK`}  
			</PrimaryButton>
			<DefaultButton  onClick={this.setState({cancelCount:this.state.cancelCount+1},console.log(l`Cancel button clicked ${this.state.okCount}`))}>
				{l`Cancel`}
			</DefaultButton>
		</div>;
	}
}
```

## Finding Missing Locales
Execute command:
```sh
$ docu-missing-items
```
```sh
$ node_modules/.bin/docu-missing-items
```
This command finds all localized resources in your source codes and returns a set of localization data to enable  direct copying  to javascript file
```sh
	"Cancel":"Cancel",
	"Cancel button clicked {0}":"Cancel button clicked {0}",
	"OK":"OK",
	"Ok button clicked {0}":"Ok button clicked {0}",
 ```

### Restrictions
docu-missing-locales command is on development stage, so
- it can find only single line localizations strings,
- it requires one localization string in any line.

# Advanced Topics

## Localization with constants

If your project contains constants in functions like 
```javascript
import  React  from  'react';
import  l  from  '@documentica/localization';

export const getHttpStatus(statusCode){
	const statuses={
		200:l`Ok`,
		404:l`Resource Not Found`,
		500:l`Internal Server Error`
	};
	return statuses[statusCode];
}
```
you can change language in code wherever you want, because the localized texts are recalculated whenever you access this function. 

But if your project contains constants in module scope like

```javascript
import  React  from  'react';
import  l  from  '@documentica/localization';
const statuses={
	200:l`Ok`,
	404:l`Resource Not Found`,
	500:l`Internal Server Error`
};
	
export const getHttpStatus(statusCode){	
	return statuses[statusCode];
}
```

your localized texts are calculated when module is loaded. In this case, you must be sure that localization stuff is done before this module is loaded. Since there is no way to select module order in node-js, you can initialize whole project after localization is finished. 

Dynamic import after localization stuff sample: 

```javascript
import  turkishLocales  from  './definitions/locales/tr';
import {useLocale,addLocale} from  '@documentica/localization';
addLocale("tr",turkishLocales);
useLocale("tr");

function  init() {
	import(/* webpackChunkName: "main-app" */  './App');
}

init();

```
 
