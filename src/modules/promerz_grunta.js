
function getDateGrunt() {
    const domEl = getDomElem();
    const formNagr = document.querySelector('.frm-nagruzka'),
        selectRegion = formNagr.querySelector('#region'),
        selectCity = formNagr.querySelector('#city'),
        selectGrunt = formNagr.querySelector('#grunt'),        
        promerzDate = document.querySelector('#promerzDate');    
    let options,
        arrGrunt ={};
    // создаем select  с регионами
   for(let i = 0; i < exampleJsonFile.GlubinaPromerz.length; i++){
    // получаем объект из JSON и передаем значение (регионы)
            let obj = exampleJsonFile.GlubinaPromerz[i],
            region = '';
            for (let keys of Object.keys(obj)) {
                region = keys;
              } 
    // добавляем option в DOM дерево  select регионов
        const optionElement = document.createElement('option');      
        optionElement.innerHTML =  region ;
        selectRegion.append(optionElement);
        options = selectRegion.querySelectorAll('option');       
        getDateCity(obj, region);
   }
//   из объекта получем города
   function getDateCity (obj, region){
    //  если регион не выбран, то селект городов не активен и его индек 0
        if(region === ""){
            selectCity.disabled = true;
            selectGrunt.disabled = true;
            selectCity.selectedIndex = 0;
            selectGrunt.selectedIndex = 0;
            return false;
        }
       
        // создаем новые оптионы и добавляем в них значеие city из конкретного региона
        let out = "";
        out += `<option value="">Выберите город</option>`;
        for (let value of Object.values(obj)) {
            // проверяем выбранный регион со всеми регионами в объекте и выводим нужные нам значения
            if(selectRegion.value === region) {
                // console.log(region, value, selectRegion.value); // 
                for (let i = 0; i < value.length; i++) {
                let city = value[i].city;
               
                out += `<option value="${city}">${city}</otion>`;
                //  получаем данные по типам грунта
                let clayAndLoam = value[i].clayAndLoam.toFixed(2);
                let sandyLoam = value[i].sandyLoam.toFixed(2);
                let sand = value[i].sand.toFixed(2);
                let CoarseСlasticSoils = value[i].CoarseСlasticSoils.toFixed(2);
                // при выборе города получаем его параметры и передаем в функцию расчета по типу грунта
                selectCity.addEventListener('change', (e)=>{
                    if (selectCity.value === city) {
                        arrGrunt = {region: region, city: city, clayAndLoam: clayAndLoam, sandyLoam: sandyLoam, sand: sand, CoarseСlasticSoils: CoarseСlasticSoils};
                        getTypeGrunt(arrGrunt, out);
                    }
                         
                })
            }   
                selectCity.innerHTML = out;               
                selectGrunt.disabled = false;
                selectCity.disabled = false;
		// countryPlaceholder.innerHTML = country;
            }
        }
   }

   

  
    // функция типа грунта
    function getTypeGrunt(arrGrunt){
        let glubProm = 0;
        let name = '';
        selectGrunt.addEventListener('change', (e) => {
            switch(selectGrunt.value){
                case 'clayAndLoam':
                    glubProm = +arrGrunt.clayAndLoam;
                    name = 'Глина и суглинки ';
                break;
                case 'sandyLoam':
                    glubProm = +arrGrunt.sandyLoam;
                    name = 'Супеси, пылеватые и мелкие пески ';
                break;
                case 'sand':
                    glubProm = +arrGrunt.sand;
                    name = 'Пески крупные гравелистые и средней крупности ';
                break;
                case 'CoarseСlasticSoils':
                    glubProm = +arrGrunt.CoarseСlasticSoils;
                    name = 'Крупнообломочные грунты ';
                break;
            } 
            promerzDate.innerText = 'Глубина промерзания в городе ' + arrGrunt.city +  ' для типа грунта "' + name +'": '  +   domEl.formatterInt.format(glubProm) + ' м';     
        })
    }
    selectRegion.addEventListener('change', (e) =>{getDateGrunt()}) 
    // selectCity.addEventListener('change', (e) =>{getDateGrunt()}) 
}

function btnProm(){
    const domEl = getDomElem();
    const promerzDate = document.querySelector('#promerzDate');
    promerzDate.innerText = "";
}
import getDomElem from './date.js';

import exampleJsonFile from './data/glubPron.json' assert { type: "json" };

export  {getDateGrunt, btnProm};