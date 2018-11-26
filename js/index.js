console.log('let us start trip!');

const testArray1 = createArr(400000,148888);
const testArray2 = createArr(200000,148888);

if(window.Worker){
    console.log('worker is Ready!');
    window.testWorker1 = new Worker('../worker.js');

    window.testWorker2 = new Worker('../worker.js');

    test1.addEventListener('click', testModelA);
    test2.addEventListener('click', testModelB);
    test3.addEventListener('click', testModelC);

} else {
    console.log('Your chrome must be update to support!');
}


function testModelA() {
    console.log('testModelA start!');
    testWorker1.postMessage(testArray1);
    console.log('message Post!');
    testWorker1.onmessage = (res) => {
        console.log(res);
        console.log('testModelA get result!');
    }
}

function testModelB() {
    let startTime = Number(new Date());
    console.log('testModelB start!');
    testWorker1.postMessage(testArray1);
    console.log('Arr1 Post!');
    testWorker1.onmessage = (res) => {
        console.log(res);
        console.log('Arr1 get result!');
        console.log('ModelB Time ' + (Number(new Date()) - startTime));
    }

    testWorker1.postMessage(testArray2);
    console.log('Arr2 Post!');
    testWorker1.onmessage = (res) => {
        console.log(res);
        console.log('Arr2 get result!');
        console.log('ModelB Time ' + (Number(new Date()) - startTime));
    }
}


// ModelB对照组
function testModelC() {
    let startTime = Number(new Date());
    checkObject(testArray1);
    checkObject(testArray2);
    console.log('ModelC Time ' + (Number(new Date()) - startTime));
};

function createArr(length,key) {
    key = key || Infinity;
    var arr = [];
    for(var i = 0; i < length; i ++){
        if(i === key){
            arr.push('');
        } else {
            arr.push(i);
        }
    }
    return arr;
}

function checkObject(param) {
    for(var key in param){
        if(param[key] === '' || param[key] === undefined){
            return false;
        }
    }
    return true;
}