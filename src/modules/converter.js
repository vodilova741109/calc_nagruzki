function getResultConvert() {
    function getDomElem() {
        const form = document.querySelector('#convector'),
            convName = form.querySelector('select[name="conv"]'),
            lengthNW = form.querySelector('#lengthNW'),
            squareNW = form.querySelector('#squareNW'),
            volumeNW = form.querySelector('#volumeNW'),
            lengthNW2 = form.querySelector('#lengthNW2'),
            squareNW2 = form.querySelector('#squareNW2'),
            volumeNW2 = form.querySelector('#volumeNW2'),
            inputs = form.querySelectorAll('input'),
            unitQuantity = form.querySelector('#unitQuantity input'),
            unitQuantity2 = form.querySelector('#unitQuantity2 input'),
            resNumber = form.querySelector('#resNumber');

        const arr = { form: form, convName: convName, lengthNW: lengthNW, squareNW: squareNW, volumeNW: volumeNW, lengthNW2: lengthNW2, squareNW2: squareNW2, volumeNW2: volumeNW2, inputs, unitQuantity: unitQuantity, unitQuantity2: unitQuantity2, resNumber: resNumber }
        return arr;
    }
    const arr = getDomElem();
    function getDAteInput() {
        for (let i = 0; i < arr.inputs.length; i++) {
            // в случае отсутсвия значения брать данные из placeholder
            if ((arr.inputs[i].value !== undefined || arr.inputs[i].value !== null) && arr.inputs[i].value === "" && arr.inputs[i].type != "hidden") {
                arr.inputs[i].value = arr.inputs[i].getAttribute("placeholder");
            }
            // проверка на минимум    
            if (+arr.inputs[i].min && +arr.inputs[i].value < +arr.inputs[i].min) {
                alert("- значение  меньше минимального (min = " + arr.inputs[i].min + ")");
                return;
            }
            arr.inputs[i].setAttribute("step", 0.01);
        }
    }
    getDAteInput();

    let response = {};
    function getDateJson() {
        response = UnitsJsonFile.Obj;
        return response;
    }
    function getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num) {

        getDateJson();
        const keysObjBet = Object.keys(response);
        //    вытаскиваем значение в виде вложенных объектов из массива
        for (let value of Object.values(response)) {


            // вытаскиваем ключи каждого вложенного объекта
            for (let keys of Object.keys(value)) {
                if (keys === date) {

                    // уровень 2                 
                    let M = value[keys][0].M[0];
                    let Sm = value[keys][1].Sm[0];
                    let Mlm = value[keys][2].Mlm[0];
                    let Liter = {};
                    if (value[keys][3]) {
                        Liter = value[keys][3].Liter[0];
                    }
                    let objOutDate = {};
                    let res = 0;
                    let name1 = '';
                    let name2 = '';
                    let param = '';
                    //   получение объекта исходной величины и ее соотношений
                    function getOutDate(select) {
                        switch (select) {
                            case 'M':
                                objOutDate = M;
                                name1 = 'м';
                                break;
                            case 'Sm':
                                objOutDate = Sm;
                                name1 = 'см';
                                break;
                            case 'Mlm':
                                objOutDate = Mlm;
                                name1 = 'мм';
                                break;
                            case 'Liter':
                                objOutDate = Liter;
                                name1 = 'л';
                                break;
                        }
                        getInsideDate(select, objOutDate);
                    }

                    //   получение преобразованной величины  с учетом данных инпута
                    function getInsideDate(select, objOutDate, param) {
                        switch (select) {
                            case 'm':
                                res = objOutDate.m * num;
                                name2 = 'м';
                                break;
                            case 's':
                                res = objOutDate.s * num;
                                name2 = 'см';
                                break;
                            case 'mlm':
                                res = objOutDate.mlm * num;
                                name2 = 'мм';
                                break;
                            case 'liter':
                                res = objOutDate.liter * num;
                                name2 = 'л';
                                break;
                        }
                        if (res === 0) {
                            res = res.toFixed(0);
                        } else if (res >= 0.01) {
                            res = res.toFixed(2);
                        } else if (res < 0.01) {
                            res = res.toFixed(6);
                        }
                        // передать в инпут результат
                        arr.unitQuantity2.value = res;
                        arr.unitQuantity2.setAttribute('disabled', 'disabled');

                        // Разделить числа в тексте пробелами по разрядам с учетом плавающей точки          
                        function numberWithSpaces(x) {
                            var parts = x.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                            return parts.join(".");
                        }
                        const result = numberWithSpaces(res);

                        // передать данные в текстовое поле
                        if (num !== 0 && (name1 !== 'л' && name2 !== 'л')) {
                            arr.resNumber.innerText = num + ' ' + param + name1 + ' =  ' + result + ' ' + param + name2;

                        } else if (num !== 0 && (name1 === 'л')) {
                            arr.resNumber.innerText = num + ' ' + name1 + ' =  ' + result + ' ' + param + name2;
                        }
                        else if (num !== 0 && (name2 === 'л')) {
                            arr.resNumber.innerText = num + ' ' + param + name1 + ' =  ' + result + ' ' + name2;
                        }
                    }

                    // вывод в функцию данных 
                    switch (date) {
                        case 'Length':
                            param = '';
                            getOutDate(datelengt);
                            getInsideDate(datelengt2, objOutDate, param);
                            break;
                        case 'Square':
                            param = 'кв.';
                            getOutDate(dateSquareNW);
                            getInsideDate(dateSquareNW2, objOutDate, param);
                            break;
                        case 'Volume':
                            param = 'куб.';
                            getOutDate(dateVolumeNW);
                            getInsideDate(dateVolumeNW2, objOutDate, param);
                            break;
                    }


                }
            }
        }
    }

    getDateObj();
    // передача значений из селектов и инпутов
    function getDateconvName() {
        let date = arr.convName.value;
        let datelengt = arr.lengthNW.value;
        let dateSquareNW = arr.squareNW.value;
        let dateVolumeNW = arr.volumeNW.value;
        let datelengt2 = arr.lengthNW2.value;
        let dateSquareNW2 = arr.squareNW2.value;
        let dateVolumeNW2 = arr.volumeNW2.value;
        let num = 0;
        getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        arr.convName.addEventListener('change', (e) => {
            date = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.lengthNW.addEventListener('change', (e) => {
            datelengt = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.squareNW.addEventListener('change', (e) => {
            dateSquareNW = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.volumeNW.addEventListener('change', (e) => {
            dateVolumeNW = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.lengthNW2.addEventListener('change', (e) => {
            datelengt2 = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.squareNW2.addEventListener('change', (e) => {
            dateSquareNW2 = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.volumeNW2.addEventListener('change', (e) => {
            dateVolumeNW2 = e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);
        })
        arr.unitQuantity.addEventListener('input', (e) => {
            num = +e.target.value;
            getDateObj(date, datelengt, dateSquareNW, dateVolumeNW, datelengt2, dateSquareNW2, dateVolumeNW2, num);

        })
    }
    getDateconvName();


}


import UnitsJsonFile from './data/units.json' assert { type: "json" };

export default getResultConvert