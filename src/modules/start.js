// запуск расчетов
function runStart(){
    document.addEventListener('DOMContentLoaded', function () {
        'use strict';   

        if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0){
            // alert("есть все");
            btnParam();
            btnOpalub();  
            btnTransh();
            btnGidroisol();
            return;
        }  else if (document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0) {
            // alert("есть параметры, и опалубка и траншея");           
            btnParam();
            btnOpalub();  
            btnTransh();         
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0) {
            // alert("есть параметры и гидроизоляция");           
            btnParam();
            btnGidroisol();          
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0) {
            // alert("есть параметры и опалубка");           
            btnParam();
            btnOpalub();            
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0) {
            // alert("есть параметры и траншея");           
            btnParam();            
            btnTransh();
        }  else if(document.getElementsByClassName("frm-inp").length !== 0) {
            // alert("есть только параметры");           
            btnParam();            
        } else {
            // alert("нет калькуляторов");
            return;
        }
    });
};

import { btnParam, btnGidroisol, btnOpalub, btnTransh }  from './addEvent.js'


export default runStart;