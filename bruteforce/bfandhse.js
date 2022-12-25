let fs = require("fs");
let arg = process.argv; 

let fileInput1 = arg[2];
let fileIntput2 = arg[3];

let S = fs.readFileSync(fileInput1, "utf-8");
let T = fs.readFileSync(fileIntput2, "utf-8");


//первый способ - поиск грубой силой 
function bruteforce(){
    let arr = new Array();
    let start = new Date().getTime();
    function bruteforce(){
        for (i = 0; i < S.length; i++){
            if(S.charAt(i) == T.charAt(0)){
                for(j = 0; j < T.length; j++){
                    if(S.charAt(i + j) == T.charAt(j)){
                        if (j == T.length - 1){
                            arr.push(i + 1);
                        }
                    }
                    else{
                        break;
                    }
                }
            }
        }
        return arr;
    }
    bruteforce();
    let end = new Date().getTime();
    console.log(arr);
    console.log('time:', end - start);
}


// второй способ - сравнение хэшей, равных сумме кодов символов
function frsthash(){
    let Shs = 0;
    let Ths = 0;
    let a = 0;
    let start = new Date().getTime();
    while(a < T.length){
        Ths += T[a].charCodeAt();
        Shs += S[a].charCodeAt();
        a++;
    }
    let arr = new Array();

    let col = 0;
    function hash() {
        for(i = 1; i < S.length; i++){
            if (i > 1){
                Shs= Shs - S.charCodeAt(i - 2) + S.charCodeAt(i + T.length - 2);
            }
            if(Shs == Ths){
                for (j = 0; j < T.length; j++){
                    if(S.charAt(j + i - 1) == T.charAt(j)){
                        if (j == T.length - 1){
                            arr.push(i);
                        }
                        else{
                            col++;
                        }
                    }
                    else{
                        break;
                    }
                }
            }
        }
        return arr;
    }
    hash();
    let end = new Date().getTime();
    console.log(arr);
    console.log('time:', end - start);
    console.log('count_col:', col);
}

// третий способ-сравнение хешей=сумме кодов символов в квадрате(уменьшает вероятность коллиз
function skndhash(){
    let col = 0;
    let arr = new Array();
    let start = new Date().getTime();
    function hash(){
        let Shs = 0, Ths = 0;
        let Tlen = T.length, Slen = S.length;
        
        for (let i = 0; i < Tlen; i++){
            Ths += T.charCodeAt(i) * T.charCodeAt(i);
            Shs += S.charCodeAt(i) * S.charCodeAt(i);
        }
        
        let i = 1;
        while (i <= Slen - Tlen + 1) {
            if (Ths == Shs) {
                let j = 0;
                while (S.charAt(i - 1 + j) === T.charAt(j)){
                    j++
                    if (j == Tlen){
                        arr.push(i);
                        break;
                    }
                    else{
                        col++;
                    }
                }
            }
            Shs = (Shs - S.charCodeAt(i - 1) * S.charCodeAt(i - 1)) + S.charCodeAt(i - 1 + Tlen)* S.charCodeAt(i - 1 + Tlen) ;
            i++;
        }
        return arr;
    }
    hash();
    let end = new Date().getTime();
    console.log(arr);
    console.log('time:', end - start);
    console.log('count_col:', col);
}

//четвёртый способ-сравнение хэшей=хэш-функция Рабина-Карпа 
function trdhash(){
    let Shs = 0;
    let Ths = 0;
    let a = 0;
    let arr = new Array();
    let start = new Date().getTime();
    while(a < T.length){
        Ths += T[a].charCodeAt() * Math.pow(2, T.length - a - 1);
        Shs += S[a].charCodeAt() * Math.pow(2, T.length - a - 1);
        a++;
    }
    let col = 0;
    function hash(){
        for (i = 1; i <=  S.length - T.length + 1; i++){
            if (Shs == Ths){
                for (j = 0; j < T.length ; j++){
                    if(S.charAt(j + i - 1) == T.charAt(j)){
                        if (j == T.length - 1){
                            arr.push(i);
                        }
                        else{
                            col++;
                        }
                    }
                    else{
                        break;
                    }
                }
            }
            Shs = (Shs - S.charCodeAt(i - 1) * Math.pow(2, T.length - 1)) * 2 + S.charCodeAt(T.length + i - 1);
        }
        return arr;
    }
    hash();
    let end = new Date().getTime();
    console.log(arr);
    console.log('time:', end - start);
    console.log('count_col:', col);
}
//сравнение работы всех функций 
console.log("\n", "bruteforce:");
bruteforce();
console.log("\n", "1hash");
frsthash();
console.log("\n", "2hash:");
skndhash();
console.log("\n", "3hash:");
trdhash();
