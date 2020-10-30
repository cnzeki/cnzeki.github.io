function hex2int(hex) {
    var len = hex.length, a = new Array(len), code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48<=code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
    
    return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

function rnd( seed ){
    seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数?
    return seed;
}

function isValidDigit(d, result) {
    let n = result.length;
    if(n < 1){
        return 1;
    }
    // xx
    let last = parseInt(result.charAt(n-1));
    if(d == last){
        return 0;
    }
    // abc
    if(n > 1){
        let ll = parseInt(result.charAt(n-2));
        if( last * 2 == (ll+d) && Math.abs(last-d) == 1){
            return 0;
        }
    }
    // aba b
    if(n>2){
        let ll = parseInt(result.charAt(n-2));
        if( result.charAt(n-1) == result.charAt(n-3) && ll==d){
            return 0;
        }
    }
    return 1;
}

function makePassword(srcText) {
    var v1= md5(srcText); 
    let chars = 'abcdefghijkmnpqrstuvwxy';
    let specials = '!@#$%^&*';
    let result = '';
    let idx = 0;
    // 6 digits
    for (var i = 0; i < 6; i++) {
        var d1 = v1.substring(idx, idx+2);
        var n1 = hex2int(d1) % 10;
        while(0 == isValidDigit(n1, result)){
            console.log(isValidDigit(n1, result));
            n1 = rnd(n1) % 10;
        }
        
        result = result + n1;
        console.log(result);
        idx += 2;
    }
    // lower char
    var lowChar = '';
    var upChar = '';
    var spChar = '';
    {
        var ch1 = v1.substring(idx, idx+2); idx += 2;
        var n1 = hex2int(ch1) % chars.length;
        ch1 = chars.charAt(n1);
        lowChar = ch1;
        result = result + ch1;
    }
    
    // upper char
    {
        var ch1 = v1.substring(idx, idx+2); idx += 2;
        var n1 = hex2int(ch1) % chars.length;
        ch1 = chars.charAt(n1);
        upChar = ch1.toUpperCase()
        result = result + ch1.toUpperCase();
    }
    // special char
    {
        var ch1 = v1.substring(idx, idx+2); idx += 2;
        var n1 = hex2int(ch1) % specials.length;
        ch1 = specials.charAt(n1);
        spChar = ch1;
        result = result + ch1;
    }
    console.log(result);
    
    // make a harder version
    let hard = '';
    hard += result.substring(0, 1);
    hard += lowChar;
    hard += result.substring(1, 3);
    hard += upChar;
    hard += result.substring(3, 5);
    hard += spChar;
    hard += result.substring(5, 6);
    console.log(hard);
    return {'simple': result, 'hard': hard};
}

