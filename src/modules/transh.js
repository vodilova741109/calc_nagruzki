// получение дом-элементов 
function getElement() {
    const form = document.querySelector('.form-transhei'),
        transhBlock = document.querySelector('.transh-block'),
        inputs = form.querySelectorAll('input'),
        fusion = form.querySelectorAll('.fusion-form-radio'),
        label = form.querySelectorAll('label'),
        typeCalc = form.querySelectorAll('input[name="calc-type"]'),
        domEl = getDomElem(),
        totalTran = domEl.totalTran,
        typePl = domEl.arrValue[0][0],
        formatterInt = new Intl.NumberFormat('ru-RU');
    getDateNw(inputs, totalTran, label);
    const objTr = {
        form: form,
        transhBlock: transhBlock,
        inputs: inputs,
        fusion: fusion,
        label: label,
        typeCalc: typeCalc,
        domEl: domEl,
        totalTran: totalTran,
        formatterInt: formatterInt,
        typePl: typePl
    };
    return objTr;
}

// получение данных инпутов
function getDateInput() {
    const form = document.querySelector('.form-transhei'),
        inputs = form.querySelectorAll('input'),
        domEl = getDomElem(),
        arrayOpalub = calculateNw();
    const h = inputs[3].value,
        d = arrayOpalub.d,
        h1 = inputs[4].value,
        h2 = inputs[5].value,
        e = +inputs[6].value,
        dNew = d + e,
        l = arrayOpalub.pTop / d,
        A = +domEl.arrValue[0][3],
        B = +domEl.arrValue[0][4];
    let V;
    const objTr = {
        arrayOpalub: arrayOpalub,
        h: h, d: d, dNew: dNew, h1: h1, h2: h2, l: l, A: A, B: B, e: e,
        V: V
    };
    return objTr;
}
// расчет при плите
function getCalcTranshPl() {
    // получение массива с вводными данными из Dom-элементов
    const obT = getElement();
    const obDate = getDateInput();

    function numDosc() {

        // выбор расчета по типу траншеи      
        for (let radio of obT.typeCalc) {
            // Расчет объема грунта котлована с вертикальными стенками
            if (radio.checked && radio.value === "0") {
                obDate.V = ((obDate.A + obDate.e) * (obDate.B + obDate.e) * obDate.h);
            }
            // Расчет объема котлована с откосами
            else if (radio.checked && radio.value === "1") {
                const S1 = obDate.A * obDate.B,
                S2 = (obDate.A + obDate.e) * (obDate.B + obDate.e);
                obDate.V = ((S1 + S2) / 2 * obDate.h);                
            }          
            // Расчет объема грунта котлована с вертикальными стенками с перепадом высот (дом на склоне)
            else if (radio.checked && radio.value === "2") {
                  radio.checked = false;
               
            }
        }
        //  форматирование 
        obT.totalTran.innerText = "Необходимо вырыть котлован объемом " + obT.formatterInt.format((obDate.V).toFixed(2)) + ' м3';
        return obDate.V;
    }

    Cleaningdata(obT.inputs, obT.totalTran);
    numDosc();
    return obDate.V;
}
// расчет при ленте
function getCalcTranshLent() {
    // получение массива с вводными данными из Dom-элементов
    const obT = getElement();
    const obDate = getDateInput();
    function numDosc() {
        // длина ленты * D = площадь верха    
        // выбор расчета по типу траншеи 
        for (let radio of obT.typeCalc) {
            // Расчет объема грунта котлована с вертикальными стенками
            if (radio.checked && radio.value === "0") {
                obDate.V = (obDate.l * obDate.dNew * obDate.h);
            }        
            // Расчет объема котлована с откосами
            else if (radio.checked && radio.value === "1") {
                // const S1 = + obT.inputs[6].value,
                // S2 = + obT.inputs[7].value;
                const S1 = obDate.l * obDate.d,
                    S2 = obDate.l * obDate.dNew;                   
                obDate.V =((S1 + S2) / 2 * obDate.h);
            }
            // Расчет объема грунта котлована с вертикальными стенками с перепадом высот (дом на склоне)
            else if (radio.checked && radio.value === "2") {
                const S1 = obDate.dNew * obDate.h1;
                const S2 = obDate.dNew * obDate.h2;
                obDate.V = ((S1 + S2) / 2 * obDate.l);
            }
        }
        //  форматирование 
        obT.totalTran.innerText = "Необходимо вырыть траншею объемом " + obT.formatterInt.format((obDate.V).toFixed(2)) + ' м3';
        return obDate.V;
    }

    Cleaningdata(obT.inputs, obT.totalTran);
    numDosc();
    return obDate.V;
}

// действия при выборе по типу фундамента
function calcTypeFund() {
    const domEl = getDomElem();
    let V;
    for (let radio of domEl.typeFundamenta) {
        // расчет плитного фундамента по умолчанию 
        if (radio.checked && radio.value === "0") {
            V = getCalcTranshPl();
        }
        // расчет ленточного фундамента 
        else if (radio.checked && radio.value === "1") {
            V = getCalcTranshLent();
        }
        // расчет свайного фундамента 
        else if (radio.checked && radio.value === "2") {
            break;
        }
    }
    return V;
}

// запуск расчета для кнопки
function activCalcTransh() {
    let V = calcTypeFund();
    getDateInp();
    return V;  
}





import calculateNw from './calculator.js'
import getDateNw from './getDateNw.js'
import Cleaningdata from './cleaning.js'
import getDomElem from './date.js'
import getDateInp from './imgtext.js'

export { getElement, getDateInput, activCalcTransh}