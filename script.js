let baseUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let selectCode = document.querySelectorAll(".select select");
let btn = document.querySelector(".message button");
let fromCurr = document.querySelector(".from")
let toCurr = document.querySelector(".to")

for (s of selectCode) {
  for (c in countryList) {
    let opt = document.createElement("option");
    opt.value = c;
    opt.innerText = c;
    if (s.name === "country-from" && c === "USD") {
      opt.selected = "selected";
    } else if (s.name === "country-to" && c === "INR") {
      opt.selected = "selected";
    }
    s.append(opt);
  }
  s.addEventListener("change", (e) => {
    changeFlag(e.target);
  });
}

function changeFlag(event) {
  let currencyCode = event.value;
  let countryCode = countryList[currencyCode];
  let parent = event.parentElement;
  let flagImage = parent.querySelector("img");
  flagImage.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}
btn.addEventListener("click", async (e) => {

  e.preventDefault();
  let url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
  console.log(url);
  let response = await fetch(url);
  let data = await response.json()
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
  let inp = document.querySelector("form .enter-amount input")
  let inpValue = inp.value
  let exchange = inpValue*rate
  console.log(exchange)

  let msg = document.querySelector(".message p")
  msg.innerText=`${inpValue} ${fromCurr.value} = ${exchange} ${toCurr.value}`
});
