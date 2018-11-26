let a = 1;
console.log(a);

console.log(self);

let fn = {
    checkObject : function (param) {
        for(var key in param){
            if(param[key] === '' || param[key] === undefined){
                return false;
            }
        }
        return true;
    }
};

self.offline = param => {
    console.log('Net service err, please checkout you internet connect!')
};

self.ononline = param => {
    console.log('You now inline!');
};

onerror = param => {
    console.log('err');
    console.log(param);
};

onmessage = (param,callfn) => {
    callfn = callfn || function () {
        throw new Error();
    };

    console.log('Worker onmessage start!');
    console.log(param);
    callfn();
    postMessage(fn.checkObject(param.data));
    console.log('Worker onmessage end!');
};