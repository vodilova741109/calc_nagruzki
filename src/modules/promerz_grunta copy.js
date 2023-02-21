
function getDateGrunt() {
    const formNagr = document.querySelector('.frm-nagruzka'),
        selectRegion = formNagr.querySelector('#region'),
        selectCity = formNagr.querySelector('#city'),
        selectGrunt = formNagr.querySelector('#grunt');
    let options,
        optionsCity;

    const newArrRegion = [];
    const newArrCity = [];
    function render() {    
        exampleJsonFile.GlubinaPromerz.forEach(function (item, index) {
        //   убираем из списка регионов повторяющиеся наименования
                if(newArrRegion.indexOf(item.region) === -1) {
                    newArrRegion.push(item.region);
                }     
        })      
       
    }
    render();
    // создаем select  с регионами
   for(let i = 0; i < 78; i++){
        const optionElement = document.createElement('option');
        // optionElement.classList.add('todo-item');
        optionElement.innerHTML =  newArrRegion[i] ;
        selectRegion.append(optionElement);
        options = selectRegion.querySelectorAll('option');
        
   }
   let arrGrunt ={};
    selectRegion.addEventListener('change', (e) =>{    
        //  получаем данные с JSON и передаем в переменные
       
       
        for (let i = 0; i < options.length; i++) {
            let region = exampleJsonFile.GlubinaPromerz[i].region,
            city = exampleJsonFile.GlubinaPromerz[i].city;
            let clayAndLoam = exampleJsonFile.GlubinaPromerz[i].clayAndLoam.toFixed(2);
            let sandyLoam = exampleJsonFile.GlubinaPromerz[i].sandyLoam.toFixed(2);
            let sand = exampleJsonFile.GlubinaPromerz[i].sand.toFixed(2);
            let CoarseСlasticSoils = exampleJsonFile.GlubinaPromerz[i].CoarseСlasticSoils.toFixed(2);
            //   проверяем регион и добавляем в города список городов того региона
            const optionCityElement = document.createElement('option');
                
            if(selectRegion.value === region) {
                selectCity.append(optionCityElement);             
                optionCityElement.innerHTML = city;
                optionsCity = selectCity.querySelectorAll('option');  
                console.log(optionCityElement.innerHTML)
                // optionCityElement.innerHTML.forEach(function (item, index) {
                //     //   убираем из списка регионов повторяющиеся наименования
                         
                //             newArrCity.push(item.city);
                //             console.log(newArrCity);
                //     }) 
                // if(optionsCity.innerHTML === undefined){
                //     // optionCityElement.innerHTML = '';
                //     optionsCity.innerHTML = '';
                    
                // }    
                
                
            }
            // при выборе города получаем его параметры и передаем в функцию расчета по типу грунта
            selectCity.addEventListener('change', (e)=>{
                if (selectCity.value === city) {
                    // console.log(region + ', ' + city + ':  Глина и суглинки, м: ' + clayAndLoam + ', Супеси, пылеватые и мелкие пески, м: ' + sandyLoam + ', Пески крупные гравелистые и средней крупности, м: ' + sand + ', Крупнообломочные грунты, м: ' + CoarseСlasticSoils);
                    arrGrunt = {region: region, city: city, clayAndLoam: clayAndLoam, sandyLoam: sandyLoam, sand: sand, CoarseСlasticSoils: CoarseСlasticSoils};
                    getTypeGrunt(arrGrunt);
                }

            })
        }   
    }) 

    // функция типа грунта
    function getTypeGrunt(arrGrunt){
        console.log(arrGrunt);
        let glubProm = 0;
        selectGrunt.addEventListener('change', (e) => {
            switch(selectGrunt.value){
                case 'clayAndLoam':
                    glubProm = +arrGrunt.clayAndLoam;
                break;
                case 'sandyLoam':
                    glubProm = +arrGrunt.sandyLoam;
                break;
                case 'sand':
                    glubProm = +arrGrunt.sand;
                break;
                case 'CoarseСlasticSoils':
                    glubProm = +arrGrunt.CoarseСlasticSoils;
                break;

            } 
            // console.log(selectGrunt.value);
            // console.log(glubProm);
        })
    }

  


  
   for (let i = 0; i <  exampleJsonFile.GlubinaPromerz.length; i++) {
    // console.log(exampleJsonFile.GlubinaPromerz[i].region);
   

}


   


}
import exampleJsonFile from './data/glubinaPromerz.json' assert { type: "json" };

export default getDateGrunt;