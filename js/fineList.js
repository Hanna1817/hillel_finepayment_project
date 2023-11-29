"use strict";
window.fineList = {
    searchFines : searchFines
}


let DB = data.finesData;
console.log(DB)

function searchFines(searchKey){
    var filteredArr = [];
  if (!isNaN(searchKey)) {
    let number = parseInt(searchKey, 10);
    let formatNumber = number.toString().padStart(3, "0");
    
    DB.forEach(function (item) {
      if (formatNumber === item.номер) {
        filteredArr.push(item);
      }
    });
  } else {
    DB.forEach(function (item) {
      if (searchKey === item.тип) {
        filteredArr.push(item);
      }
    });
  }

  return filteredArr;

   /* return [
        {номер: '001', тип: 'Перевищення швидкості', сума: 100, дата: '2023-01-15'}
    ];*/
}

