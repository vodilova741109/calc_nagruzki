 // расчет площади составляюищ поверхностей (внеш, внут, верх)
 function getAreaType(areaSv){
    const  domEl = getDomElem(); 
    const  obS = calculateNw();  

    domEl.select.addEventListener('change', (e) =>{       
        for (let i = 0; i < domEl.options.length; i++) {
            // alert(select.value);
            switch (e.target.value) {    
                            case '20' :      
                                getCalcTypeFund();
                                obS.area;                                                                 
                                domEl.areaElement1.innerText = '';
                            break;  
                            // первый тип   
                            case '21' :      
                                obS.area  =  obS.pVneshBP;
                                domEl.areaElement1.innerText = "Внешняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';    
                            break;
                            // второй тип    
                            case '22':
                                if(domEl.typeFundamenta[0].value === "0" && domEl.typeFundamenta[0].checked ){    
                                    obS.area  =  0;                                           
                                    domEl.areaElement1.innerText = "Нет внутренней поверхности"; 
                                } else {
                                    obS.area  =  obS.pVnut;      
                                    domEl.areaElement1.innerText = "Внутренняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';                                     
                                }    
                                break;
                            case '23': 
                                // третий тип    
                                obS.area  =  obS.pTop;    
                                domEl.areaElement1.innerText = "Верхняя поверхность " + domEl.formatterInt.format(obS.area) + ' м2';   
                                break;
                            case '24': 
                            // третий тип       
                            if(domEl.typeFundamenta[2].value === "2" && domEl.typeFundamenta[2].checked){
                                obS.area  =  obS.areaSv;      
                                domEl.areaElement1.innerText = "Поверхность свай " + domEl.formatterInt.format(obS.area) + ' м2';                                     
                            } else {
                                obS.area  =  0; 
                                domEl.areaElement1.innerText = "Только для свайного фундамента"; 
                            }   
                            break;
            }   
        }               
        getGidroisol(obS.area);
    }) 

}
import getDomElem from './date.js'
import getGidroisol from './gidroisol.js'
import calculateNw from './calculator.js'

export default getAreaType