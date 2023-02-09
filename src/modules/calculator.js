


// калькулятор
function calculateNw(){  
    const domEl = getDomElem();    
    // присвоение данных параметрам
    const A = domEl.arrValue[0][3],
          B = domEl.arrValue[0][4],
          C = domEl.arrValue[0][5],
          D = domEl.arrValue[0][6],
          E = domEl.arrValue[0][7], 
          Asv = domEl.arrValue[0][11], 
          Bsv = domEl.arrValue[0][12],
          r= domEl.arrValue[0][13],
          h = domEl.arrValue[0][14]; 
    let number = domEl.arrValue[0][15];       
    let obS = {};
    let areaSv;    
    // данные полученные через функции
    const pVneshBP = getVnesh(A,B,C),  // не меняется для всех  
          objPl = getStandartS(A, B, C, pVneshBP),   
          arrSv = getAreaSv(Asv,Bsv,h,r),    
          array = getTypeDate(A,B,C,D, E, pVneshBP);  
    //  форматироване   
    // const formatterInt = new Intl.NumberFormat('ru-RU');
    // валидация данных 
    
    // расчет площади плитного фундамента по умолчанию 
    function areaPlitFund(){   
        obS = objPl;
    } 
    // расчет площади ленточного фундамента
    function areaLentFund(){     
        for(let radio of domEl.typeFundamentaLent){ 
            if(radio.checked) {                 
                switch (radio.value) {    
                    // первый тип                     
                    case domEl.arrValue[1][0]:
                        obS = getArea(array, 0, C, D);                        
                    break;
                    // второй тип    
                    case domEl.arrValue[1][1]:
                        obS = getArea(array, 1, C, D);                                                   
                        break;
                    case domEl.arrValue[1][2]: 
                     // третий тип                                   
                        obS =  getArea(array, 2, C, D);      
                        break;
                    case domEl.arrValue[1][3]:
                    // четвертый тип     
                       obS =  getArea(array, 3, C, D);
                    break;                            
                }         
            } 
        }  
    }    
    // расчет площади свайного фундамента  
    function areaSvFund(){
        for(let radio of domEl.typeSV){ 
            if(radio.checked && radio.value === "15") {  
               areaSv = arrSv[0];   
             } else if(radio.checked && radio.value === "16"){
               areaSv = arrSv[1];             
             }          
        }
        areaSv *=  number;   
        for(let radio of domEl.typeFundamentaSV){ 
            if(radio.checked) {   
                switch (radio.value) {    
                    // первый тип    
                    case domEl.arrValue[1][4]:
                    obS = getArea(array, 0, C, D);                                   
                    break;
                    // второй тип    
                    case domEl.arrValue[1][5]:
                    obS = getArea(array, 1, C, D);                                                                             
                    break;
                    // третий тип  
                    case domEl.arrValue[1][6]:                                                      
                    obS = getArea(array, 2, C, D);  
                    // четвертый тип  
                    break;                  
                    case domEl.arrValue[1][7]:
                    // четвертый тип     
                    obS = getArea(array, 3, C, D);    
                    break;                            
                } 
                obS.area += areaSv;
                return(obS.area);
            }            
        }               
    }


    // выбор расчета площади по типу фундамента
    function getCalcTypeFund(){  
        for(let radio of domEl.typeFundamenta){ 
            // расчет плитного фундамента по умолчанию 
           if(radio.checked && radio.value === "0") {
              areaPlitFund();           
           }
            // расчет ленточного фундамента 
           else if (radio.checked && radio.value === "1"){    
             areaLentFund();                
           }
           // расчет свайного фундамента 
           else if (radio.checked && radio.value === "2") {                  
             areaSvFund();  
           } 
       }   
    }  
    
       // запуск  
    function start(){   
        // получение типа фундамента
        getCalcTypeFund();
         domEl.areaElement.innerText = "Общая площадь " + domEl.formatterInt.format(obS.area) + ' м2'; 
         domEl.volumeFund.innerText = "Объем " + domEl.formatterInt.format(obS.V) + ' м3';
        Cleaningdata ();
    }
    // валидатор
    function validationDate(){
        if (D>A || D>B){     
            alert("D не корректно");
            domEl.areaElement.innerText =  '';          
            domEl.totalConsumptionElement.innerText =  '';   
            return; 
        } else { 
           start();
        } 
    }
    validationDate();
    // сброс результата при изменении инпутов
    let inputs = domEl.inputs;
    Cleaningdata(inputs);
    // добавит новый ключ в объект "areaSv" в объект cо значением areaSv
    obS.areaSv = areaSv; 
    obS.d = D;    
    return (obS);
}

import {getStandartS, getVnesh, getTypeDate, ResultPov, ResultPovSecond, ResultPovthree, ResultPovfour, getAreaSv, getArea} from './getStandartS.js';

import getDomElem from './date.js'
import Cleaningdata from './cleaning.js'

export default calculateNw;
