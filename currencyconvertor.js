let baseurl= "https://api.frankfurter.app/latest";
let dropdowns = document.querySelectorAll(".dropdown select");
let cimage = document.querySelectorAll("img");
let exchangebtn = document.querySelector(".exchange-currency");
let amountinput = document.querySelector(".amount input");

let fromcurrency = document.querySelector(".from select")
let tocurrency = document.querySelector(".to select")
let msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (let currcode in countryList){
        let newoption = document.createElement("option");
        newoption.value = currcode;
        newoption.innerText = currcode;
        select.append(newoption);
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = true;
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected = true;
        }
    }

    select.addEventListener("change" , (event)=>{
updateFlag(event.target);
    }
)
}

const updateFlag =(element)=>{
    let currencycode = element.value;
    let countrycode = countryList[currencycode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let cimage = element.parentElement.querySelector("img");
    cimage.src = newSrc;
}


exchangebtn.addEventListener("click", async ()=>{
let amount = amountinput.value;
if(amount == "" || amount < 1 ){
amountinput.value = 1;
}

 
let url =`${baseurl}?from=${fromcurrency.value}&to=${tocurrency.value}`;
let data = await fetch(url);
data = await data.json();
let rate = data.rates;
console.log(rate);
rate = rate[tocurrency.value];
let amountinputvalue = amountinput.value;
let finalamount = amountinputvalue * rate;
msg.innerText =  `${amountinputvalue} ${fromcurrency.value} =  ${finalamount} ${tocurrency.value}`
console.log(rate);
console.log(finalamount);
})