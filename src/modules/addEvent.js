
function btnParam(){
    const form = document.querySelector('.frm-inp');   
    const totalPriceBtn =  form.querySelector('.button');
    // const buttonGidr =  document.querySelector('.button-gidr');
    // запуск функции по кнопке расчета параметров фундамента  
    totalPriceBtn.addEventListener('click', function (e) {calculateNw()}); 
}
function btnGidroisol(){
    const buttonGidr =  document.querySelector('.button-gidr');
    // запуск функции по кнопке расчета гидроизоляции    
    buttonGidr.addEventListener('click', function (e) {getGidroisol(),getAreaType()}); 
}
function btnOpalub(){
    // запуск функции по кнопке расчета опалубки
    const formOpal = document.querySelector('.form-opalubka');   
    const totalOpalBtn =  formOpal.querySelector('.button-opal');
    totalOpalBtn.addEventListener('click', function (e) {getNumOpalubka()});
}
function btnTransh(){
    // запуск функции по кнопке расчета траншеи
    const formTransh = document.querySelector('.form-transhei');   
    const totalTranshBtn =  formTransh.querySelector('.button-transh');    
    totalTranshBtn.addEventListener('click', function (e) { activCalcTransh()});
}
function btnArmatura (){
    // запуск функции по кнопкам расчета арматуры
    const formArm = document.querySelector('.frm-arm');   
    const totalArmBtn =  formArm.querySelector('.button-arm');
    totalArmBtn.addEventListener('click', function (e) {getDateArmatura()}); 
}

function btnPrmerz(){
    // запуск функции по кнопкам расчета арматуры
    const formPromerz = document.querySelector('.frm-promerz'),
    btnNagruz = formPromerz.querySelector('.button-promerz');  
    btnNagruz.addEventListener('click', function (e) {btnProm()});  
}

function btnBeton(){
    // запуск функции по кнопкам расчета арматуры
    const formPromerz = document.querySelector('.frm-beton'),
    btnNagruz = formPromerz.querySelector('.button-compound');  
    btnNagruz.addEventListener('click', function (e) {calculateBeton()});  
}


function btnSave(){
    // const btnSave = document.querySelectorAll('button[type="submit"]');
    const printButton = document.getElementById('print-button');
    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', function(){    
        addObjParam();   
        getTotalForm();
    })

    printButton.addEventListener('click', function() {
        window.print();
        // console.log(saveButton);
    })
}


import calculateNw from './calculator.js'
import getNumOpalubka from './opalubca.js'
import getGidroisol from './gidroisol.js'
import getAreaType from './getAreaType.js'
import { activCalcTransh } from './transh.js'
import getDateArmatura from './armatura.js'
import { btnProm} from './promerz_grunta.js'
import {calculateBeton} from './getBeton.js'
import {addObjParam, getTotalForm} from './getObj.js'



export {btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnPrmerz, btnBeton, btnSave};