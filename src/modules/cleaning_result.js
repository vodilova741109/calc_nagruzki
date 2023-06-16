   
function Cleaningresult (){ 
    let inputs = document.querySelectorAll('.content input');   
    let selects = document.querySelectorAll('.content select');    
        for(const input of inputs) {      
        input.addEventListener('input', () =>{    
            cleaning();
        })   
        for(const select of selects) {   
            select.addEventListener('change', () => {
                cleaning();    
            })

        } 
        function cleaning(){
            const paramCalcText = document.querySelector('.param_calc');
            const resultCalcText = document.querySelector('.result_calc');        
            // удаляем дочерние элементы
            paramCalcText.replaceChildren();    
            resultCalcText.replaceChildren();
            
        }
  
    } 
}

export default Cleaningresult