<script>

const form = document.querySelector('.frm-inp');
const inputs =  form.querySelectorAll('input');
const totalPriceBtn =  form.querySelector('.button');
const materialType =  form.querySelectorAll('input[name="material-type"]');
const typeFundamenta =  form.querySelectorAll('input[name="type_fund[]"]');
const fundamentType = form.querySelectorAll('.fundament_type input');
const areaElement = form.querySelector('#area');
const totalPriceElement = form.querySelector('#price');



// console.log(fundamentType);
// расчет цены
function calculate(){           
    let arrInputs = [];  
    let arrInputsImg = [];      
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].value !== undefined || inputs[i].value !== null) && inputs[i].value === "" ){
            inputs[i].value = inputs[i].getAttribute("placeholder");                 
          }
        // пропускать значение NaN  
        if(!isNaN(inputs[i].value)){
        arrInputs.push(+inputs[i].value);   
        } else{
            arrInputsImg.push(inputs[i].value);   
        }        
     }; 
     console.log(arrInputs);
    let A = arrInputs[0];
    let B = arrInputs[1];
    let C = arrInputs[2];
    let D = arrInputs[3];
    let E = arrInputs[4];
       function calc(){
        let pVneshBP = (A + B) * 2 *  C;
        let pVnutBP = (A-D*2 + B-D*2) * 2 * C;    
        let pBottom = (A-D*2 + B) * 2 * D;
        let per1 = ((A-D*2)*C)*2+(A-D*2)*D ;
        let per2 = E*C*2+E*D;
        let decrease =  D*C*2;
        let price = 10;
        // расчет плитного фундамента по умолчанию
        let area = (A + B) * C * 2 + A*B;  
        let totalPrice = area * price ; 
        
        // расчет ленточного фундамента 
        for(const radio of materialType){ 
           if (radio.checked && radio.value === "3"){
                for(const radio of typeFundamenta){ 
                    if(radio.checked) {
                                             
                        switch (radio.value) {
                            case arrInputsImg[0]:  
                                area = pVneshBP+pVnutBP+pBottom;
                                totalPrice = area * price ; 
                                console.log (area, totalPrice);
                                break;
                            case arrInputsImg[1]:
                                area = pVneshBP+pVnutBP+pBottom +per1-decrease;
                                totalPrice = area * price ; 
                                console.log (area, totalPrice);
                                break;
                            case arrInputsImg[2]:
                                decrease =  D*C*4;
                                area = pVneshBP+pVnutBP+pBottom +per1+per2-decrease;
                                totalPrice = area * price ; 
                                console.log (area, totalPrice);
                                break;
                            case arrInputsImg[3]:
                                decrease =  D*C*6;
                                per2 = (E*C*2+E*D)*2;
                                area = pVneshBP+pVnutBP+pBottom +per1+per2-decrease;
                                totalPrice = area * price ; 
                                console.log (area, totalPrice);
                            break;
                        }          
                                 
                    } 
            }  
              //  по свайному фундаменту в разработке
              } else if (radio.checked && radio.value === "4") {
                  area = 0 ;  
                  totalPrice = 0; 
                } 
        }  
        // передача расчета в текст
     
        const formatterInt = new Intl.NumberFormat('ru-RU');   
        areaElement.innerText =  formatterInt.format(area) + ' м2';  
        const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });     
        totalPriceElement.innerText =  formatter.format(totalPrice);   

    }   
    // валидация данных        
   if(A === 0 && B === 0){
        alert("А и B не могут быть одновременно 0");          
        areaElement.innerText =  '';          
        totalPriceElement.innerText =  '';   
        return;
    }  else {
        calc();
    }
    if (D<A || D<B){
        calc();
    } else {   
        alert("D не корректно");
        areaElement.innerText =  '';          
        totalPriceElement.innerText =  '';   
        return;
    }
}

// calculate();
// можно сделать расчет при изменении инпутов
for(const input of inputs) {      
    input.addEventListener('input', () =>{         
        calculate();
   })   
}
// или при нажатии кнопки 
 totalPriceBtn.addEventListener('click', function (e) {calculate()});  

</script>