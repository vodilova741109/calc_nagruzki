


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
    //  расчет материала
    // function getGidroisol(){
    //     const coefficient = 1.1;
    //     let consumption= domEl.arrValue[0][18]*coefficient; 
    //     let totalConsumption= obS.area * consumption;
            
    //     for(let radio of materialType){
    //         let name = 'Количество банок ';
    //         let quantity= domEl.arrValue[0][19]; 
    //         let widthRul = domEl.arrValue[0][20];
    //         let lengthRul = domEl.arrValue[0][21];
    //         if (radio.checked && radio.value === "8"){
    //             totalConsumptionElement.innerText = "Для данной площади необходимо " +  domEl.formatterInt.format(totalConsumption) + ' кг';                        
    //             if(quantity){
    //                 let quantityKg = totalConsumption/quantity;
    //                 quantityElement.innerText = name + domEl.formatterInt.format(quantityKg) + ' шт';   
                    
    //             } else{
    //                 quantityElement.innerText =  ' ';   
    //             }
    //         } else if (radio.checked && radio.value === "9"){
    //             name = ' рул. ';    
    //             const Srul =  widthRul*lengthRul;           
    //             let quantityRul = obS.area/Srul;
    //             totalConsumptionElement.innerText = domEl.formatterInt.format(quantityRul) + name;
    //             quantityElement.innerText =  ' ';
    //         }
    //     } 
    // }

     // расчет площади составляюищ поверхностей (внеш, внут, верх)
    //  function getAreaType(){
    //     domEl.domEl.select.addEventListener('change', (e) =>{                 
    //         for (let i = 0; i < options.length; i++) {
    //             // alert(domEl.domEl.select.value);
    //             switch (e.target.value) {    
    //                             case '20' :      
    //                                 getCalcTypeFund();
    //                                 obS.area;                                                                 
    //                                 domEl.areaElement1.innerText = '';
    //                             break;  
    //                             // первый тип   
    //                             case '21' :      
    //                                 obS.area  =  obS.pVneshBP;
    //                                 domEl.areaElement1.innerText = "Внешняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';    
    //                             break;
    //                             // второй тип    
    //                             case '22':
    //                                 if(domEl.typeFundamenta[0].value === "0" && domEl.typeFundamenta[0].checked ){    
    //                                     // obS.area  =  0;                                           
    //                                     domEl.areaElement1.innerText = "Нет внутренней поверхности"; 
    //                                 } else {
    //                                     obS.area  =  obS.pVnut;      
    //                                     domEl.areaElement1.innerText = "Внутренняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';                                     
    //                                 }    
    //                                 break;
    //                             case '23': 
    //                                 // третий тип    
    //                                 obS.area  =  obS.pTop;    
    //                                 domEl.areaElement1.innerText = "Верхняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';   
    //                                 break;
    //                             case '24': 
    //                             // третий тип       
    //                             if(domEl.typeFundamenta[2].value === "2" && domEl.typeFundamenta[2].checked){
    //                                 obS.area  =  areaSv;       
    //                                 domEl.areaElement1.innerText = "Поверхность свай " + domEl.formatterInt.format(obS.area) + ' м2';                                     
    //                             } else {
    //                                 // obS.area  =  0; 
    //                                 domEl.areaElement1.innerText = "Только для свайного фундамента"; 
    //                             }   
    //                             break;
    //             }   
    //         }      
    //         getGidroisol(obS.area);
    //     }) 
    // } 
       // запуск  
    function start(){   
        // получение типа фундамента
        getCalcTypeFund();
         domEl.areaElement.innerText = "Общая площадь " + domEl.formatterInt.format(obS.area) + ' м2'; 
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
