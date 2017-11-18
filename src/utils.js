function moneyFormat(n){
    return Number(n).toFixed(2) + '€';
}
const colors = ['#437dad','#62c562', '#e4a93d'];
function getColorByIndex(index){
    return colors[index%colors.length];
}
export default {
    moneyFormat,
    getColorByIndex,
}
