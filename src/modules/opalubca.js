
function getNumOpalubka(){
    const domEl = getDomElem();
    const form = document.querySelector('.form-opalubka');
    const inputs =  form.querySelectorAll('input');
    const totalConsumptionElement = form.querySelector('#num-dosc');
    const totalM2Element = form.querySelector('#m2-dosc');
    const totalMpElement = form.querySelector('#mp-dosc');
    const label = form.querySelectorAll('label');
    let objOpalubka = {}; 
    // получение массива с вводными данными из Dom-элементов
    getDateNw(inputs, totalConsumptionElement, label);     
    // расчет периметра исходя из типа  
    const arrayOpalub = calculateNw();    
    function numDosc(){ 
        // переменные
        
        const Adosc = inputs[0].value,
              Bdosc	 = inputs[1].value,
              perimeter = arrayOpalub.perimeter,	              
              C = arrayOpalub.height;
        // количество досок по высоте
        const numC =Math.ceil(C/Adosc);		

        // количество досок по периметру
        const numP= perimeter/Bdosc;
        // итого досок
        const numDosc =  numC * numP * 1.1;
        //  площадь опалубки
        const SOpalub = perimeter * C; 
        //  погонный метр опалубки
        const PMOpalub = numDosc * Bdosc;   
           
        //  форматирование  и склонение
        let words = declOfNum(Math.ceil(numDosc), [' доска', ' доски', ' досок']); 
        const formatterInt = new Intl.NumberFormat('ru-RU');
        totalConsumptionElement.innerText = "Для данной длины фундамента (c учетом 10% запаса) необходимо " +  formatterInt.format(Math.ceil(numDosc))  + words ;
        totalM2Element.innerText = "метров квадратных " + formatterInt.format(Math.ceil(SOpalub))  ;
        totalMpElement.innerText = "метров погонных " + formatterInt.format(Math.ceil(PMOpalub))  ;
        
        const arrDosc =[totalConsumptionElement.innerText,  totalM2Element.innerText,  totalMpElement.innerText];
         
        return(arrDosc);
    }
    numDosc();
    let arrayText= [totalConsumptionElement];
    Cleaningdata(domEl.inputs,arrayText);
    
    objOpalubka = numDosc();  
    return  objOpalubka;
   

}
import calculateNw from './calculator.js'
import getDateNw from './getDateNw.js'
import getDomElem from './date.js'
import declOfNum from './declOfNum.js'
import Cleaningdata from './cleaning.js'
export default getNumOpalubka