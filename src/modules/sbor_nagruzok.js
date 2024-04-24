function getDomElem() {
  // сбор нагрузок
  const formNagruzka = document.querySelector(".box_nagruzka"),
    plotnost = formNagruzka.querySelectorAll(".plotnost span"),
    coefficient = formNagruzka.querySelectorAll(".coefficient");
  const formatterInt = new Intl.NumberFormat("ru-RU");
  let selectMaterial = formNagruzka.querySelectorAll(".type_material select");

  const arrayDomElement = {
    formatterInt: formatterInt,
    formNagruzka: formNagruzka,
    selectMaterial: selectMaterial,
    type: [selectMaterial[0].id, selectMaterial[1].id, selectMaterial[2].id],
    plotnost: [plotnost[0], plotnost[1], plotnost[2]],
    coefficient: [
      coefficient[0].textContent,
      coefficient[1].textContent,
      coefficient[2].textContent,
    ],
  };
  return arrayDomElement;
}
// добавление блока (клонирование)
function addBlock() {
  const domEl = getDomElem(),
    paramForm = domEl.formNagruzka.querySelectorAll("form"),
    parent = domEl.formNagruzka.querySelectorAll("div .clone_block"),
    btnClone = domEl.formNagruzka.querySelectorAll(".fa-plus");
  // console.log(btnClone);

  for (let i = 0; i < btnClone.length; i++) {
    let count = 1;
    btnClone[i].addEventListener("click", (e) => {
      const children = paramForm[i].querySelector(
        ".clone_block .fusion-builder-row "
      );
      let clone = children.cloneNode(true);
      parent[i].appendChild(clone);
      count++;
      parent[i].lastChild.querySelector("li .circle-yes").textContent = count;
      clone.querySelector(".plotnost span").textContent = "0 ";
      domEl.selectMaterial = domEl.formNagruzka.querySelectorAll(
        ".type_material select"
      );
    });
  }
}
addBlock();

// получение данных из Json и передача их в селект
function getDatePlotnosty() {
  const domEl = getDomElem(),
    form = document.querySelectorAll("form");
  let obj = {};
  // получаем данные из JSON
  function getDateJson() {
    for (let i = 0; i < WeidghtJsonFile.variableLoads.length; i++) {
      // получаем объект из JSON и передаем значение (Виды)
      obj = WeidghtJsonFile.variableLoads[i];
      getOptinVariableLoads(obj, form, i);
    }
  }
  getDateJson();

  // создаем select co cписком материалов
  function getOptinVariableLoads(obj, form, i) {
    // получаем объект из JSON и передаем значение (стены, кровля, перекрытие)
    let variable = "";
    // получаем вид (стены, перекрытие, кровля)
    for (let keys of Object.keys(obj)) {
      variable = keys;
    }

    // из объекта получем материал
    function getDateMaterial() {
      let out = "";
      out += `<option value="">Выберите материал</option>`;
      let newparent = form[i].querySelectorAll(".newparent");
      let selectMaterial = form[i].querySelectorAll(".type_material select");

      // получаем объект со всеми видами материалов
      for (let ObjectMater of Object.values(obj)[0]) {
        // получаем каждый материал как ключ
        for (let keysMat of Object.keys(ObjectMater)) {
          for (let a = 0; a < selectMaterial.length; a++) {
            if (variable === selectMaterial[a].getAttribute("id")) {
              // console.log(keysMat, ObjectMater);
              // виды материалов передаем в разметку option
              out += `<option value="${keysMat}">${keysMat}</otion>`;
              selectMaterial[a].innerHTML = out;
              getDatePlotnost(
                ObjectMater,
                selectMaterial,
                newparent,
                form,
                variable,
                a
              );
            }
          }
        }
      }
    }
    getDateMaterial();
  }
}

// получения значения плотности
function getDatePlotnost(
  ObjectMater,
  selectMaterial,
  newparent,
  form,
  variable,
  a
) {
  const domEl = getDomElem();
  let datePlt = "";
  const btn = domEl.formNagruzka.querySelectorAll(".fa-plus");

  function actionSelect(selectMaterial, newparent) {
    selectMaterial.forEach((item, index) => {
      // console.log(index);
      selectMaterial[index].addEventListener("change", (e) => {
        //  console.log(ObjectMater, selectMaterial.value, newparent[a], form, variable);
        for (let i = 0; i < Object.keys(ObjectMater).length; i++) {
          if (selectMaterial[index].value === Object.keys(ObjectMater)[i]) {
            datePlt = Object.values(ObjectMater)[i];
            newparent[index].querySelector(".plotnost span").textContent =
              datePlt + " ";
          }
          if (
            selectMaterial[index].getAttribute("id") === variable &&
            selectMaterial[index].value === ""
          ) {
            //  console.log(selectMaterial[index]);
            gleaning(newparent[index]);
          }
        }
      });

      //  если  селекте не выбран конкретный материал, то плотность снова 0
    });
  }
  actionSelect(selectMaterial, newparent);

  //  при клике клонирования блока дом-элементы selectMaterial, newparent перерисовываются, "а" становится счетчиком
  btn.forEach((item, index) => {
    btn[index].addEventListener("click", () => {
      let selectMaterialNew = form[index].querySelectorAll(
        ".type_material select"
      );
      let newparentNew = form[index].querySelectorAll(".newparent");
      a++;
      selectMaterial = selectMaterialNew;
      newparent = newparentNew;
      actionSelect(selectMaterial, newparent);
    });
  });
}

