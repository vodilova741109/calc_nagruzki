// расчет материала в ед.изм и передача в текст formatterInt
function getGidroisol(area){
    const domEl = getDomElem();
    const  obS = calculateNw(); 
    const coefficient = 1.1;
    let numberLayers = domEl.arrValue[0][22];
    let consumption= domEl.arrValue[0][18]*coefficient*numberLayers;  
   

    let totalConsumption = obS.area * consumption;    
   let objGidroiz = {}; 
    domEl.areaGidro.innerText = "Общая площадь для гидроизоляции " + domEl.formatterInt.format(obS.area) + ' м2'; 
    if(area != undefined){
        totalConsumption = area * consumption;  
    } 
    for(let radio of domEl.materialType){
        let name = 'Количество банок ';
        let quantity= domEl.arrValue[0][19]; 
        let widthRul = domEl.arrValue[0][20];
        let lengthRul = domEl.arrValue[0][21];
       
        if (radio.checked && radio.value === "8"){
            domEl.totalConsumptionElement.innerText = "Для данной площади необходимо " +  domEl.formatterInt.format(totalConsumption) + ' кг';      
            objGidroiz.totalKg = totalConsumption;                  
            if(quantity){
                let quantityKg = totalConsumption/quantity;
                domEl.quantityElement.innerText = name + domEl.formatterInt.format(quantityKg) + ' шт'; 
                objGidroiz.totalStuk = quantityKg;    
            } else{
                domEl.quantityElement.innerText =  ' ';   
            }
        } else if (radio.checked && radio.value === "9"){
            name = ' рул. ';    
            const Srul =  widthRul*lengthRul;           
            let quantityRul = obS.area/Srul;
            domEl.totalConsumptionElement.innerText = domEl.formatterInt.format(quantityRul) + name;
            domEl.quantityElement.innerText =  ' ';
            objGidroiz.gidrisolRul = quantityRul;
        }
    }      
  
    return objGidroiz; 
    
}


import calculateNw from './calculator.js'
import getDomElem from './date.js'
export default getGidroisol