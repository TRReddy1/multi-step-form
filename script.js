var outerCard = document.getElementsByClassName("card");
//console.log(outerCard[0]);

// hide goback
document.getElementsByClassName("back-btn")[0].style.visibility = "hidden";
// card 1 dom
var card1 = document.getElementsByClassName("card-body");

card1[0].addEventListener("keyup", inputs);

function inputs(e) {
  //   var nameEntered;
  //   var emailEntered;
  //   var numberEntered;

  if (e.target.id === "name") {
    console.log(`name : ${e.target.value}`);
    // nameEntered = true;
  }

  if (e.target.id === "email") {
    console.log(`email : ${e.target.value}`);
  }

  if (e.target.id === "number") {
    console.log(`number : ${e.target.value}`);
  }
}

var clickCount = 0;
// next button
var nextBtn = document.getElementsByClassName("next-btn");
nextBtn[0].addEventListener("click", nextPage);

function nextPage() {
  if (clickCount === 0) {
    // console.log(clickCount);
    card1[0].style.display = "none";
    createCard2();
    clickCount++;
  } else if (clickCount === 1) {
    //console.log(clickCount);
    document.getElementById("card2").style.display = "none";
    thirdPage();
    clickCount++;
  } else if (clickCount === 2) {
    document.getElementById("card3").style.display = "none";
    fourthPage();
    clickCount++;
  }
}

function createCard2() {
  // show back-btn
  document.getElementsByClassName("back-btn")[0].style.visibility = "visible";

  var card2 = document.createElement("div");
  card2.className = "card-body";
  card2.id = "card2";

  var cardTitle = document.createElement("h5");
  cardTitle.className = "class-title";
  cardTitle.innerText = "Select your plan";

  var cardPara = document.createElement("p");
  cardPara.innerText = "You have the option of monthly or yearly billing.";

  card2.appendChild(cardTitle);
  card2.appendChild(cardPara);

  var plans = document.createElement("div");
  plans.classList = "plans";

  createPlan(
    "./assets/images/icon-arcade.svg",
    "Arcade",
    "$9/mo",
    "$90/yr",
    "2 months free",
    plans
  );
  createPlan(
    "./assets/images/icon-advanced.svg",
    "Advanced",
    "$12/mo",
    "$120/yr",
    "2 months free",
    plans
  );
  createPlan(
    "./assets/images/icon-pro.svg",
    "Pro",
    "$15/mo",
    "$150/yr",
    "2 months free",
    plans
  );

  card2.appendChild(plans);

  var switchtext = document.createElement("div");
  switchtext.className = "d-flex toggler";

  var monthly = document.createTextNode("monthly");
  monthly.className = "monthly";

  var toggleSwitch = document.createElement("div");
  toggleSwitch.classList = "form-check form-switch";
  var toggle = document.createElement("input");
  toggle.className = "form-check-input";
  toggle.type = "checkbox";
  toggle.id = "toggleSwitch";
  toggleSwitch.appendChild(toggle);

  var yearly = document.createTextNode("yearly");
  yearly.className = "yearly";

  switchtext.append(monthly, toggleSwitch, yearly);

  card2.appendChild(switchtext);

  outerCard[0].appendChild(card2);

  //toggle switch event
  document.getElementById("toggleSwitch").addEventListener("change", switched);
  // console.log(toggler);
  // console.log(document.getElementsByClassName("plans"));
  document
    .getElementsByClassName("plans")[0]
    .addEventListener("click", selectPlan);
}

//creating object to store value to caluculate
var calObj = {};

function createPlan(imgSrc, name, price, yearPrice, offer, ele) {
  //plans
  var arcade = document.createElement("div");
  arcade.classList = "arcade d-flex";
  arcade.style.display = "flex";

  var arcadeImg = document.createElement("img");
  arcadeImg.src = imgSrc;
  arcadeImg.className = "plan-imgs";

  var planFlex = document.createElement("div");
  planFlex.classList = "d-flex plans";
  planFlex.style.display = "flex";
  planFlex.style.flexDirection = "column";

  var planName = document.createElement("h6");
  planName.className = "plan-title";
  planName.innerText = name;

  var planCost = document.createElement("p");
  planCost.className = "plan-price";
  planCost.innerText = price;

  var yearP = document.createElement("p");
  yearP.className = "yearly";
  yearP.style.display = "none";
  yearP.innerText = yearPrice;

  var offerText = document.createElement("p");
  offerText.className = "yearly";
  offerText.innerText = offer;
  offerText.style.display = "none";

  planFlex.append(planName, planCost, yearP, offerText);
  arcade.append(arcadeImg, planFlex);

  // console.log(ele);
  ele.appendChild(arcade);
}

