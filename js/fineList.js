"use strict";
window.fineList = {
    searchFines : searchFines
}


let DB = data.finesData;
console.log(DB)

function searchFines(searchKey){
    var filteredArr = [];
     DB.forEach(function(item) {
        if (searchKey === item.номер | searchKey === item.тип) {
            filteredArr.push(item);
          
        }
      });
    return filteredArr;

   /* return [
        {номер: '001', тип: 'Перевищення швидкості', сума: 100, дата: '2023-01-15'}
    ];*/
}

