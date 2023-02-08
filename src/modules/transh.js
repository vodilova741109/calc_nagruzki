
function getCalcTransh(){
    const form = document.querySelector('.form-transhei');      
    const inputs =  form.querySelectorAll('input');
    const label = form.querySelectorAll('label');
    const typeCalc =  form.querySelectorAll('input[name="calc-type"]');
    
    const domEl = getDomElem();   
    const totalTran = domEl.totalTran;
    const description = domEl.description;
    const formatterInt = new Intl.NumberFormat('ru-RU');
    // получение массива с вводными данными из Dom-элементов
    function numDosc(){ 
        getDateNw(inputs, totalTran, label);  
        // расчет периметра исходя из типа  
        // переменные
        // длина ленты * D = площадь верха
        const arrayOpalub = calculateNw();  
            // выбор расчета площади по типу фундамента
        const h = inputs[3].value, 
                d = arrayOpalub.d, 
                dNew = d+0.6,
                h1 = inputs[4].value, 
                h2 = inputs[5].value,
                l= arrayOpalub.pTop/d;               	
        let V = 0;
        function getCalcTypeFund(){
            for(let radio of typeCalc){ 
                // Расчет объема грунта котлована с вертикальными стенками
                if(radio.checked && radio.value === "0") {
                    V = Math.ceil(l*dNew*h);
                    description.innerText = "Оптимальный наружный отступ (край углубления) от основных проектных границ здания - порядка 600 мм (учтен в расчете) для прохода и возможности выполнять монтаж.";
                }
                // Расчет объема грунта котлована с вертикальными стенками с перепадом высот (дом на склоне)
                else if (radio.checked && radio.value === "1"){  
                    const S1 = dNew * h1;
                    const S2 = dNew * h2;
                    V = Math.ceil((S1 + S2)/2*l); 
                    description.innerText = "Если углубление имеет вертикальные стенки с перепадом высот (дом на склоне) применяется расчет по площади сечений стен, имеющих разную высоту. Учтено в расчете 600 мм для прохода и возможности выполнять монтаж.";
                   
                }
                // Расчет объема котлована с откосами
                else if (radio.checked && radio.value === "2") {      
                    const S1 = +inputs[6].value, 
                          S2 = +inputs[7].value;            
                    V = Math.ceil((S1 + S2)/2*h);
                    description.innerText = "";
                } 
            }  
            return V; 	
        } 
        getCalcTypeFund();
        //  форматирование 
        totalTran.innerText = "Необходимо вырыть траншею объемом " +  formatterInt.format(Math.ceil(V)) + ' м3';
      
  
    }
    Cleaningdata(inputs);
    numDosc();    
}
import calculateNw from './calculator.js'
import getDateNw from './getDateNw.js'
import Cleaningdata from './cleaning.js'
import getDomElem from './date.js'
export default getCalcTransh