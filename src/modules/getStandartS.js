
// Расчеты различных поверхностей гидроизоляции

// получение внешней поверхности
function getVnesh(a,b,c){
    let result = (a + b) * 2 * c; // не меняется    
    return result;
}
// получение верхней поверхности и площади для плиточного фундамента
function getStandartS(a,b,c,pVnesh){    
  const S2 = a*b;      
  const S3 = pVnesh + S2; 
  let perimeter = (a+b)*2;
  let V = a*b*c;
  let obj = {pVneshBP: pVnesh, pTop: S2, area: S3, perimeter: perimeter, height: c, V: V};  
  return obj;
}
// получение внутренней поверхности основной класс первый тип
class ResultPov {      
    constructor(a,b,c,d,e,pVnesh) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.d = d;
      this.pVnesh = pVnesh;
      this.param = this.param(); 
      this.pTop =  this.resultTop();
      this.pVnutBP = this.resultVnut();
    }
    param(){
      const result = (this.a-this.d*2);
      return(result);
    }
    resultVnut() {         
      const result = (this.param + this.b-this.d*2) * 2 * this.c; 
      return(result);      
    }
    resultTop() {      
      const result = (this.param + this.b) * 2 * this.d; 
      return(result);      
    }
    resultPer1() {     
      const result = ((this.param)*this.c) * 2; 
      return(result);      
    } 
    resultPer2() {      
      const result = this.e * this.c * 2; 
      return(result);      
    } 
    resultDecrease() {      
      const result = this.d * this.c * 2; 
      return(result);      
    }       
}
// получение внутренней поверхности второй тип
class ResultPovSecond extends ResultPov{ 
  resultTop2() {   
    let pTop = super.resultTop();
    const result = pTop+(this.a-this.d*2)*this.d;
    return(result);      
  }
  resultVnut2() { 
    let per1 = super.resultPer1();
    let decrease = super.resultDecrease();  
    const result = this.pVnutBP + per1-decrease; 
    return(result);
  }
}
// получение внутренней поверхности третий тип
class ResultPovthree extends ResultPovSecond{ 
  resultTop3() {   
    let pTop = super.resultTop2();
    const result = pTop+(this.e*this.d);    
    return(result);
  }
  resultVnut3() { 
    let per1 = super.resultPer1();
    let per2 = super.resultPer2();
    let decrease = super.resultDecrease()*2;  
    const result = this.pVnutBP+per1+per2-decrease;    
    return(result);
  }
}
// получение внутренней поверхности четвертый тип
class ResultPovfour extends ResultPovthree{ 
  resultTop4() {   
    let pTop = super.resultTop2();
    const result = pTop+(this.e*this.d*2);    
    return(result);
  }
  resultVnut4() { 
    let per1 = super.resultPer1();
    let per2 = super.resultPer2()*2;
    let decrease = super.resultDecrease()*3;  
    const result = this.pVnutBP+per1+per2-decrease;    
    return(result);
  }
}

// создание сложного массива с данными поверхностей
function getTypeDate(A,B,C,D,E,pVneshBP){
  //ленточный и свайный тип (заготовка)       
  let resultPovNew = new ResultPov(A,B,C,D,E,pVneshBP);      
  const pVnutBP = resultPovNew.resultVnut();        
  const pTop  = resultPovNew.pTop;
  const per1 = resultPovNew.resultPer1();
  const per2 = resultPovNew.resultPer2(); 
  const decrease =  resultPovNew.resultDecrease(); 
  // первый тип       
  let arr1  ={pVneshBP: pVneshBP,  pVnut: pVnutBP, pTop: pTop};  
  // второй тип    
  let ResultPovSecondNew = new ResultPovSecond(A,B,C,D,E,pVneshBP);     
  const pTop2 = ResultPovSecondNew.resultTop2();
  const pVnutBP2 = ResultPovSecondNew.resultVnut2();
  // let pVnutBP2 =pVnutBP+per1-decrease;         
  let arr2  ={pVneshBP: pVneshBP,  pVnut: pVnutBP2, pTop: pTop2};       
  // третий тип   
  let ResultPovthreeNew = new ResultPovthree(A,B,C,D,E,pVneshBP); 
  const pTop3 = ResultPovthreeNew.resultTop3();                                
  const pVnutBP3 = ResultPovthreeNew.resultVnut3(); 
  let arr3  ={pVneshBP: pVneshBP,  pVnut: pVnutBP3, pTop: pTop3};        
  // четвертый тип    
  let ResultPovfourNew = new ResultPovfour(A,B,C,D,E,pVneshBP); 
  const pTop4 = ResultPovfourNew.resultTop4();                                
  const pVnutBP4 = ResultPovfourNew.resultVnut4();  
  let arr4  ={pVneshBP: pVneshBP,  pVnut: pVnutBP4, pTop: pTop4}; 
  const arraySide = [arr1,arr2,arr3,arr4];
  return arraySide;
}
// массив с данными по сваям
function getAreaSv(a,b,h,r){
  // железобетонные 
  let areaSv = (a+b)*h*2+(a*b);     
  // винтовые
  const svCilindr=2*Math.PI*r*(h+r);  
  let arrSv = [areaSv, +svCilindr.toFixed(2)];
  return arrSv;
}
// стандартная формула площади и передача всех данных 
function getArea(array, i, c, d){      
    let area = array[i].pVneshBP + array[i].pTop + array[i].pVnut;   
    let perimeter = (area-array[i].pTop)/c; 
    let L =  array[i].pTop/d;
    let V = array[i].pTop*c;
    const obS = {area: area, pVneshBP: array[i].pVneshBP, pTop: array[i].pTop, pVnut: array[i].pVnut, perimeter: perimeter, height: c, L: L, V: V};   
    return  obS;
}

export { getStandartS, getVnesh, getTypeDate, ResultPov, ResultPovSecond, ResultPovthree, ResultPovfour, getAreaSv, getArea};