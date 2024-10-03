function setTime(time){
    const hour=parseInt(time/3600)
    let remaingSecond=time%3600;
    const minutes=parseInt(remaingSecond /60)
    remaingSecond=remaingSecond %60;

    return`${hour} hour ${minutes} minute ${remaingSecond} second ago`


}
console.log(setTime(7865));