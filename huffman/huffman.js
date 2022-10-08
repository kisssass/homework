let fs = require("fs");
let arg = process.argv; 
let str = fs.readFileSync(arg[2], "utf-8");

function Node (letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

let alph = new Array();
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)] = 0;
}
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)] += 1;
}

console.log(alph);

let tree = new Array();

for (i in alph) {
    let n = new Node(i, alph[i], 0, null, '');
    tree.push(n);
}
console.log(tree);

function buildTree(tuples)  
{  
    while(tuples.length>1)  
    {  
    leastTwo=[tuples[0][1],tuples[1][1]]  
    //console.log(leastTwo);  
    theRest=tuples.slice(2,tuples.length);  
    //console.log(theRest);  
    combFreq=tuples[0][0]+tuples[1][0];  
    //console.log(combFreq);  
    tuples=theRest;  
    end=[combFreq,leastTwo];  
    tuples.push(end);  
    //console.log(tuples);  
    tuples.sort();  
    //console.log(tuples);  
    }  
   return tuples[0][1];  

}  
tree=buildTree(tuples);  
console.log(tree)