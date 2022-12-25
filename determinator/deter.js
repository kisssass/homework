//t=WScript. Stdln. ReadLine ()
s = 'ananasnananasns';
t = 'ananas';
m = t.length;
alph = new Array()
position = []
//Определяем алфавит строки t
for(i=0;i<m;i++)
    alph[t.charAt(i)]=0;
//В двумерном массиве del храним таблицу переходов
del=new Array(m+1);
for(j=0;j<=m;j++)
    del[j]=new Array();
//Инициализируем таблицу переходов
for(i in alph)
    del [0] [i]=0;
//Формируем таблицу переходов
for(j=0;j<m;j++){
    prev=del[j][t.charAt(j)]
    del[j] [t .charAt(j)]=j+1
    for(i in alph)
        del[j+ 1 ] [i]=del [prev] [i]
}
//Выводим таблицу переходов
out= ' ';
for(j=0; j<=m; j++){
    for(i in alph)
        out+=del[j] [i] + ' ';
    out +='\n'
}
console.log(out);
state = 0;
for (i = 0; i < s.length; i++){
    if (s.charAt(i)in alph)
        state = del[state][s.charAt(i)]
    else
        state = 0;
    if (state == m)
        position.push(i-m + 1);
}
console.log(position)
