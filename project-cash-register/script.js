/*

  Sebenernya ini ada fitur yang kurang sih,
  tapi di freeCodeCampnya ga diminta fitur itu.

  Kurang fitur nambahin uang yang di input ke dalem uang yg di laci
  (harus sesuai pecahan uangnya).

  Tapi emang di dunia nyata ga bisa diotomatisin kayak kembalian sih.
  Soalnya di dunia nyata kalo orang ngasih $10 belum tentu 1 lembar 10$ kan.
  Jadi ga bisa otomatis nambahin value si 'TEN' (variable cid).
  Kecuali inputnya diubah jadi banyak sesuai masing2 pecahan uangnya.

  Jadinya aplikasi ini cuma ngebantu nyari pecahan yang tepat buat kembaliannya.

*/

const inputPayment = document.getElementById("cash");
const btnPurchase = document.getElementById("purchase-btn");
const outputChange = document.getElementById("change-due");
const cashScreenDisplay = document.getElementById("cash-screen-display");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// Total uang di laci
const calculateTotalCID = () => {
  return cid.reduce(
    (sum, item) => parseFloat((sum + item[1]).toFixed(2)), 0
  );
};

// Array yg formatnya kayak variable cid dijadiin string
const convertArrToString = (arr) => {
  return arr.map(money => `${money[0]}: $${money[1]}`).join("<br>");
}

// Nampilin kembalian (di atas input)
const displayChange = (changeArr) => {
  const totalCid = calculateTotalCID();
  const moneyText = convertArrToString(changeArr);
  let status = "";

  if (totalCid === 0) {
    status = "CLOSED";
  } else {
    status = "OPEN";
  }

  outputChange.innerHTML = `
    <p>
      Status: ${status}<br>
      ${moneyText}
    </p>
  `;
}

// Nampilin uang di laci
const displayCid = (cidArr) => {
  const moneyText = convertArrToString(cidArr);

  cashDrawerDisplay.innerHTML = `
    <p>
      <b>Change in drawer:</b><br>
      ${moneyText}
    </p>
  `;
}

// Ngitung kembalian & sedikit update tampilan
const calculateChange = (payment) => {
  const paymentFloat = parseFloat(payment);

  const totalCid = calculateTotalCID();
  const changeDue = parseFloat((paymentFloat - price).toFixed(2));

  // console.log("paymentFloat", paymentFloat);
  // console.log("price", price);
  // console.log("totalCid", totalCid);
  // console.log("changeDue", changeDue);

  // Validasi awal
  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (changeDue === 0) {
    outputChange.innerHTML = "No change due - customer paid with exact cash";
    return;
  } else if (changeDue > totalCid) {
    outputChange.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Mulai ngitung kembalian
  const denominations = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.10],
    ['NICKEL', 0.05],
    ['PENNY', 0.01]
  ];

  const tempCid = cid.map(item => [...item]);
  const change = [];
  let remainingChange = changeDue;

  // Perulangan array denominations
  for (const [name, value] of denominations) {
    const cidItem = tempCid.find(item => item[0] === name);

    if (cidItem[1] === 0) {
      continue;
    }

    // Perulangan ngecek kembalian, mirip project Roman Converter
    while (remainingChange >= value && cidItem[1] > 0) {
      const changeItem = change.find(item => item[0] === name);

      if (changeItem) {
        changeItem[1] = parseFloat((changeItem[1] + value).toFixed(2));
      } else {
        change.push([name, value]);
      }

      cidItem[1] = parseFloat((cidItem[1] - value).toFixed(2));
      remainingChange = parseFloat((remainingChange - value).toFixed(2));
    }
  }

  /*
    Total cash in drawer masih banyak tapi ga ada pecahan uang yg bisa dijadiin kembalian.
    Misal punya uang $10 tp butuh kembaliannya $1 doang & si $1 itu ga ada (ga ada receh).
    bingung anjir, change bisa diartiin "kembalian", bisa juga "recehan"
  */
  if (remainingChange > 0) {
    outputChange.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Kalo remainingChange udh sampe 0
  cid = tempCid;

  displayChange(change);
  displayCid(cid);

  // console.log("cid", cid);
  // console.log("tempCid", tempCid);
  // console.log("change", change);
  // console.log("remainingChange", remainingChange);
}


window.onload = function() {
  outputChange.innerHTML = "";
  cashScreenDisplay.textContent = `Total: ${price}`;
  displayCid(cid);
};

btnPurchase.addEventListener("click", function (e) {
  e.preventDefault();
  calculateChange(inputPayment.value);
  inputPayment.value = "";
});
