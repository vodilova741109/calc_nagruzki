const domEl = getDomElem();     
function Cleaningdata (inputs = domEl.inputs, arrayText){ 
        for(const input of inputs) {      
        input.addEventListener('input', () =>{    
            if(input.name != 'calc-type'){           
                domEl.areaElement.innerText = '';
                domEl.volumeFund.innerText = '';                 
                if(domEl.areaGidro){
                    domEl.select.value = '20'; 
                    domEl.areaGidro.innerText = '';
                    domEl.areaElement1.innerText = '';                     
                    domEl.totalConsumptionElement.innerText = '';       
                    domEl.quantityElement.innerText = '';  
                    domEl.totalTran.innerText = '';                    
                }
                if(arrayText){
                    for(let i = 0; i< arrayText.length; i++){
                        arrayText[i].innerText = '';
                    }   
                } 
              
            }
            else {
                domEl.totalTran.innerText = ''; 
            
            }    
        })   
    } 
}
import getDomElem from './date.js'
export default Cleaningdata