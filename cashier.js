
const values = {
    PENNY :0.01, 
    NICKEL :0.05, 
    DIME :0.1, 
    QUARTER :0.25, 
    ONE :1, 
    FIVE :5,
    TEN :10,
    TWENTY :20,
    'ONE HUNDRED' :100
}


function giveMeSomeChange (bill, amountpaid, arr) {
    let returnAmount = amountpaid - bill;
    let money = Object.fromEntries(arr);
    let sortedValues = Object.entries(values).sort((a,b)=> b[1] - a[1])
    let sortedValuesObj = Object.fromEntries(sortedValues);

    let sortedMoney = {};
    for(let j in sortedValuesObj) {
        if(money[j]) {
            sortedMoney[j] = money[j];
        }
    }
    console.log(sortedMoney);
    let total;
    let returnCount = {};
    for(let i in sortedMoney) {
        total += sortedMoney[i];
    }
    if(total < returnAmount) {
        return JSON.stringify({status: "INSUFFICIENT_FUNDS", change: []})
    }
    else {
        let t = 0;
        for(let n in sortedMoney) {
            let notetotal = 0;
            for(let i=1; (values[n]*i)<=returnAmount && (values[n]*i) <= sortedMoney[n] ; i++) {
                t = i*values[n];
                notetotal = t;
                returnCount[n] = t;
            }
            returnAmount = returnAmount -notetotal;
            returnAmount = parseFloat(returnAmount).toFixed(2)
            // console.log(`returnAmount total-${returnAmount}`);
        }
        
        if(returnAmount != 0) {
            return console.log({status: "closed", change: "combination not possible"})

        }
        else {
            const retarr = Object.entries(returnCount);
            return console.log({status: "OPEN", change: retarr})
        }
    }
}


// giveMeSomeChange(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

giveMeSomeChange(3.26, 100, [["PENNY", 1.01],  ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

giveMeSomeChange(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

// giveMeSomeChange(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

// giveMeSomeChange(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])