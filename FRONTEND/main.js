document.addEventListener("DOMContentLoaded", function() {
    function addNewStats() {
        document.getElementById("submitTransaction").addEventListener("click", async function() {
            let incomeAmount = document.getElementById("incomeAmount").value;
            let spentAmount = document.getElementById("spentAmount").value;
            let incomeType = document.getElementById("incomeType").value;
            let spentType = document.getElementById("spentType").value;
            let currentSavings = document.getElementById("currentSavings");
            currentSavings.value = Number(incomeAmount) - Number(spentAmount);

            checkNegative()
    
            const transaction = {
                incomeAmount: Number(incomeAmount),
                spentAmount: Number(spentAmount),
                incomeType: incomeType,
                spentType: spentType
            }
            await fetch("http://localhost:5284/MoneyStats/addStat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaction)
            })
            .then(resp => console.log(resp.json()))
            .catch(err => console.log(err))
            await getTotalSavings()
        });
    }

    addNewStats()

    async function getTotalSavings() {
        const response = await fetch("http://localhost:5284/MoneyStats/getSavings");
        const savingResponse = await response.json();
        document.getElementById("totalSavings").value = savingResponse.totalSavings;
    }

})
