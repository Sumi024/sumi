(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

console.log('let us start trip!');

var testArray1 = createArr(4000000, 1488880);
var testArray2 = createArr(2000000, 1488880);

if (window.Worker) {
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
    testWorker1.onmessage = function (res) {
        console.log(res);
        console.log('testModelA get result!');
    };
}

function testModelB() {
    var startTime = Number(new Date());
    console.log('testModelB start!');
    testWorker1.postMessage(testArray1);
    console.log('Arr1 Post!');
    testWorker1.onmessage = function (res) {
        console.log(res);
        console.log('Arr1 get result!');
        console.log('ModelB Time ' + (Number(new Date()) - startTime));
    };

    testWorker2.postMessage(testArray2);
    console.log('Arr2 Post!');
    testWorker2.onmessage = function (res) {
        console.log(res);
        console.log('Arr2 get result!');
        console.log('ModelB Time ' + (Number(new Date()) - startTime));
    };
}

// ModelB对照组
function testModelC() {
    var startTime = Number(new Date());
    checkObject(testArray1);
    checkObject(testArray2);
    console.log('ModelC Time ' + (Number(new Date()) - startTime));
};

function createArr(length, key) {
    key = key || Infinity;
    var arr = [];
    for (var i = 0; i < length; i++) {
        if (i === key) {
            arr.push('');
        } else {
            arr.push(i);
        }
    }
    return arr;
}

function checkObject(param) {
    for (var key in param) {
        if (param[key] === '' || param[key] === undefined) {
            return false;
        }
    }
    return true;
}

},{}]},{},[1]);
