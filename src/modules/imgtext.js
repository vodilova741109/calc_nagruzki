// получение параметров данных A, B, e, h, h1, h2 и т.д.
function getDateInp() {
    const objTr = getDateInput(),
        A = objTr.A,
        B = objTr.B,
        h = objTr.h,
        e = objTr.e,
        h1 = objTr.h1,
        h2 = objTr.h2,
        D = objTr.d,
        De = objTr.dNew;
    addTextImg(A, B, h, e, h1, h2, D, De);
}


// изменение параметров данных A, B, e, h  и т.д.
function addTextImg(A, B, h, e, h1, h2, D, De) {
    const imgBlock = document.querySelectorAll('.img-block ');
    const text = document.querySelectorAll('.active .activ text');  
    if (imgBlock[0].classList.contains('active')) {
        text[0].textContent = A + ' м';
        text[1].textContent = B + ' м';
        text[2].textContent = h + ' м';
        text[3].textContent = e + ' м';
    } else if (imgBlock[1].classList.contains('active')) {
        const img =  imgBlock[1].querySelectorAll('svg');   
        for (let elem of img) {         
            // расчет плитного фундамента по умолчанию 
            if (elem.classList.contains('activ')) {
                switch (elem.id) {
                    case 'svg1':                     
                    text[4].textContent = De.toFixed(2) + ' м';
                    text[5].textContent = D.toFixed(2) + ' м';
                    text[6].textContent = h + ' м';                   
                        break;
                    case 'svg2':
                    text[4].textContent = De.toFixed(2) + ' м';
                    text[5].textContent = D.toFixed(2) + ' м';
                    text[6].textContent = h + ' м';
                        break;
                    case 'svg3':                        
                    text[0].textContent = De.toFixed(2) + ' м';
                    text[1].textContent = D.toFixed(2) + ' м';
                    text[2].textContent = h2 + ' м';
                    text[3].textContent = h1 + ' м';
                        break;
                }
            }
        }
    }

}

// убрать для плиты второй вариант на склоне по умолчанию
function delElement(obT) {
    obT.fusion[2].classList.add("d-none");
}
//  прослушка события выбора типа фундамента
// лишние блоки скрываются
function eventInputType(obT, blockSvgPl, blockSvgLent) {
    const domEl = obT.domEl;
    // console.log(blockSvgPl, blockSvgLent )
    Cleaningdata(domEl.inputs, obT.totalTran);
    domEl.form.addEventListener('change', (e) => {
        for (let radio of domEl.typeFundamenta) {
            // расчет плитного фундамента по умолчанию 
            if (radio.checked) {
                if (radio.value === "2") {
                    // скрыть полностью блок траншеи при свайном
                    obT.transhBlock.classList.add("d-none");
                    obT.transhBlock.classList.remove("active");
                }
                else {
                    // открыть блок траншеи не при свайном
                    obT.transhBlock.classList.add("active");
                    obT.transhBlock.classList.remove("d-none");

                    if (radio.value === "1") {
                        // открыть траншею дома на склоне при ленте
                        obT.fusion[2].classList.add("active");
                        obT.fusion[2].classList.remove("d-none");
                        removeAddBlokImg(blockSvgLent, blockSvgPl)
                    } else {
                        // скрыть траншею дома на склоне при плите
                        obT.fusion[2].classList.add("d-none");
                        obT.fusion[2].classList.remove("active");
                        removeAddBlokImg(blockSvgPl, blockSvgLent);
                    }

                }

            }
        }
    })
    //  открыть блок с картинкой ленты, скрыть плиту (или наоборот) 
    function removeAddBlokImg(elem, notElem) {
        elem.classList.add("active");
        elem.classList.remove("d-none");

        notElem.classList.add("d-none");
        notElem.classList.remove("active");
    }
}


// какой блок с картинками имеет класс актив
function addBlockActiv(domEl, blockSvgLent, blockSvgPl, obT) {
    let blokImg = blockSvgPl;

    domEl.form.addEventListener('change', (e) => {
        obT.typeCalc[0].checked = true;
        for (let radio of domEl.typeFundamenta) {
            // расчет плитного фундамента по умолчанию 
            if (radio.checked) {
                if (radio.value === "1") {
                    // блок картинок при ленте
                    blokImg = blockSvgLent;
                } else if (radio.value === "0") {
                    // блок картинок  при плите
                    blokImg = blockSvgPl;
                }
            }

        }
        eventInputCalc(blokImg, obT)



    })
    // console.log(blokImg)
}

function eventInputCalc(blokImg, obT) {

    const img = blokImg.querySelectorAll('.img-block  svg');


    obT.form.addEventListener('change', (e) => {


        for (let radio of obT.typeCalc) {
            if (radio.checked) {
                img[radio.value].classList.add("activ");
                img[radio.value].classList.remove("d-none");

            } else if (img[radio.value].classList.contains('activ')) {
                // console.log()
                // if (img[radio.value].classList.contains('activ')) {

                img[radio.value].classList.add("d-none");
                img[radio.value].classList.remove("activ");
                // }

            }
        }
    })

}

const inputActivityCheck = () => {
    const obT = getElement(),
        imgBlock = document.querySelectorAll('.img-block '),
        blockSvgPl = imgBlock[0],
        blockSvgLent = imgBlock[1];
    let blokImg = blockSvgPl;


    delElement(obT);
    eventInputType(obT, blockSvgPl, blockSvgLent);
    eventInputCalc(blokImg, obT);
    addBlockActiv(obT.domEl, blockSvgLent, blockSvgPl, obT)

}

inputActivityCheck();


import { getElement, getDateInput } from './transh.js'
import Cleaningdata from './cleaning.js'

export default getDateInp