
function getDateArmatura() {
  const obS = calculateNw();
  const domEl = getDomElem();
  const form = document.querySelector(".frm-arm"),
    select = form.querySelector("#arm"),
    options = select.querySelectorAll("option");

  let diam;
  let coeficM;
  let objArm = {};
  const density = 7850;
  // выбор коэффициента по типу фундамента
  function getCalcTypeFund() {
    for (let radio of domEl.typeFundamenta) {
      // расчет плитного фундамента по умолчанию
      if (radio.checked) {
        switch (radio.value) {
          case "0":
            // тонны для плиточного
            coeficM = 0.018;
            break;
          case "1":
          case "2":
            // тонны для ленточного
            coeficM = 0.022;
            break;
        }
      }
    }
  }
  getCalcTypeFund();
  // расчет по типу строения (разный диаметр)
  switch (select.value) {
    case "0":
      diam = 0;
      alert("Выберите диаметр арматуры");
    // первый тип
    case "10":
      diam = 0.01;
      break;
    // второй тип
    case "12":
      diam = 0.012;
      break;
    case "14":
      // третий тип
      diam = 0.014;
    case "16":
      diam = 0.016;
      break;
  }
  // console.log(diam);
  // сброс при ничальном положении
  let arrayText = [domEl.lengthText, domEl.kilogramText];
  select.addEventListener("change", (e) => {
    for (let i = 0; i < arrayText.length; i++) {
      arrayText[i].innerText = "";
    }
  });
  const Kilog = coeficM * 1000 * obS.V,
    Varm = Kilog / density,
    SseshenArm = Math.PI * Math.pow(diam / 2, 2),
    Larm = Varm / SseshenArm;
    addDateArm(Kilog);
  if (select.value != "0") {
    domEl.kilogramText.innerText =
      "Вес  " + domEl.formatterInt.format(Kilog) + " кг";
    domEl.lengthText.innerText =
      "Длина  " + domEl.formatterInt.format(Larm) + " м";
  }

  // console.log(Varm,SseshenArm, diam)
  Cleaningdata(domEl.inputs, arrayText);

  objArm.Kilog = Kilog;
  objArm.Larm = Larm;
  return objArm;
}


import calculateNw from './calculator.js'
import getDomElem from './date.js'
import Cleaningdata from './cleaning.js'
import { addDateArm } from "./betonAndArm.js";
export default getDateArmatura;