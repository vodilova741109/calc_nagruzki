function getDomElem(){
    const form = document.querySelector('.frm-inp');
    const inputs =  form.querySelectorAll('input');
    const typeFundamenta =  form.querySelectorAll('input[name="fundament-type"]');
    const typeFundamentaLent =  form.querySelectorAll('input[name="type_fund[]"]');
    const typeFundamentaSV =  form.querySelectorAll('input[name="type_fund_sv[]"]');    
    const typeSV =  form.querySelectorAll('input[name="sv-type"]');
    const options =  form.querySelectorAll('option');
    const select = form.querySelector('#sum');
    const materialType =  form.querySelectorAll('input[name="material-type"]'); 
    const areaElement = form.querySelector('#area');
    const volumeFund = form.querySelector('#volumeFund');    
    const totalConsumptionElement = form.querySelector('#price');
    const quantityElement = form.querySelector('#quantity');
    const areaElement1 = form.querySelector('#area1');
    const label = form.querySelectorAll('label');
    // траншея
    const totalTran = document.querySelector('#volume');
    const description = document.querySelector('#description');
    const formatterInt = new Intl.NumberFormat('ru-RU');
    const arrValue = getDateNw(inputs, areaElement ,totalConsumptionElement, label); 
    const arrayDomElement = {form: form, inputs: inputs, typeFundamenta: typeFundamenta,typeFundamentaLent: typeFundamentaLent, typeFundamentaSV: typeFundamentaSV, typeSV: typeSV, options: options, select: select, materialType: materialType, areaElement: areaElement, volumeFund:volumeFund,  totalConsumptionElement: totalConsumptionElement,  quantityElement: quantityElement,areaElement1: areaElement1, label: label, formatterInt: formatterInt, arrValue: arrValue, totalTran: totalTran, description: description}
  
    return arrayDomElement;
}
export default getDomElem;

import getDateNw from './getDateNw.js'