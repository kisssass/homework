let fs = require('fs');
let arg = process.argv;
let chis1 = arg[2];
let chis2 = arg[3];
let mem = new Array();

let text = fs.readFileSync('test.jss');
text = text.toString();

mem = text.split(/\s/);
mem[10]= 'exit';

let ip=0;

while (mem[ip]!='exit')
    switch (mem [ip] ) {
        case 'input1':
            mem[mem[ip+1]]= parseFloat(chis1);
            ip+=2;
            break;
        case 'input2':
            mem[mem[ip+1]]= parseFloat(chis2);
            ip+=2;
            break;
        case 'output':
            console.log (mem [mem [ip+1] ])
            ip+=2;
            break;
        case 'add':
            mem [mem [ip+3] ] =mem [mem [ip+1] ] + mem [mem [ip+2] ]
            ip+=4;
            break;
        case 'deduct':
            mem [mem [ip+3] ] =mem [mem [ip+1] ] - mem [mem [ip+2] ]
            ip+=4;
            break;
        case 'factorial':
            let fac = chis1;
            let res = 1;
            while (0 < fac){
                res*=fac;
                fac--;
            }
            mem [mem [ip+3] ] = parseFloat(res);
            ip+=4;
            break;
        case 'nod':
            let a = chis1;
            let b = chis2;
            if (a == 0){
                mem [mem [ip+3] ] = parseFloat(b);
            }
            else {
                while (b != 0) {
                    if (a>b){
                    a = a - b;
                    }
                    else {
                    b = b - a;
                    }
                }
                mem [mem [ip+3] ] = parseFloat(a);
            }
            ip+=4;
            break;
    }
   