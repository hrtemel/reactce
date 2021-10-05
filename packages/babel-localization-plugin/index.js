var fs=require("fs");
var plugin=(babel) =>{
    fs.writeFileSync(".reactce_locale","");
    const { types: t } = babel;
    let importName='l';  
    let locales={};

    var addLocale=(p)=>{
      if (!p)
        return;
      if (!(p in locales)){
        locales[p]=true;
        fs.writeFileSync(".reactce_locale",
        
        JSON.stringify(Object
          .keys(locales)
          .sort()
          ,null,2))
      }
    }

    return {
      name: "reactce_locale_transform", 
      visitor: {
        ImportDeclaration(path){
          if (path.node.source.value=="@reactce/core/localizations"){
              if (path.node.specifiers.filter(i=>i.type=="ImportDefaultSpecifier").length){
                    let imp=path.node.specifiers.filter(i=>i.type=="ImportDefaultSpecifier")[0];
                  importName=imp.local.name;
              }
              
          }
        },
        StringLiteral(path){
          if (path.node.value && /^\{\{.*\}\}$/.test(path.node.value))
           addLocale(path.node.value.replace(/^\{\{/,"").replace(/\}\}$/,""));
        },  
        TaggedTemplateExpression(path){
  
          if (path.node.tag.name==importName){
  
            if (path.node.quasi.quasis.length==1 && path.node.quasi.expressions.length==0){
                addLocale(path.node.quasi.quasis[0].value.cooked);
                path.replaceWith(babel.parse(importName+'('+JSON.stringify(path.node.quasi.quasis[0].value.cooked)+')').program.body[0]);
            }else{
              var key=path.node.quasi.quasis
                .map(i=>i.value.cooked)
                .slice(0, -1)
                .reduceRight((memo, curr, i) => 
                `${curr}{${i}}${memo}`,  
                path.node.quasi.quasis[ path.node.quasi.quasis.length - 1].value.cooked
              );
              var values=path.node.quasi.expressions;
              path.replaceWith(babel.parse(importName+'('+JSON.stringify(key)+','+values.map(i=>0).join(',')+')').program.body[0]);
              for (var i=0;i<values.length;i++)
                path.node.arguments[i+1]=values[i];
              addLocale(key);
            }
          }
        },
        Identifier(path) {
          if (path.node.name==importName){
            if (path.parent && path.parent.type=="ImportDefaultSpecifier")
              return;
            if (path.parent.type=="CallExpression"){
              addLocale(path.parent.arguments.map(i=>i.value).pop());
            }
          } 
        }
    } 
  }
}

module.exports=plugin;