
function btnParam(){
    const form = document.querySelector('.frm-inp');   
    const totalPriceBtn =  form.querySelector('.button');
    // const buttonGidr =  document.querySelector('.button-gidr');
    // запуск функции по кнопке расчета параметров фундамента
    totalPriceBtn.addEventListener('click', function (e) {calculateNw(), getAreaType()}); 
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
    totalTranshBtn.addEventListener('click', function (e) {getCalcTransh()});
}
function btnArmatura (){
    // запуск функции по кнопкам расчета арматуры
    const formArm = document.querySelector('.frm-arm');   
    const totalArmBtn =  formArm.querySelector('.button-arm');
    totalArmBtn.addEventListener('click', function (e) {getDateArmatura()}); 
}

function btnPrmerz(){
    // запуск функции по кнопкам расчета арматуры
    const formNagr = document.querySelector('.frm-promerz'),
    btnNagruz = formNagr.querySelector('.button-promerz');  
    btnNagruz.addEventListener('click', function (e) {btnProm()});  
}

function btnBeton(){
    // запуск функции по кнопкам расчета арматуры
    const formNagr = document.querySelector('.frm-beton'),
    btnNagruz = formNagr.querySelector('.button-compound');  
    btnNagruz.addEventListener('click', function (e) {calculateBeton()});  
}



import calculateNw from './calculator.js'
import getNumOpalubka from './opalubca.js'
import getGidroisol from './gidroisol.js'
import getAreaType from './getAreaType.js'
import getCalcTransh from './transh.js'
import getDateArmatura from './armatura.js'
import { btnProm} from './promerz_grunta.js'
import {calculateBeton} from './getBeton.js'


export {btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnPrmerz, btnBeton};