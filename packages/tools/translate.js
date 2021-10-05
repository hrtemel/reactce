#!/usr/bin/env node

var fs=require("fs");
const {Translate} = require('@google-cloud/translate').v2;
const fetch = require('node-fetch');
const translate = new Translate();

async function executeLocate(locale,translationItems){
    fs.readFile("./src/locales/"+locale+".json", async function (err, data) {
        if (err) 
            throw err;
        const existingItems= JSON.parse(data);
        const existingKeys=Object.keys(existingItems);
        const newItems=translationItems.filter(i => existingKeys.indexOf(i)==-1);
        console.log("new Items are",newItems);
        for (var i=0;i<newItems.length;i++){
            const resp=await fetch ("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+locale+"&dt=t&q=" + encodeURI(newItems[i]))
            try{
                const result=(await resp.json())[0][0][0];
                existingItems[newItems[i]]=result;
                console.log(newItems[i]+"   =>"+locale+"=>   "+result);

            }catch (e){
                if(resp.status==429){
                    console.log("too many request error");
                    break;
                }
                console.log(resp.status);
                console.error(e);
            }
        }
        await fs.writeFile("./src/locales/"+locale+".json",JSON.stringify(existingItems,null,2),'utf8',function(err,data){
            if (err) 
                console.error("error on writing locale",locale);
            else
                console.log("locale is writen",locale);
        })
        
    });
}

async function main(){
    fs.readFile('.docu_locale', 'utf8', async function (err, data) {
        if (err) 
            throw err;
        fs.readFile('../../documentica/src/ui/parts/builtin-schemas/.docu_locale', 'utf8', async function (err, data2) {
            if (err) 
                throw err;
            const translationItems= [...JSON.parse(data),...JSON.parse(data2)]
                .sort()
                .filter((i,ndx,arr)=>!ndx || i!=arr[i-1])
                .filter((i,ndx,arr)=>!ndx || i!=arr[i-1])
                .filter((i,ndx,arr)=>!ndx || i!=arr[i-1]);;
            await executeLocate("tr",translationItems);
            await executeLocate("ru",translationItems);
            await executeLocate("de",translationItems);
        });
    });
}

main();