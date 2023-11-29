"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener("click", payFine);

let error = [];

function checkValue(regex, value, message, err) {
  if (!regex.test(value)) {
    err.push(message);
  }
}

function payFine() {
  let creditCardNumberData = creditCardNumber.value.replaceAll(" ", "").trim();
  let fineNumberData = fineNumber.value.padStart(3, "0");
  let amountData = parseInt(amount.value);

  error = [];
  checkValue(
    /^\d{1,3}$/gm,
    fineNumberData === "000" ? "a" : fineNumber.value,
    "Не вірний номер штрафу.\nНаприклад: '001'.\n",
    error
  );

  checkValue(
    /^[А-ЯЇІЄҐ]{2}\d{6}$/gm,
    passport.value,
    "Не вірний паспортний номер.\nНаприклад: 'АВ123456'.\n",
    error
  );
  checkValue(
    /^\d{16}$/gm,
    creditCardNumberData,
    "Не вірна кредитна картка.\nНаприклад: '0000 0000 0000 0000'.\n",
    error
  );
  checkValue(
    /^\d{3}$/gm,
    cvv.value,
    "Не вірний cvv.\nНаприклад: '123'.\n",
    error
  );
  checkValue(
    /^\d{1,5}$/gm,
    amount.value,
    "Не вірна сума.\nНаприклад: '123'.\n",
    error
  );

  if (error.length > 0) {
    alert(error.join("\n").trim());
    return;
  }

  let findFineIndex = DB.filter((item) => !!item).findIndex((item) => {
    return item["номер"] === fineNumberData;
  });

  if (findFineIndex > 0) {
    if (DB[findFineIndex]["сума"] !== amountData) {
      alert("Сума не співпадає");
      return;
    }
    DB.splice(findFineIndex, 1);
    clearField();
    alert("Штраф сплачено, дякуємо");
  } else {
    alert("Номер не співпадає");
  }
}
function clearField() {
  fineNumber.value = "";
  passport.value = "";
  creditCardNumber.value = "";
  cvv.value = "";
  amount.value = "";
  buttonSubmit.value = "";
}
