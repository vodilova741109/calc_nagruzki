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
    console.log(arr);
    let sum = 0;
    arr.map((item) => (sum += item));
    return sum;
  };
};
const postSum = sumEl();
// передает данные в текст
const sendTotal = function (array, resultsText) {
  let sum = postSum(array);
  let arm = addDateArm();
  let beton = addDateBeton();
 
  const totalValue = resultsText;
  totalValue.textContent = sum;
  console.log(sum);
};
import { addDateArm, addDateBeton } from "./sbor_nagruzok.js";
export { convertArray, sumEl, sendTotal };

