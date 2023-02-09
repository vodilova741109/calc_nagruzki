const domEl = getDomElem();     
function Cleaningdata (inputs = domEl.inputs){ 
        for(const input of inputs) {      
        input.addEventListener('input', () =>{    
            if(input.name != 'calc-type'){
                domEl.select.value = '20'; 
                domEl.areaElement.innerText = '';
                domEl.volumeFund.innerText = '';  
                domEl.areaElement1.innerText = ''; 
                domEl.totalConsumptionElement.innerText = '';       
                domEl.quantityElement.innerText = ''; 
                
            }
            else {
                domEl.totalTran.innerText = ''; 
                domEl.description.innerText =''; 
            }    
        })   
    } 
}
import getDomElem from './date.js'
export default Cleaningdata