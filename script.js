
const form = document.querySelector('.frm-inp');
const inputs =  form.querySelectorAll('input');
const totalPriceBtn =  form.querySelector('.button');
const typeFundamenta =  form.querySelectorAll('input[name="fundament-type"]');
const typeFundamentaLent =  form.querySelectorAll('input[name="type_fund[]"]');
const materialType =  form.querySelectorAll('input[name="material-type"]');
const fundamentType = form.querySelectorAll('.fundament_type input');
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
        // пропускать значение NaN  
        if(!isNaN(inputs[i].value)){
        inputs[i].setAttribute("step", 0.01);   
        arrInputs.push(+inputs[i].value);   
        } else{
            arrInputsImg.push(inputs[i].value);   
        }        
     }; 
     console.log(arrInputs);
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
    let pVneshBP;
    let pVnutBP;    
    let pTop;
    let area; 
    // валидация данных   
    if (D>A || D>B){     
        alert("D не корректно");
        areaElement.innerText =  '';          
        totalConsumptionElement.innerText =  '';   
        return; 
    } else {   
        calcConsumption();
    }    

    // расчет площади по типу фундамента
    function getCalcTypeFund(){  
        for(const radio of typeFundamenta){ 
                // расчет плитного фундамента по умолчанию 
            if(radio.checked && radio.value === "2") {
                pTop = A*B;
                pVneshBP = (A + B) * C * 2
                area = pVneshBP + pTop;  
            } // расчет ленточного фундамента 
            else if (radio.checked && radio.value === "3"){
                pVneshBP = (A + B) * 2 * C;
                pVnutBP = (A-D*2 + B-D*2) * 2 * C;    
                pTop = (A-D*2 + B) * 2 * D;
                let per1 = ((A-D*2)*C)*2+(A-D*2)*D ;пше
                let per2 = E*C*2+E*D;    
                let decrease =  D*C*2;  
                for(const radio of typeFundamentaLent){ 
                    if(radio.checked) {                                             
                        switch (radio.value) {
                            case value[1][0]:  
                                area = pVneshBP+pVnutBP+pTop;    
                                break;
                            case value[1][1]:
                                area = pVneshBP+pVnutBP+pTop +per1-decrease;
                                break;
                            case value[1][2]:
                                decrease =  D*C*4;
                                area = pVneshBP+pVnutBP+pTop +per1+per2-decrease;
                                break;
                            case value[1][3]:
                                decrease =  D*C*6;
                                per2 = (E*C*2+E*D)*2;
                                area = pVneshBP+pVnutBP+pTop +per1+per2-decrease;
                            break;
                        }    
                    } 
            }  
                //  по свайному фундаменту в разработке
                } else if (radio.checked && radio.value === "4") {
                    let number = value[0][5];
                    area = ((A + B) * C * 2) * number; 
              
                } 
        }  
        return(area);   
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


