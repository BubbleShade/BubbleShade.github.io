
const OPERATION = Object.freeze({
    PLUS:   '+',
    MULTIPLY:  '*'
});

const error = {
    toString: () => { return "error" },
    isError: true}
class ScientificNumber {
    constructor(number) {
        if(!number) return
        let length = number.toString().split(".")[0].length
        this.e = length-1
        this.number = +number / this.powTen
        this.sigFigs = get_sig_figs(number)
    }
    get normalNumber() { return this.number * this.powTen }
    get calculate() { return this }
    get powTen() { return Math.pow(10, this.e) }
    add(otherNum) {
        let newNum = new ScientificNumber
        newNum.number = this.number + (otherNum.number * Math.pow(10, otherNum.e - this.e))
        let length = newNum.number.toString().split(".")[0].length
        newNum.e = this.e + (length-1)
        newNum.number /= Math.pow(10, length-1)
        return newNum
    }
    multiply(otherNum) {
        let newNum = new ScientificNumber
        newNum.number = this.number * otherNum.number
        newNum.e = this.e + otherNum.e
        return newNum
    }
    operate(otherNum, operator){ 
        //console.log(newNum.number)
        if(operator == OPERATION.PLUS) return this.add(otherNum) 
        if(operator == OPERATION.MULTIPLY) return this.multiply(otherNum) 
        return error
    }
    toString() {
        return `${this.number * this.powTen}`
    }
    isError = false
}
class Operation {
    constructor(string, operationType) {
        this.operation1 = createOperation(string[0])
        this.operation2 = createOperation(string[1])
        this.operationType = operationType
    }
    get sigFigs() {
        console.log("SigFig:", this.operation1.sigFigs, this.operation2.sigFigs)
        return Math.min(this.operation1.sigFigs, this.operation2.sigFigs)
    }
    get calculate() {
        if(this.operation1.calculate.isError || this.operation2.calculate.isError) return error
        return this.operation1.calculate.operate(this.operation2.calculate, this.operationType)
    }
    get roundedSigFigs() {
        let calc = this.calculate
        let answer = roundTo(calc.number, this.sigFigs-1) * calc.powTen
        return answer
    }
    isError = false
}
function createOperation(equation){
    if(equation.includes("+")) return new Operation(equation.split(/\+(.*)/s), OPERATION.PLUS)
    if(equation.includes("*")) return new Operation(equation.split(/\*(.*)/s), OPERATION.MULTIPLY)
    if(+equation != NaN) return new ScientificNumber(equation)
    return error
}

function calculate(equation){
    equation = equation.replace(/\s/g, '');
    var parseEquation = createOperation(equation)
    return parseEquation
}
window.addEventListener("DOMContentLoaded", () => {
    let textbox = document.getElementById("equation")
    textbox.addEventListener("onchange", onTextBoxChange)
    onTextBoxChange()
    console.log("loaded")
})
document.addEventListener("input", onTextBoxChange)
function onTextBoxChange() {
    let textbox = document.getElementById("equation")
    let text = document.getElementById("answer")
    let parseEquation = calculate(textbox.value)
    let answer = `${parseEquation.roundedSigFigs} (${parseEquation.sigFigs} significant figures)`
    text.textContent = answer
}
console.log(roundTo(1.1111, 1))