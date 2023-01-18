
const form = document.querySelector('.frm-inp');
const inputs =  form.querySelectorAll('input');
const totalPriceBtn =  form.querySelector('.button');
const typeFundamenta =  form.querySelectorAll('input[name="fundament-type"]');
const typeFundamentaLent =  form.querySelectorAll('input[name="type_fund[]"]');
const typeFundamentaSV =  form.querySelectorAll('input[name="type_fund_sv[]"]');
const materialType =  form.querySelectorAll('input[name="material-type"]');
const areaElement = form.querySelector('#area');
const totalConsumptionElement = form.querySelector('#price');
const quantityElement = form.querySelector('#quantity');
const label = form.querySelectorAll('label');


 // получение новых массивов с вводными данными
function getDateNw(){    
    let arrInputs = [];     
    let arrInputsImg = [];
    const arrNew = [arrInputs, arrInputsImg];
    
    for (let i = 0; i < inputs.length; i++) {
        // в случае отсутсвия значения брать данные из placeholder
        if ((inputs[i].value !== undefined || inputs[i].value !== null) && inputs[i].value === "" ){
            inputs[i].value = inputs[i].getAttribute("placeholder");                 
          }
        // проверка на минимум    
        if(inputs[i].name!="container-consumption" && (+inputs[i].min && +inputs[i].value < +inputs[i].min)){            
            const labelText = label[i].innerText.slice(0, -1);            
            alert(labelText + "- значение  меньше минимального (min = " + inputs[i].min + ")");     
            areaElement.innerText =  '';          
            totalConsumptionElement.innerText =  '';    
            return;
        }  
        // пропускать значение NaN  и передать переменные в массивы с числами и строками отдельно
        if(!isNaN(inputs[i].value)){
        inputs[i].setAttribute("step", 0.01);   
        arrInputs.push(+inputs[i].value);   
        } else{
            arrInputsImg.push(inputs[i].value);   
        }        
        }
    //  console.log(arrInputsImg);
    return(arrNew);
}

