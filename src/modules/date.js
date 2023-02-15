function getDomElem(){
    const form = document.querySelector('.frm-inp'),
        inputs =  form.querySelectorAll('input'),
        typeFundamenta =  form.querySelectorAll('input[name="fundament-type"]'),
        typeFundamentaLent =  form.querySelectorAll('input[name="type_fund[]"]'),
        typeFundamentaSV =  form.querySelectorAll('input[name="type_fund_sv[]"]'),    
        typeSV =  form.querySelectorAll('input[name="sv-type"]'),
        options =  form.querySelectorAll('option'),
        select = form.querySelector('#sum'),
        materialType =  form.querySelectorAll('input[name="material-type"]'), 
        areaElement = form.querySelector('#area'),
        volumeFund = form.querySelector('#volumeFund'),    
        totalConsumptionElement = form.querySelector('#price'),
        quantityElement = form.querySelector('#quantity'),
        areaElement1 = form.querySelector('#area1'),
        label = form.querySelectorAll('label');
    // траншея
    const totalTran = document.querySelector('#volume'),
        description = document.querySelector('#description'); 

    // армирование
    const  kilogramText = document.querySelector('#kilogram'),
            lengthText = document.querySelector('#length'); 

    const formatterInt = new Intl.NumberFormat('ru-RU');
    const arrValue = getDateNw(inputs, areaElement ,totalConsumptionElement, label); 
    const arrayDomElement = {form: form, inputs: inputs, typeFundamenta: typeFundamenta,typeFundamentaLent: typeFundamentaLent, typeFundamentaSV: typeFundamentaSV, typeSV: typeSV, options: options, select: select, materialType: materialType, areaElement: areaElement, volumeFund:volumeFund,  totalConsumptionElement: totalConsumptionElement,  quantityElement: quantityElement,areaElement1: areaElement1, label: label, formatterInt: formatterInt, arrValue: arrValue, totalTran: totalTran, description: description, kilogramText: kilogramText, lengthText: lengthText}
  
    return arrayDomElement;
}
export default getDomElem;

import getDateNw from './getDateNw.js'