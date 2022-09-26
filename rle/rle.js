let fs = require("fs");
let arg = process.argv; 

let mode = arg[2];
let fileInput = arg[3];
let fileOutput = arg[4];

if (mode=='code'){
    let i = 0;
    let n = 1;
    let str = fs.readFileSync(fileInput, "utf-8");
    let str1 = '';
    while(i < str.length){
        while ( str[i] == str[i+n] && n<255)
            n++; 
        //console.log(str[i], '-', n)
        if ((n > 3) || (str[i]== '#')){
            str1+="#" + String.fromCharCode(n) + str[i]; 
        }
        else {
            for(k = 0; k < n; k++)
            str1 += str[i];
        }
        i+=n;
        n = 1;
    }
    fs.writeFileSync(fileOutput, str1);
    
    let fileInputSize = fs.statSync(fileInput).size;
	let fileOutputSize = fs.statSync(fileOutput).size;
	console.log("Коэффициент сжатия: ", fileInputSize/fileOutputSize)
} else if (mode=='decode') {
    let i = 0;
    let n;
    let rst1 = fs.readFileSync(fileInput, "utf-8");
    let rst = '';
    while(i < rst1.length){
        if (rst1[i] == "#"){
            for (n = 0; n < rst1.charCodeAt(i+1); n++){
                rst += rst1[i+2];
            }
            i+=3;
        }else {
            rst += rst1[i];
            i+=1; 
        }
    }
    fs.writeFileSync(fileOutput, rst);
} else if (mode == "compare") {
    if (fs.readFileSync(fileInput, "utf-8") == fs.readFileSync(fileOutput, "utf-8")){
        console.log(true);
    } else {
        console.log(false);
    }
}
