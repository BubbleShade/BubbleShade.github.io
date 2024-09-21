function get_sig_figs(number) {
    let numString = number.toString()
    let sigFigs = numString.length
    for(let i = 0; i < numString.length; i++) {
        if(numString[i] != '0' && numString[i] != '-') { 
            sigFigs -= i; break}
    }
    if(numString.includes('.')) return sigFigs - 1
    for(let i = numString.length-1; i >= 0; i--) {
        if(numString[i] != '0') { sigFigs -= (numString.length-1)-i; break}
    }
    return sigFigs
}
function roundTo(number, decimals) {
    let pow = Math.pow(10, decimals)
    number *= pow
    number = Math.round(number)
    number /= pow
    return number
}