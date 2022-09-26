let fs = require("fs");
let arg = process.argv; 

console.log('алфавит');
let alph = new Array();
let str = fs.readFileSync(arg[2], "utf-8");
for (i=0; i<str.length;i++){
    if (str[i] in alph){
        alph[str[i]]++;
    } else {
        alph[str[i]] = 1;
    }
}
console.log(alph);

console.log('частота каждого символа ');
fr = 0;
for (i in alph){
    alph[i] /= str.length;
    console.log(i,'-', alph[i]);
    fr++;
}

console.log('энтропия');
en = 0;
for (i in alph){
    en -= alph[i] * Math.log(alph[i]);
}
en /= Math.log(fr);

console.log(en);