//back-btn
document
  .getElementsByClassName("back-btn")[0]
  .addEventListener("click", prevPage);

function prevPage() {
  clickCount--;
  if (clickCount === 0) {
    document.getElementById("card2").style.display = "none";
    card1[0].style.display = "block";
  }
}

//toggle listener

var switchState = "monthly";

function switched(e) {
  // console.log(e.target.checked);
  if (e.target.checked) {
    //  console.log("yearly");
    var monthly = document.getElementsByClassName("plan-price");
    Array.from(monthly).forEach((month) => {
      month.style.display = "none";
    });

    var yearly = document.getElementsByClassName("yearly");
    Array.from(yearly).forEach((year) => {
      year.style.display = "block";
    });

    switchState = e.target.checked ? "yearly" : "monthly";
    // yearly add on
    // var yearlyAddOn = document.getElementsByClassName("yearlyService");
    // console.log(yearlyAddOn);
    // Array.from(yearlyAddOn).forEach((yearAddOn) => {
    //   if (e.target.checked) {
    //     yearAddOn.style.display = "block";
    //   } else {
    //     yearAddOn.style.display = "none";
    //   }
    // });
    // console.log(monthly);
  } else {
    // console.log("monthly");
    var yearly = document.getElementsByClassName("yearly");
    Array.from(yearly).forEach((year) => {
      year.style.display = "none";
    });

    var monthly = document.getElementsByClassName("plan-price");
    Array.from(monthly).forEach((month) => {
      month.style.display = "block";
    });
  }
}

function selectPlan(e) {
  var allPlans = document.getElementsByClassName(e.target.className);

  for (let i = 0; i < allPlans.length; i++) {
    allPlans[i].style.borderColor = "blue";
  }

  if (switchState === "monthly") {
    var target = e.target;
    target.style.borderColor = "red";
    var name = target.getElementsByClassName("plan-title")[0].innerText;
    var price = target.getElementsByClassName("plan-price");
    var cost = price[0].innerText;
    calObj["name"] = name;
    calObj["switchState"] = switchState;
    calObj["cost"] = cost;
    console.log(calObj);
  } else {
    var target = e.target;
    target.style.borderColor = "red";
    var name = target.getElementsByClassName("plan-title")[0].innerText;
    var price = target.getElementsByClassName("yearly");
    var cost = price[0].innerText;
    calObj["name"] = name;
    calObj["switchState"] = switchState;
    calObj["cost"] = cost;
    // console.log(calObj);
  }
}

function thirdPage() {
  var card3 = document.createElement("div");
  card3.className = "card-body";
  card3.id = "card3";

  var cardTitle = document.createElement("h5");
  cardTitle.className = "class-title";
  cardTitle.innerText = " Pick add-ons";

  var cardPara = document.createElement("p");
  cardPara.innerText = "Add-ons help enhance your gaming experience.";

  card3.appendChild(cardTitle);
  card3.appendChild(cardPara);

  var servicesMain = document.createElement("div");
  servicesMain.classList = "servicesMain";

  var serviceNames = [
    "Online service",
    "Larger storage",
    "Customizable Profile",
  ];

  var serviceDescriptions = [
    "Access to multiplayer games",
    "Extra 1TB of cloud save",
    "Custom theme on your profile",
  ];

  var monthlyPrices = ["+$1/mo", "+$2/mo", "+$2/mo"];

  var yearlyPrices = ["+$10/yr", "+$20/yr", "+$20/yr"];

  for (let i = 0; i < serviceNames.length; i++) {
    if (switchState === "monthly") {
      createSerivices(
        serviceNames[i],
        serviceDescriptions[i],
        monthlyPrices[i],
        servicesMain
      );
    } else {
      createSerivices(
        serviceNames[i],
        serviceDescriptions[i],
        yearlyPrices[i],
        servicesMain
      );
    }
  }

  card3.appendChild(servicesMain);
  outerCard[0].appendChild(card3);

  // for service events
  document
    .getElementsByClassName("servicesMain")[0]
    .addEventListener("change", servicePlan);
}

