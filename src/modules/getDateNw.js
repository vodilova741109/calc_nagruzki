 // получение новых массивов с вводными данными из Dom-элементов
function getDateNw(inputs, areaElement,totalConsumptionElement, label){       
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
    return(arrNew);
}

export default getDateNw;