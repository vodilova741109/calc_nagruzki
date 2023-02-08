// запуск расчетов
function runStart(){
    document.addEventListener('DOMContentLoaded', function () {
        'use strict';   
        const form = document.querySelector('.frm-inp');   
        const totalPriceBtn =  form.querySelector('.button');
        // запуск функции по кнопке расчета параметров фундамента
        totalPriceBtn.addEventListener('click', function (e) {calculateNw(), getGidroisol(),getAreaType()});   
        // запуск функции по кнопке расчета опалубки
        const formOpal = document.querySelector('.form-opalubka');   
        const totalOpalBtn =  formOpal.querySelector('.button-opal');
        totalOpalBtn.addEventListener('click', function (e) {getNumOpalubka()});
        // запуск функции по кнопке расчета траншеи
        const formTransh = document.querySelector('.form-transhei');   
        const totalTranshBtn =  formTransh.querySelector('.button-transh');
        totalTranshBtn.addEventListener('click', function (e) {getCalcTransh()});   
    });
};
import calculateNw from './calculator.js'
import getNumOpalubka from './opalubca.js'
import getGidroisol from './gidroisol.js'
import getAreaType from './getAreaType.js'
import getCalcTransh from './transh.js'


export default runStart;