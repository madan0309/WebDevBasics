// Hide the tip amount on load
document.getElementById("result").style.display = "none";
document.getElementById("each").style.display = "none";

// on-click function
document.getElementById("calculate").onclick = function() {
    calculateTip();
}

// on-enter events
Array.from(document.getElementsByClassName("input-fields")).forEach(element => {
    element.addEventListener('keydown', function(e) {
        if(e.keyCode == 13) {
            calculateTip();
        }
    })
});

function calculateTip() {
    let billAmount = document.getElementById("bill-amount").value;
    let serviceQual = document.getElementById("service-qual").value;
    let numOfPeople = document.getElementById("people-count").value;

    if(billAmount == "" || serviceQual == 0) {
        alert("Please enter values");
        return;
    }
    if(numOfPeople == "" || numOfPeople <= 1) {
        numOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "inline";
    }

    billAmount = parseFloat(billAmount);
    numOfPeople = parseInt(numOfPeople);
    serviceQual = parseFloat(serviceQual);

    let totalTip = (billAmount * serviceQual) / numOfPeople;
    // totalTip = Math.round(totalTip*100) / 100;
    totalTip = totalTip.toFixed(2);

    let tipDiv = document.getElementById("tip-amount");
    let resultDiv = document.getElementById("result");
    tipDiv.innerHTML = totalTip;
    resultDiv.style.display = "inline";
}