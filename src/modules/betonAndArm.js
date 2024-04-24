// бетон и арматура
let sumArm = 0;
let sumBeton = 0;
function addDateBeton(arr1) {   
    sumBeton = arr1.reduce((acc, number) => acc + number, 0) / 1000;
    return sumBeton;
}

function addDateArm(Arm) {
    sumArm = Arm / 1000;
    return sumArm;
}
function addSumBetonAndArm() {  
     return sumBeton + sumArm;
}

export { addDateBeton, addDateArm, addSumBetonAndArm };
