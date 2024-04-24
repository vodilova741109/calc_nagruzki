// получение данных по промерзанию
function getDateProm() {
    const promerzDate = document.querySelector('#promerzDate');
    let valuePrm = promerzDate.innerHTML;
    if (valuePrm !== '') {
        return valuePrm;
    }
}
// получение данных по арматуре (c учетом условий)
function getDateArm() {
    const form = document.querySelector('.frm-arm'),
        select = form.querySelector('#arm');
    let objArmir = {};
    if (select.value != '0') {
        objArmir = getDateArmatura();
    }
    if (Object.keys(objArmir).length === 0) {
        objArmir = { Kilog: 0, Larm: 0 };
    }
    return objArmir;
}
// получение данных по бетону (c учетом условий)
function getDateBeton() {
    const domEl = getDomElem();
    let objBeton = {};
    if (domEl.selectCement.value !== '0') {
        objBeton = calculateBeton();
        let str1Beton = JSON.stringify(objBeton['obCompound']).slice(1, -1);
        let str2Beton = JSON.stringify(objBeton['obWeightCement']).slice(1, -1);
        let arr = [str1Beton, str2Beton];
        let newStr = '';
        let res = '';
        for (let i = 0; i < arr.length; i++) {
            newStr = arr[i].replace(/['"«»]/g, '').replace(/[',]/g, ',<br> ').replace(/[':]/g, ': ').replace(/[':]/g, ': ');
            res += '<p>' + newStr + '</p>';
        }
        return res;
    }
}
// получение данных в объект
function addObjParam() {
    let obj = calculateNw();
    obj.objOpalubka = getNumOpalubka();
    obj.objTransh = activCalcTransh();
    obj.objArmir = getDateArm();
    obj.Beton = getDateBeton();
    obj.Promerz = getDateProm();
    obj.gid = getGidroisol();

    function isNumber(num) {
        return typeof num === 'number' && !isNaN(num);
    }
    function replacement(num) {
        if (!isNumber(num)) {
            num = 0;
            return num;
        } else {
            return num;
        }
    }
    obj.gid.totalKg = replacement(obj.gid.totalKg);
    obj.gid.totalStuk = replacement(obj.gid.totalStuk);
    obj.gid.gidrisolRul = replacement(obj.gid.gidrisolRul);

    let newObject = [
        {
            'Ширина (A), м': obj.a,
            'Длина (B), м': obj.b,
            'Высота (C), м': obj.c,
            'Толщина ленты или ростверка (D), м': obj.d,
            'Длина второй перегородки фундамента (E), м': obj.e,
        },
        {           
            'Площадь фундамента, м2': Math.floor(obj.pTop * 100) / 100,
            'Площадь свай, м2': obj.areaSv,
            'Внешний периметр фундамента, м': Math.floor(obj.per * 100) / 100,
            'Периметр фундамента, c учетом внешних и внутренних сторон, м': Math.ceil(obj.perimeter),
            'Объем фундамента (кол-во бетона для заливки), м3': Math.ceil(obj.V),
            'Толщина ленты или ростверка фундамента, м': Math.floor(obj.d * 100) / 100,
            'Площадь для гидроизоляции фундамента, м2': Math.floor(obj.area * 100) / 100,
            'Необходимо гидроизоляции в кг': Math.floor(obj.gid.totalKg * 100) / 100,
            'Необходимо гидроизоляции в количестве банок, шт': Math.floor(obj.gid.totalStuk * 100) / 100,
            'Необходимо гидроизоляции в рулонах': Math.ceil(obj.gid.gidrisolRul),        
            'Досок на опалубку': obj.objOpalubka.join(', '),           
            'Объем траншеи (котлована) в м3': obj.objTransh.toFixed(2),
            'Армирование (кол-во арматуры), кг': Math.floor(obj.objArmir.Kilog * 100) / 100,
            'Армирование (кол-во арматуры), м': Math.floor(obj.objArmir.Larm * 100) / 100,
            'Уровень промерзания, м': obj.Promerz,
            'Сырье бетона (для самостоятельного замешивания)': obj.Beton,
        }
    ]
    return newObject;
}


// вывод картинки
function getTypeIm() {
    const formType = document.querySelector('.frm-inp'),
        typeFund = formType.querySelectorAll('input[name="fundament-type"]'),
        parent = document.getElementById('parent'),
        imgSelectLabel = formType.querySelectorAll('.fusion-form-image-select label'),
        imgSelectInp = formType.querySelectorAll('.fusion-form-image-select input');

    let cunt;
    let i;
    let arr = [];
    // выбор по типу фундамента
    function getTypeFund() {
        for (let radio of typeFund) {
            // расчет плитного фундамента по умолчанию 
            if (radio.checked && radio.value === "0") {
                i = 0;
                cunt = 1;
            }
            // расчет ленточного фундамента 
            else if (radio.checked && radio.value === "1") {
                i = 1;
                cunt = 5;
            }
            // расчет свайного фундамента 
            else if (radio.checked && radio.value === "2") {
                i = 5;
                cunt = 10;
            }
        }
        arr[0] = i;
        arr[1] = cunt

        return arr;
    }
    // передача данных в массив для выбора картинки
    arr = getTypeFund();
    i = arr[0];
    cunt = arr[1];
    //   клонирование объекта
    function dve() {
        let clone;
        for (i; i < cunt; i++) {
            if (imgSelectInp[i].checked) {
                // console.log(imgSelectInp[i].checked);
                clone = imgSelectLabel[i].cloneNode(true);
                addImage(clone);
            }
        }
    }
    dve(i);
    // передача дочернего элемента в родительский
    function addImage(clone) {
        parent.appendChild(clone);
    }
}

// вывод в текст итоговой формы 
function getTotalForm() {
    const obj = addObjParam();  
    const paramCalcText = document.querySelector('.param_calc');
    const resultCalcText = document.querySelector('.result_calc');   
      
    let out = '';
    let out1 = '';
    out += `<h3>Параметры фундамента</h3>`;
    out1 += `<h3>Результаты расчетов</h3>`;
    function getDatePrint(i) {
        for (const key in obj[i]) { 

            if (obj[i][key] !== undefined && obj[i][key] !== 0) {
                // результаты передаем в разметку input
                if (obj[i] === obj[0]) {
                    out += `<input type="hidden" name="${key}" value="${obj[i][key]}"><p>${key}:  <strong>${obj[i][key]}</strong>;  </p>`;
                } 
                if (obj[i] === obj[1]) {
                    out1 += `<input type="hidden" name="${key}" value="${obj[i][key]}"><p>${key}:  <strong>${obj[i][key]}</strong> </p>`;
                }
            }
            paramCalcText.innerHTML = out;
            resultCalcText.innerHTML = out1;
        }

    }
    getDatePrint(0);
    getDatePrint(1);

    // очистка при изменении инпутов
    Cleaningresult();
    getTypeIm();

}



import calculateNw from './calculator.js'
import getNumOpalubka from './opalubca.js'
import getGidroisol from './gidroisol.js'
import { activCalcTransh } from './transh.js'
import getDateArmatura from './armatura.js'
import Cleaningresult from './cleaning_result.js'

import { getDomElem, calculateBeton } from './getBeton.js'
// export { addObjParam, getDateProm, getTotalForm };