// функция очистки
function gleaning(newparent) {
  // console.log(newparent);
  newparent.querySelector(".plotnost span").textContent = "0 ";
}

// расчетное значение
function calcValue(a) {
  const formNagruzka = document.querySelector(".box_nagruzka"),
    paramForm = formNagruzka.querySelectorAll("form");
  const blockParam = paramForm[a].children[0];
  const blockResult = paramForm[a].children[1];
  let CalcNagruz = 0;

  // const blockId = blockParam.getAttribute("id"); // Получим значение атрибута 'id'

  if (blockParam) {
    const plotnost =
        paramForm[a].children[0].querySelectorAll(".plotnost span"),
      coefficient = paramForm[a].querySelector(".coefficient"),
      blockInputs = blockParam.querySelectorAll(".param_nagr"),
      resultTn = blockResult.querySelector(".result_1"),
      resultCoef = blockResult.querySelector(".result_2");

    let coefficientValue = +coefficient.textContent;
    let numbers = [];
    for (let i = 0; i < plotnost.length; i++) {
      const inputParam = blockInputs[i].querySelectorAll("input");
      getDAteInput(inputParam);
      let plotnostValue = +plotnost[i].textContent;
     
      // расчет нагрузки и передача результата в текст
      let area = 0;

      // расчет площади
      if (blockParam.id === "frm-krovly") {
        let typesKrovly = blockParam.querySelectorAll("fieldset input");
        for (let i = 0; i < typesKrovly.length; i++) {
          let expr = typesKrovly[i].value;
          if (typesKrovly[i].checked) {
               let H  = +blockParam.querySelector("#length-a").value,
                 H1 = +blockParam.querySelector("#length-b").value,
                 H2 = +blockParam.querySelector("#length-c").value,
                 H4 = +blockParam.querySelector("#length-d").value,
                 H3 = +blockParam.querySelector("#length-f").value,
                 W = +blockParam.querySelector("#width-a").value,
                 W1 = +blockParam.querySelector("#width-b").value,
                 W2 = +blockParam.querySelector("#width-c").value,
                 W3 = +blockParam.querySelector("#width-d").value;
              
            switch (expr) {
              case "pl":
              case "od":
                area = H * W ;
                break;
              case "dv":
                 area = W * (H1+H2);
                console.log("Двускатная");
                break;
              case "vl":
                console.log("Вальмовая, по две стороны каждой");
                 area = (W1 + W3)* H1 + (H2 * W2);
                break;
              case "sh":
                console.log("Шатровая, две стороны каждой");
                area = (H1 * W1)   + (H2 * W2) ;
                break;
              case "mn":
                console.log("Мансардная");
                area = (H3 + H4) * 2 * W;
                break;
              default:
                console.log("Не найдено " + expr + ".");
            }
          }
        }
      } else {
        let lengthNagruz = +inputParam[0].value,
          widthhNagruz = +inputParam[1].value,
          heightNagruz = +inputParam[2].value;
        area =  lengthNagruz * widthhNagruz * heightNagruz;
      }
      //  area = area;
      if (plotnostValue === 0) {
        alert("Выберите материал кровли");
        return;
      } 
      // умножение плотности на площадь
      CalcNagruz = plotnostValue * area;
      let sum = 0;
      numbers.push(CalcNagruz);
      numbers.map((item) => (sum += item));      
     let itemTn = (sum / 1000).toFixed(2),
       itemCoeff = (itemTn * coefficientValue).toFixed(2);
      resultTn.textContent = itemTn;
      resultCoef.textContent = itemCoeff;
    }
  }

  // мининмум и placeholder
  function getDAteInput(inputParam) {
    for (let i = 0; i < inputParam.length; i++) {
      // в случае отсутсвия значения брать данные из placeholder
      if (
        (inputParam[i].value !== undefined || inputParam[i].value !== null) &&
        inputParam[i].value === "" &&
        inputParam[i].type != "hidden"
      ) {
        inputParam[i].value = inputParam[i].getAttribute("placeholder");      
      }
      // проверка на минимум
      if (+inputParam[i].min && +inputParam[i].value < +inputParam[i].min) {
        alert(
          "- значение  меньше минимального (min = " + inputParam[i].min + ")"
        );
        return;
      }
      inputParam[i].setAttribute("step", 0.01);
      
    }
  }
}

// событие по кнопке "рассчитать"
function btnNagruz() {
  const formNagruzka = document.querySelector(".box_nagruzka"),
    btnNagrus = formNagruzka.querySelectorAll(".button");
  for (let a = 0; a < btnNagrus.length; a++) {
    btnNagrus[a].addEventListener("click", (e) => {
      calcValue(a);
    });
  }
}


const btnResult = document.querySelector("#result"); 
btnResult.addEventListener("click", (e) => {
      const pseudoArray = document.querySelectorAll(".result_1"),
        pseudoArrayCoef = document.querySelectorAll(".result_2");
      const resultsText = document.querySelector(".results_1"),
        resultsTextCoeff = document.querySelector(".results_2");
        // addResult(); 
   
      sendTotal(pseudoArray, resultsText);
      sendTotal(pseudoArrayCoef, resultsTextCoeff);
})
 

function startNagruzki() {
  getDatePlotnosty();
  btnNagruz();
}


import WeidghtJsonFile from "./data/loadWeight.json" assert { type: "json" };

import { convertArray, sumEl, sendTotal } from "./calcPush.js";

export { startNagruzki};


