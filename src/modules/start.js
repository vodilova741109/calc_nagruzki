// запуск расчетов
function runStart() {
  document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    getResultConver();

    if (document.getElementsByClassName("box_nagruzka").length !== 0) {    
      startNagruzki();
      btnParam();
      //    убрать ссылку на акселератор плагин ускорения
      //   const searchLink = "https://www.s-sols.com/ru/products/wordpress/accelerator?utm_source=usersite&utm_medium=banner&utm_campaign=free_lim_ver&utm_term=accel";
      //   const elem = Array.from(document.querySelectorAll("a")).find((el) =>
      //     el.href.includes(searchLink)
      //   );
      //   if (elem) elem.style.display = "none";
      //   return;
    } else if (
      document.getElementsByClassName("frm-inp").length !== 0 &&
      document.getElementsByClassName("frm-beton").length !== 0
    ) {
      alert("есть параметры и бетон");
      btnParam();
      btnBeton();
      addSelectBeton();
      return;
    } else if (
      document.getElementsByClassName("frm-inp").length !== 0 &&
      document.getElementsByClassName("frm-arm").length !== 0
    ) {
      // alert("есть параметры и армирование");
      btnParam();
      btnArmatura();
      return;
    }
    //
    else {
      // alert("нет калькуляторов");
      return;
    }
  });
}

// import { btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnPrmerz, btnBeton, btnSave}  from './addEvent.js'
import { getDateGrunt, addSelectReion } from "./promerz_grunta.js";
import {startNagruzki} from "./sbor_nagruzok.js";

import { btnParam, btnSave, btnBeton, btnArmatura } from "./addEvent.js";
import { addSelectBeton } from "./getBeton.js";
import getResultConver from "./converter.js";

export default runStart;
