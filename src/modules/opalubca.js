
function getNumOpalubka(){
    const form = document.querySelector('.form-opalubka');
    const inputs =  form.querySelectorAll('input');
    const totalConsumptionElement = form.querySelector('#num-dosc');
    const label = form.querySelectorAll('label');
    // получение массива с вводными данными из Dom-элементов
    getDateNw(inputs, totalConsumptionElement, label);     
    // расчет периметра исходя из типа  
    const arrayOpalub = calculateNw();    
    function numDosc(){ 
        // переменные
        const Adosc = inputs[0].value,
              Bdosc	 = inputs[1].value,
              perimeter =arrayOpalub.perimeter,	
              C = arrayOpalub.height;	            
        // количество досок по высоте
        const  numC=Math.ceil(C/Adosc);		
        // количество досок по периметру
        const numP= perimeter/Bdosc;
        // итого досок
        const numDosc =  numC * numP * 1.1;
        //  форматирование  и склонение
        let words = declOfNum(Math.ceil(numDosc), [' доска', ' доски', ' досок']); 
        const formatterInt = new Intl.NumberFormat('ru-RU');
        totalConsumptionElement.innerText = "Для данной длины фундамента (с учетом 10% запаса) необходимо " +  formatterInt.format(Math.ceil(numDosc))  + words;
    }
    numDosc();
}
import calculateNw from './calculator.js'
import getDateNw from './getDateNw.js'
import declOfNum from './declOfNum.js'
export default getNumOpalubka