// калькулятор
function calculateNw(){    
    // присвоение данных параметрам
    const value = getDateNw();    
    let A = value[0][0];
    let B = value[0][1];
    let C = value[0][2];
    let D = value[0][3];
    let E = value[0][4];

    const pVneshBP = (A + B) * 2 * C; 
    const pVnutBP = (A-D*2 + B-D*2) * 2 * C;    
    let pTop = (A-D*2 + B) * 2 * D;
    const per1 = ((A-D*2)*C)*2;
    const per2 = E*C*2;   
    const decrease =  D*C*2;  

    // валидация данных   
    if (D>A || D>B){     
        alert("D не корректно");
        areaElement.innerText =  '';          
        totalConsumptionElement.innerText =  '';   
        return; 
    } else {   
        calcConsumption();
    } 
  
    // выбор расчета площади по типу фундамента
    function getCalcTypeFund(){  
        for(const radio of typeFundamenta){ 
             // расчет плитного фундамента по умолчанию 
            if(radio.checked && radio.value === "2") {
                areaPlitFund();
            }
             // расчет ленточного фундамента 
            else if (radio.checked && radio.value === "3"){    
                areaLentFund();     
            }
            // расчет свайного фундамента 
            else if (radio.checked && radio.value === "4") {                   
                areaSvFund();
            }           
        }  
        return(area);       
    }   

    // расчет для ленточного и свайного типа (заготовка)
    function paymentTop(){
        // первый тип
        let area = pVneshBP+pVnutBP+pTop;
        // второй тип       
        const pTop2 = pTop+(A-D*2)*D; 
        let pVnutBP2 =pVnutBP+per1-decrease; 
        let area2 = pVneshBP+pVnutBP2+pTop2;

        // третий тип
        const pTop3 = pTop2+(E*D);   
        const decrease3 = decrease*2;                            
        let pVnutBP3 = pVnutBP+per1+per2-decrease3;  
        let area3 = pVneshBP+pVnutBP3+pTop3;    
        
        // четвертый тип     
        const pTop4 = pTop2+(E*D*2);
        const decrease4 =  decrease*3;
        const per2_4 = per2*2;
        let pVnutBP4 = pVnutBP+per1+per2_4-decrease4; 
        let area4 = pVneshBP+pVnutBP4+pTop4; 
        let arrArea = [area, area2, area3, area4];
        return arrArea;   
    }
    arrArea = paymentTop(); 

    // расчет площади плитного фундамента по умолчанию 
    function areaPlitFund(){
        let pTop = A*B;      
        area = pVneshBP + pTop;  
    } 
    // расчет площади ленточного фундамента
    function areaLentFund(){
        for(const radio of typeFundamentaLent){ 
            if(radio.checked) {   
                switch (radio.value) {    
                    // первый тип    
                    case value[1][0]:
                     area = arrArea[0];                                                                                
                    break;
                    // второй тип    
                    case value[1][1]:
                        area = arrArea[1];                                                                                
                        break;
                    case value[1][2]: 
                     // третий тип                                   
                     area = arrArea[2];                             
                        break;
                    case value[1][3]:
                    // четвертый тип     
                    area = arrArea[3];                          
                    break;                            
                }              
                return(area);                 
            } 
        }  
    }
    // расчет площади свайного фундамента 
    function areaSvFund(){
        let number = value[0][5];
        // area = ((A + B) * C * 2) * number;       
        
        for(const radio of typeFundamentaSV){ 
            if(radio.checked) {   
                switch (radio.value) {    
                    // первый тип    
                    case value[1][4]:
                     area = arrArea[0] * number; ;                                                                                
                    break;
                    // второй тип    
                    case value[1][5]:
                        area = arrArea[1] * number;                                                                                 
                        break;
                    case value[1][6]: 
                     // третий тип                                   
                     area = arrArea[2] * number;                          
                        break;
                    case value[1][7]:
                    // четвертый тип     
                    area = arrArea[3] * number;                        
                    break;                            
                }              
                return(area);                 
            } 
        }
    }

    // расчет расхода гидроизоляции
    function calcConsumption(){           
        area = getCalcTypeFund();
        const coefficient = 1.1;
        let consumption= value[0][11]*coefficient; 
        let totalConsumption= area * consumption; 

        // передача расчета в текст      
        const formatterInt = new Intl.NumberFormat('ru-RU');   
        areaElement.innerText =  formatterInt.format(area) + ' м2';  
        // const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });   
        // const formatter = new Intl.NumberFormat('ru-RU');     
        for(const radio of materialType){
            let name = 'Количество банок ';
            let quantity= value[0][12]; 
            let widthRul = value[0][13];
            let lengthRul = value[0][14];
            if (radio.checked && radio.value === "8"){
                totalConsumptionElement.innerText =  formatterInt.format(totalConsumption) + ' кг';   
                if(quantity){
                    let quantityKg = totalConsumption/quantity;
                    quantityElement.innerText = name + formatterInt.format(quantityKg) + ' шт';   
                   
                } else{
                    quantityElement.innerText =  ' ';   
                }
            } else if (radio.checked && radio.value === "9"){
                name = ' рул. ';    
                Srul =  widthRul*lengthRul;           
                let quantityRul = area/Srul;
                totalConsumptionElement.innerText = formatterInt.format(quantityRul) + name;
                quantityElement.innerText =  ' ';

            }
        }
    } 
}

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    // запуск функции сразу при загрузке страницы
    // calculateNw();
    // запуск функции сразу при изменение значений input
    for(const input of inputs) {      
        input.addEventListener('input', () =>{         
            calculateNw();           
       })   
    }
    // запуск функции сразу при клике по кнопке
    totalPriceBtn.addEventListener('click', function (e) {calculateNw()});   
});


