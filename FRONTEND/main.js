document.getElementById("transaction-form").addEventListener("submit", async function() {
    const incomeAmount = document.getElementById("incomeAmount").value;
    const spentAmount = document.getElementById("spentAmount").value;
    const incomeType = document.getElementById("incomeType").value;
    const spentType = document.getElementById("spentType").value;


    const transaction = {
        incomeAmount: Number(incomeAmount),
        spentAmount: Number(spentAmount),
        incomeType: incomeType,
        spentType:spentType
    }


    fetch("http://localhost:5284/MoneyStats/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
    })
    .then(resp => resp.json())
    .catch(err => console.log(err))
});