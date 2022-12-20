let buf1=Buffer.from([97,98,99]);//创建一个buffer对象
console.log(buf1);//<Buffer 61 62 63> //16进制
/*
 0 1 2 ... 9 a->10 b->11 c d e f->15  
 16->10->1*16+0 (逢16进1) 61 ->6*16+1 
*/
//通过toString()转换为看懂得信息
console.log(buf1.toString());

let buf2=Buffer.from('hello');
console.log(buf2);//<Buffer 68 65 6c 6c 6f>
console.log(buf2.toString());//hello