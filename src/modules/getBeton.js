function getDomElem(){
    //бетон
    const formBet = document.querySelector('.frm-beton'),
        selectBeton = formBet.querySelector('#beton'),
        selectCement = formBet.querySelector('#cement'); 
    // преобразует число под российский формат
    const formatterInt = new Intl.NumberFormat('ru-RU');
    
    const arrayDomElement = {formBet: formBet, selectBeton:selectBeton, selectCement: selectCement  }
  
    return arrayDomElement;
}

function calculateBeton() {
    const domEl = getDomElem();
    const objBet = JsonFile.Obj;
    const objWeight = WeightJsonFile.Obj;
    const keysObjBet = Object.keys(objBet);
    const keysObjWeight = Object.keys(objWeight);   
    let objectV =  {},
        objectWeight = {},
        objectDate ={};        
    function getDateBeton(keysObjBet, objDate) {
        for (let keys of keysObjBet) {
            if (domEl.selectBeton.value === keys) {
                let obj = objDate[keys];
                for (let value of Object.values(obj)) {
                    let newObj = {},
                        cement = 0,
                        sand = 0,
                        rubble = 0,
                        water = 0,
                        weight= 0;
                        
                    switch (domEl.selectCement.value) {
                        case (Object.keys(value[0])[0]):
                            newObj = Object.values(value[0])[0][0];
                            break;
                        case (Object.keys(value[1])[0]):
                            newObj = Object.values(value[1])[0][0];
                            break;
                    }
                    cement = newObj.cement;
                    sand = newObj.sand;
                    rubble = newObj.rubble;
                    water = newObj.water;
                    weight = newObj.weight;
                    objectDate= {cement:cement, sand:sand, rubble:rubble, water:water, weight: weight}
                    if (domEl.selectCement.value !== '0') {
                      return objectDate;
                    } else {
                        return;       
                    }
                }
            }
        }
    }
     // получение данных по объему
    objectV =  getDateBeton(keysObjBet, objBet);    
    function getCompound(a, b, c, d) {
        const dateCement = document.querySelector('#dateCement'),
            datePesok = document.querySelector('#datePesok'),
            dateCheb = document.querySelector('#dateCheb'),
            dateWater = document.querySelector('#dateWater');
        const obS = calculateNw();
        function vBet() {
            a *= obS.V;
            b *= obS.V;
            c *= obS.V;
            d *= obS.V;
            // console.log(a,b,c,d);
            dateCement.innerText = 'Цемент: ' + a.toFixed(2) + ' м3';
            datePesok.innerText = 'Песок: ' + b.toFixed(2) + ' м3';
            dateCheb.innerText = 'Щебень: ' + c.toFixed(2) + ' м3';
            dateWater.innerText = 'Вода: ' + d.toFixed(2) + ' м3';
        }
        vBet();
        let obCompound = {
            'Цемент в м3': a.toFixed(2),
            'Песок в м3': b.toFixed(2),
            'Щебень в м3': c.toFixed(2),
            'Вода в м3': d.toFixed(2)
         };       
         return obCompound;
    }
   
    // получение данных по весу
   
    objectWeight = getDateBeton(keysObjWeight, objWeight);
    // console.log(objectWeight);
    function getWeight(a, b, c, d, weight ) {
        const weightCement = document.querySelector('#weightCement'),
        weightPesok = document.querySelector('#weightPesok'),
        weightCheb = document.querySelector('#weightCheb'),
        weightWater = document.querySelector('#weightWater');
        const obS = calculateNw();
        weight *= obS.V;
        function vBet() {
            a *= weight;
            b *= weight;
            c *= weight;
            d *= weight;
            let words = declOfNum(Math.ceil(d), [' литр', ' литра', ' литров']); 
            
            // console.log(a,b,c,d);
            weightCement.innerText = 'Цемент: ' + a.toFixed(2) + ' кг';
            weightPesok.innerText = 'Песок: ' + b.toFixed(2) + ' кг';
            weightCheb.innerText = 'Щебень: ' + c.toFixed(2) + ' кг';
            weightWater.innerText = 'Вода: ' + d.toFixed(2) + words;
            let arrBet = [a,b,c,d];
            addDateBeton(arrBet);           
        }
        vBet();
        let obWeightCement = {
           'Цемент в кг': a.toFixed(2),
           'Песок в кг': b.toFixed(2),
           'Щебень в кг': c.toFixed(2),
           'Вода в кг': d.toFixed(2)
        };       
        return obWeightCement;
    }    

    if (domEl.selectCement.value !== '0') {
        getCompound(objectV.cement, objectV.sand, objectV.rubble, objectV.water);
        getWeight(objectWeight.cement, objectWeight.sand, objectWeight.rubble, objectWeight.water, objectWeight.weight);
        let obCompound =   getCompound(objectV.cement, objectV.sand, objectV.rubble, objectV.water);
        let obWeightCement = getWeight(objectWeight.cement, objectWeight.sand, objectWeight.rubble, objectWeight.water, objectWeight.weight);
        let objBeton = {
            obCompound,
            obWeightCement
        }       
        return objBeton;

      } else {
          alert('Выберите марку цемента');                        
      }
   
    let arrayText =[dateCement, datePesok, dateCheb, dateWater, weightCement, weightPesok, weightCheb, weightWater]
    function gleaning() {    
        for(let i = 0; i< arrayText.length; i++){
            arrayText[i].innerText = '';
        }           
    }
    domEl.selectBeton.addEventListener('change', (e) => {
        domEl.selectCement.selectedIndex = 0;
         // удаляем марку цемента 400 для 500 марки бетона
         const option = domEl.selectCement.querySelectorAll('option');       
         if (domEl.selectBeton.value === '5') {           
             option[1].style.display = 'none';
         }
       
        //функция очистки
        gleaning();
    })
    domEl.selectCement.addEventListener('change', (e) => {
        //функция очистки
        gleaning();
    })

    Cleaningdata(domEl.inputs,arrayText);
    
}
function addSelectBeton(){
    const domEl = getDomElem();
    domEl.selectBeton.addEventListener('change', (e) => {   
        // удаляем марку цемента 400 для 500 марки бетона
        const option = domEl.selectCement.querySelectorAll('option');   
        
        if (domEl.selectBeton.value === '5') {           
            option[1].style.display = 'none';
        } else{
            option[1].style.display = 'block';    
        }
})


}


import calculateNw from './calculator.js'
import declOfNum from './declOfNum.js'
import Cleaningdata from './cleaning.js'
import {addDateBeton} from './sbor_nagruzok.js' 

import JsonFile from './data/beton.json' assert { type: "json" };
import WeightJsonFile from './data/betonWeight.json' assert { type: "json" };

export { getDomElem ,calculateBeton, addSelectBeton};