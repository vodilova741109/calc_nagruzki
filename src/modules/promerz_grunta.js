const formNagr = document.querySelector('.frm-promerz'),
selectRegion = formNagr.querySelector('#region'),
selectCity = formNagr.querySelector('#city'),
selectGrunt = formNagr.querySelector('#grunt');     
// получение данных
function getDateGrunt() {
  
   
    let options,
        arrGrunt ={},
        obj = {};
    // получаем данные из JSON
    function getDateJson(){
        for(let i = 0; i < exampleJsonFile.GlubinaPromerz.length; i++){
            // получаем объект из JSON и передаем значение (регионы)
                obj = exampleJsonFile.GlubinaPromerz[i];
                getOptinRegion(obj);    
            }
    }
    getDateJson();  
    // создаем select  с регионами
    function getOptinRegion(obj){
            // получаем объект из JSON и передаем значение (регионы)
                    let  region = '';
                    for (let keys of Object.keys(obj)) {
                        region = keys;
                        // console.log(region);
                      } 
            // добавляем option в DOM дерево  select регионов
                const optionElement = document.createElement('option');      
                optionElement.innerHTML =  region;
                selectRegion.append(optionElement);
                options = selectRegion.querySelectorAll('option');       
                getDateCity(obj, region);
    }
    getOptinRegion(obj);

//   из объекта получем города и данные по грунтам и передаем их в новый массив
   function getDateCity (obj, region){
    // console.log(region, obj)
    //  если регион не выбран, то селект городов не активен и его индек 0
        if(region === ""){
            selectCity.disabled = true;
            selectCity.selectedIndex = 0;
            return false;
        } 
        // создаем новые option и добавляем в них значеие city из конкретного региона
        let out = "";
        out += `<option value="">Выберите город</option>`;
        for (let value of Object.values(obj)) {
            // проверяем выбранный регион со всеми регионами в объекте и выводим нужные нам значения
            if(selectRegion.value === region) {
                // получаем данные из обекта конкретного региона
                for (let i = 0; i < value.length; i++) {
                // города
                let city = value[i].city;
                // города передаем в разметку option
                out += `<option value="${city}">${city}</otion>`;
                //  получаем данные по типам грунта
                let clayAndLoam = value[i].clayAndLoam.toFixed(2);
                let sandyLoam = value[i].sandyLoam.toFixed(2);
                let sand = value[i].sand.toFixed(2);
                let CoarseСlasticSoils = value[i].CoarseСlasticSoils.toFixed(2);
               
                if (selectCity.value === ''){
                    selectGrunt.disabled = true;
                    selectGrunt.selectedIndex = 0;
                 } 
                 // при выборе города получаем его параметры и передаем в функцию цифру расчета по типу грунта
                selectCity.addEventListener('change', (e)=>{
                    gleaning();
                    if (selectCity.value === city) {
                        arrGrunt = {region: region, city: city, clayAndLoam: clayAndLoam, sandyLoam: sandyLoam, sand: sand, CoarseСlasticSoils: CoarseСlasticSoils};
                        getTypeGrunt(arrGrunt);
                        selectGrunt.disabled = false;
                        return arrGrunt
                    }
                })
            }  
            // передаем все option по городам конкретного региона в селект и делаем разблокировку селекта
            selectCity.innerHTML = out;   
            selectCity.disabled = false;
                
		// countryPlaceholder.innerHTML = country;
            }
        }
   }
   getDateCity(obj, region);
    
    selectRegion.addEventListener('change', (e) =>{getDateGrunt(),gleaning()}) 
    // selectCity.addEventListener('change', (e) =>{getDateGrunt()}) 
}
// функция типа грунта
function getTypeGrunt(arrGrunt){
    const domEl = getDomElem();
    const formNagr = document.querySelector('.frm-promerz'),
        selectGrunt = formNagr.querySelector('#grunt');   
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
// функция очистки
function gleaning(){
    const domEl = getDomElem();
    const promerzDate = document.querySelector('#promerzDate');
    promerzDate.innerText = "";     
}
function btnProm(){
    gleaning();
    selectRegion.selectedIndex = 0;
    selectCity.selectedIndex = 0;
    selectGrunt.selectedIndex = 0;
}
import getDomElem from './date.js';

import exampleJsonFile from './data/glubPron.json' assert { type: "json" };

export  {getDateGrunt,  btnProm};