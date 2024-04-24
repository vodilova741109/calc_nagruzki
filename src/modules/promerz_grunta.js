function getDomElem() {

    // промерзание
    const formPromerz = document.querySelector('.frm-promerz'),
        selectRegion = formPromerz.querySelector('#region'),
        selectCity = formPromerz.querySelector('#city'),
        selectGrunt = formPromerz.querySelector('#grunt');
    const formatterInt = new Intl.NumberFormat('ru-RU');
    let promerz = [];

    const arrayDomElement = { formatterInt: formatterInt, formPromerz: formPromerz, selectRegion: selectRegion, selectCity: selectCity, selectGrunt: selectGrunt, arrpromerz: promerz }

    return arrayDomElement;
}
// получение данных
function getDateGrunt() {

    const domEl = getDomElem();
    let arrGrunt = {},
        obj = {};
    // получаем данные из JSON
    function getDateJson() {
        for (let i = 0; i < exampleJsonFile.GlubinaPromerz.length; i++) {
            // получаем объект из JSON и передаем значение (регионы)
            obj = exampleJsonFile.GlubinaPromerz[i];          
            getOptinRegion(obj);
        }
    }
    getDateJson();
    // создаем select  с регионами
    function getOptinRegion(obj) {
        let options;
        // получаем объект из JSON и передаем значение (регионы)
        let region = '';
       
        for (let keys of Object.keys(obj)) {     
                region = keys; 
        }
        const optionElement = document.createElement('option');
        options = domEl.selectRegion.querySelectorAll('option');
        // добавляем option в DOM дерево  select регионов      
        getDateCity(obj, region);
        // всего 77 (добавила 3 города федерального значения)регионов, прекратить добавление после 77 option
        if(options[80])  return;       
        else {   
            optionElement.innerHTML = region;
            domEl.selectRegion.append(optionElement);
        }
    }
  

    //   из объекта получем города и данные по грунтам и передаем их в новый массив
    function getDateCity(obj, region) {
        // console.log(region, obj)
        //  если регион не выбран, то селект городов не активен и его индек 0
        if (region === "") {
            domEl.selectCity.disabled = true;
            domEl.selectCity.selectedIndex = 0;
            return false;
        }
        // создаем новые option и добавляем в них значеие city из конкретного региона
        let out = "";
        out += `<option value="">Выберите город</option>`;
        for (let value of Object.values(obj)) {
            // проверяем выбранный регион со всеми регионами в объекте и выводим нужные нам значения
            if (domEl.selectRegion.value === region) {
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

                    if (domEl.selectCity.value === '') {
                        domEl.selectGrunt.disabled = true;
                        domEl.selectGrunt.selectedIndex = 0;
                    }
                    // при выборе города получаем его параметры и передаем в функцию цифру расчета по типу грунта
                    domEl.selectCity.addEventListener('change', (e) => {
                        gleaning();                    
                        domEl.selectGrunt.selectedIndex = 0;
                        if (domEl.selectCity.value === city) {
                            arrGrunt = { region: region, city: city, clayAndLoam: clayAndLoam, sandyLoam: sandyLoam, sand: sand, CoarseСlasticSoils: CoarseСlasticSoils };
                            getTypeGrunt(arrGrunt);
                            domEl.selectGrunt.disabled = false;
                            return arrGrunt
                        }
                    })
                }
                // передаем все option по городам конкретного региона в селект и делаем разблокировку селекта
                domEl.selectCity.innerHTML = out;
                domEl.selectCity.disabled = false;

                // countryPlaceholder.innerHTML = country;
            }
        }
    }



    // domEl.selectCity.addEventListener('change', (e) =>{getDateGrunt()}) 
}
function addSelectReion() {
    const domEl = getDomElem();
    domEl.selectRegion.addEventListener('change', (e) => { getDateGrunt(), gleaning(),   domEl.selectCity.selectedIndex = 0;
        domEl.selectGrunt.selectedIndex = 0; })
}
// функция типа грунта
function getTypeGrunt(arrGrunt) {
    const domEl = getDomElem();
    let glubProm = 0;
    let name = '';
    function getParam() {
        switch (domEl.selectGrunt.value) {
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
    }

    // запуск функции на событие
    let textProm = function () {
        domEl.selectGrunt.addEventListener('change', () => {
            getParam();
            promerzDate.innerText = 'Глубина промерзания в городе ' + arrGrunt.city + ' для типа грунта ' + name + ': ' + domEl.formatterInt.format(glubProm) + ' м';          
        })
        
    }
    textProm();
}


// функция очистки
function gleaning() {
   
    const promerzDate = document.querySelector('#promerzDate');   
    promerzDate.innerText = "";     
    
    
}
function btnProm(text) {
    const domEl = getDomElem(); 
    gleaning();
    domEl.selectRegion.selectedIndex = 0;
    domEl.selectCity.selectedIndex = 0;
    domEl.selectGrunt.selectedIndex = 0;
}
import exampleJsonFile from './data/glubPron.json' assert { type: "json" };


export { getDateGrunt, btnProm, addSelectReion, getDomElem, getTypeGrunt };