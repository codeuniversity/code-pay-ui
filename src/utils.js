function moneyFormat(n){
    return Number(n).toFixed(2) + '€';
}
const colors = ['#9b41fe', '#735a2d','#03fd1b', '#E64A19', '#795548'];
function getColorByIndex(index){
    return colors[index%colors.length];
}
export default {
    moneyFormat,
    getColorByIndex,
}
