// запуск расчетов
function runStart(){
    document.addEventListener('DOMContentLoaded', function () {
        'use strict';   
        
        if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0 && document.getElementsByClassName("frm-promerz").length !== 0  && document.getElementsByClassName("frm-beton").length !== 0)
        {
            // alert("есть все");
            btnParam();
            btnOpalub();  
            btnTransh();
            btnGidroisol();
            btnArmatura();
            btnPrmerz();
            getDateGrunt();
            btnBeton();
            return;
        }  else if (document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0 && document.getElementsByClassName("frm-promerz").length !== 0 && document.getElementsByClassName("frm-beton").length !== 0)
         {
            // alert("есть параметры, опалубка, траншея, армирование");           
            btnParam();
            btnOpalub();  
            btnTransh();       
            btnArmatura();  
            btnPrmerz();
            getDateGrunt();
            btnBeton();
            return;
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0) {
            // alert("есть параметры и гидроизоляция");           
            btnParam();
            btnGidroisol();      
            return;    
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0) {
            // alert("есть параметры и опалубка");           
            btnParam();
            btnOpalub();    
            return;        
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0) {
            // alert("есть параметры и траншея");           
            btnParam();            
            btnTransh();
            return;
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0) {
            // alert("есть параметры и армирование");           
            btnParam();  
            btnArmatura(); 
            return;
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-promerz").length !== 0) {
            // alert("есть параметры и промерзание");           
            btnParam();  
            getDateGrunt();
            btnPrmerz();   
            return;        
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-beton").length !== 0) {
            // alert("есть параметры и бетон");           
            btnBeton();
            return;
        }         
         else if(document.getElementsByClassName("frm-inp").length !== 0) {
            // alert("есть только параметры");           
            btnParam(); 
        } else {
            // alert("нет калькуляторов");
            return;
        }
    });
};

import { btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnPrmerz, btnBeton}  from './addEvent.js'

import {getDateGrunt} from './promerz_grunta.js'

export default runStart;