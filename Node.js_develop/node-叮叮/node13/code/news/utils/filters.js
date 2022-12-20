const template=require('art-template');
template.defaults.imports.classNameFitler=function(value){//value接收的html中 “|”前面的值
    if(value ==0){
        return 'first'
    }else if(value ==1){
        return 'second'
    }else if(value ==2){
        return 'third'
    }else{
        return ''
    }
}