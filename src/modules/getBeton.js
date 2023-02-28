function calculateBeton() {
    const formBet = document.querySelector('.frm-beton'),
        selectBeton = formBet.querySelector('#beton'),
        selectCement = formBet.querySelector('#cement');
    const objBet = JsonFile.Obj;
    const objWeight = WeightJsonFile.Obj;
    const keysObjBet = Object.keys(objBet);
    const keysObjWeight = Object.keys(objWeight);
    console.log(selectBeton.value);
    let objectV =  {},
        objectWeight = {},
        objectDate ={};
    function getDateBeton(keysObjBet, objDate) {
        for (let keys of keysObjBet) {
            if (selectBeton.value === keys) {
                let obj = objDate[keys];
                for (let value of Object.values(obj)) {
                    let newObj = {},
                        cement = 0,
                        sand = 0,
                        rubble = 0,
                        water = 0,
                        weight= 0;
                        
                    switch (selectCement.value) {
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
                    if (selectCement.value !== '0') {
                      return objectDate;
                    } else {
                        alert('Выберите марку цемента');
                    }
                }
            }
        }
    }
    objectV =  getDateBeton(keysObjBet, objBet);
    function getСompound(a, b, c, d) {
        const dateCement = document.querySelector('#dateCement'),
            datePesok = document.querySelector('#datePesok'),
            dateCheb = document.querySelector('#dateCheb'),
            dateWater = document.querySelector('#dateWater');
        const domEl = getDomElem();
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
    }
    getСompound(objectV.cement, objectV.sand, objectV.rubble, objectV.water);

    objectWeight = getDateBeton(keysObjWeight, objWeight);
    console.log(objectWeight);

    function getWeight(a, b, c, d) {
        const weightCement = document.querySelector('#weightCement'),
        weightPesok = document.querySelector('#weightPesok'),
        weightCheb = document.querySelector('#weightCheb'),
        weightWater = document.querySelector('#weightWater');
        const domEl = getDomElem();
        const obS = calculateNw();
        let weight = 1;
        switch (selectBeton.value) {
            case (keysObjWeight[0]):
                weight = 2285;
            break;
            case (keysObjWeight[1]):
                weight = 2293;
            break;
            case (keysObjWeight[2]):
                weight = 2301;
            break;
            case (keysObjWeight[3]):
                weight = 2316;
            break;
            case (keysObjWeight[4]):
                weight = 2331;
            break;
        }
        weight *= obS.V;
        function vBet() {
            a *= weight;
            b *= weight;
            c *= weight;
            d *= weight;
            // console.log(a,b,c,d);
            weightCement.innerText = 'Цемент: ' + a.toFixed(2) + ' кг';
            weightPesok.innerText = 'Песок: ' + b.toFixed(2) + ' кг';
            weightCheb.innerText = 'Щебень: ' + c.toFixed(2) + ' кг';
            weightWater.innerText = 'Вода: ' + d.toFixed(2) + ' кг';
        }
        vBet();
    }
    getWeight(objectWeight.cement, objectWeight.sand, objectWeight.rubble, objectWeight.water);

    function gleaning() {
        selectCement.selectedIndex = 0;
        dateCement.innerText = '';
        datePesok.innerText = '';
        dateCheb.innerText = '';
        dateWater.innerText = '';
    }
    selectBeton.addEventListener('change', (e) => {
        // удаляем марку цемента 400 для 500 марки бетона
        const option = selectCement.querySelectorAll('option');
        if (selectBeton.value === '4') {
            option[1].style.display = 'none';
        }
        //функция очистки
        gleaning();
    })

}
import getDomElem from './date.js';
import calculateNw from './calculator.js'


import JsonFile from './data/beton.json' assert { type: "json" };
import WeightJsonFile from './data/betonWeight.json' assert { type: "json" };

export { calculateBeton };