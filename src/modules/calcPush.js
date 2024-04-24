"use strict";
// получает дом элементы и возвращает массив из данных
const convertArray = function (arr) {
  let array = [];
  arr.forEach((element) => array.push(+element.innerHTML));
  return array;
};
// суммирует данные массива
const sumEl = function () {
  let arr = [];
  return function (a) {
    arr = convertArray(a);
    // console.log(arr);
    let sum = 0;
    arr.map((item) => (sum += item));
    return sum;
  };
};
const postSum = sumEl();
// передает данные в текст
const sendTotal = function (array, resultsText) {
  let sum = postSum(array);
  let sumBetonAndArm = 0;
  sumBetonAndArm = addSumBetonAndArm();
  let totalSum = sum + sumBetonAndArm;
  const totalValue = resultsText;
  totalValue.textContent = totalSum.toFixed(2);
};

import {addSumBetonAndArm} from "./betonAndArm.js";
export { convertArray, sumEl, sendTotal};