function createSerivices(a, b, c, element) {
  var services = document.createElement("div");
  services.classList = "services d-flex";
  services.style.display = "flex";

  var checker = document.createElement("div");
  checker.className = "form-check check-box";

  var checkerBox = document.createElement("input");
  checkerBox.type = "checkbox";
  checkerBox.id = "flexCheckDefault";

  checker.appendChild(checkerBox);
  services.appendChild(checker);

  var serviceFlex = document.createElement("div");
  serviceFlex.classList = "d-flex serviceFlex";
  serviceFlex.style.flexDirection = "column";

  var serviceName = document.createElement("h6");
  serviceName.className = "serviceTexts";
  serviceName.innerText = a;

  var servicePara = document.createElement("p");
  servicePara.className = "serviceTexts paras";
  servicePara.innerText = b;

  serviceFlex.append(serviceName, servicePara);

  var servicePrice = document.createElement("p");
  servicePrice.className = "service-price";
  servicePrice.innerText = c;

  services.append(serviceFlex, servicePrice);

  element.appendChild(services);
}

function servicePlan(e) {
  var parent = e.target.parentNode.parentNode;
  if (e.target.checked) {
    parent.style.borderColor = "red";
  } else {
    parent.style.borderColor = "blue";
  }
  var serviceName = parent.getElementsByClassName("serviceTexts")[0].innerText;
  var serviceCost = parent.getElementsByClassName("service-price")[0].innerText;
  if (!calObj["services"]) {
    calObj["services"] = {};
  }
  calObj["services"][serviceName] = serviceCost;
  console.log(calObj);
  // console.log(serviceName, serviceCost);
}

function fourthPage() {
  var card4 = document.createElement("div");
  card4.className = "card-body";
  card4.id = "card4";

  var cardTitle = document.createElement("h5");
  cardTitle.className = "class-title";
  cardTitle.innerText = "Finishing up";

  var cardPara = document.createElement("p");
  cardPara.innerText = "Double-check everything looks OK before confirming.";

  card4.appendChild(cardTitle);
  card4.appendChild(cardPara);

  calculation(card4);

  outerCard[0].appendChild(card4);
}

function calculation(ele) {
  var calculations = document.createElement("div");
  calculations.classList = "calculations d-flex";
  calculations.style.display = "flex";
  calculations.style.flexDirection = "column";

  var topFlex = document.createElement("div");
  topFlex.classList = "d-flex topFlex";

  var planFlex = document.createElement("div");
  planFlex.classList = "d-flex planFlex";

  var plancalculation = document.createElement("div");
  plancalculation.classList = "plancalculation";
  plancalculation.innerText = calObj.name + "(" + calObj.switchState + ")";

  var changePara = document.createElement("div");
  changePara.innerText = "change";

  var totalPlan = document.createElement("div");
  totalPlan.innerText = calObj.cost;

  planFlex.appendChild(plancalculation);
  planFlex.appendChild(changePara);

  topFlex.appendChild(planFlex);
  topFlex.appendChild(totalPlan);

  calculations.appendChild(topFlex);

  var Addcalculation = document.createElement("div");
  Addcalculation.classList = "Addcalculation d-flex";

  Object.entries(calObj.services).forEach((services) => {
    // console.log(services);
    var block = document.createElement("div");
    block.className = "block";

    var name = document.createElement("div");
    name.className = "nameService";
    name.innerText = services[0];

    var cost = document.createElement("div");
    cost.innerText = services[1];

    block.appendChild(name);
    block.appendChild(cost);

    Addcalculation.appendChild(block);
  });

  calculations.appendChild(Addcalculation);

  var totaled = document.createElement("div");
  totaled.className = "totaled";

  var totalDiv = document.createElement("div");
  totalDiv.innerText = "Total";

  var totalCost = document.createElement("div");
  totalCost.innerText = "$25";
  totaled.appendChild(totalDiv);
  totaled.appendChild(totalCost);

  ele.append(calculations, totaled);
}