
function btnParam(){
    const form = document.querySelector('.frm-inp');   
    const totalPriceBtn =  form.querySelector('.button');
   // запуск функции по кнопке расчета параметров фундамента  
    totalPriceBtn.addEventListener('click', function (e) {calculateNw()}); 
}
function btnSave(){
    // const btnSave = document.querySelectorAll('button[type="submit"]');
    const printButton = document.getElementById('print-button');
    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', function(){    
        // addObjParam();   
        // getTotalForm();
    })
    printButton.addEventListener('click', function() {
        window.print();
        // console.log(saveButton);
    })

}
function btnArmatura() {
  // запуск функции по кнопкам расчета арматуры
  const formArm = document.querySelector(".frm-arm");
  const totalArmBtn = formArm.querySelector(".button-arm");
  totalArmBtn.addEventListener("click", function (e) {
    getDateArmatura();
  });
}
btnArmatura(); 
function btnBeton() {
  // запуск функции по кнопкам расчета арматуры
  const formPromerz = document.querySelector(".frm-beton"),
    btnNagruz = formPromerz.querySelector(".button-compound");
  btnNagruz.addEventListener("click", function (e) {
    calculateBeton();
  });
}
btnBeton();

function contextmenu(){
  // можно либо создать новое меню, либо удалить старое в целях безопасности открытия кода
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    console.log("Можно создать свое меню при клике правой мышкой");
  })
} 
// contextmenu();
// import {addObjParam, getTotalForm} from './getObj.js'

import calculateNw from './calculator.js'
import getDateArmatura from "./armatura.js";
import { calculateBeton } from "./getBeton.js";

export { btnParam, btnSave, btnArmatura, btnBeton };