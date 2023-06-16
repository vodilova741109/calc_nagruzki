// запуск расчетов
function runStart(){
    document.addEventListener('DOMContentLoaded', function () {
        'use strict';   
        getResultConver(); 
        
        if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0 && document.getElementsByClassName("frm-promerz").length !== 0  && document.getElementsByClassName("frm-beton").length !== 0)
        {
            // alert("есть все");
            btnParam();
            btnOpalub();  
            btnTransh();
            btnGidroisol();
            btnArmatura();
            btnPrmerz();
            addSelectReion();
            getDateGrunt();
            btnBeton();
            addSelectBeton();    
            btnSave();  
              
            return;
        }  else if (document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0 && document.getElementsByClassName("frm-promerz").length !== 0 && document.getElementsByClassName("frm-beton").length !== 0)
         {
            // alert("есть все, кроме гидроизоляции");           
            btnParam();
            btnOpalub();  
            btnTransh();       
            btnArmatura();  
            btnPrmerz();
            getDateGrunt();
            addSelectReion();
            btnBeton();
            addSelectBeton();
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
            addSelectReion();
            btnPrmerz();   
            return;        
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-beton").length !== 0) {
            alert("есть параметры и бетон");   
            btnParam();          
            btnBeton();
            addSelectBeton();
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

import { btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnPrmerz, btnBeton, btnSave}  from './addEvent.js'


import {getDateGrunt, addSelectReion} from './promerz_grunta.js'
import {addSelectBeton} from './getBeton.js'
import getResultConver from './converter.js'

export default runStart;