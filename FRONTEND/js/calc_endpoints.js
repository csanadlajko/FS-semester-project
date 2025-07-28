document.addEventListener('DOMContentLoaded', function() {

    async function getAvgIncome() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getAverageIncomeFromPython");
        const respJson = await resp.json();
        return respJson;
    }

    async function getAvgSpending() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getAverageSpendingFromPython");
        const respJson = await resp.json();
        return respJson;
    }

    document.getElementById("showAvgIncomeStats").addEventListener("click", async function() {
        await displayAverageIncome();
        document.getElementById("closeAvgIncome").addEventListener("click", function() {
            document.getElementById("income-average-container").style.display = "none";
        });
    });

    async function displayAverageIncome() {
        document.getElementById("income-average-container").style.display = "flex";
        const avgIncomeBody = document.getElementById("income-avg-form");
        avgIncomeBody.innerHTML = "";

        const filteredIncomes = await getAvgIncome();
        filteredIncomes.forEach(item => {
            const innerIncomeFormDiv = document.createElement("div");
            innerIncomeFormDiv.classList.add("mb-3");

            const typeLabel = document.createElement("label");
            typeLabel.classList.add("col-form-label");
            typeLabel.innerText = item.incomeType;
            typeLabel.htmlFor = `${item.incomeType}-amountField`

            const amountField = document.createElement("input");
            amountField.type = "text";
            amountField.classList.add("form-control")
            amountField.value = item.incomeAmount;
            amountField.disabled = true
            amountField.id = `${item.incomeType}-amountField`

            innerIncomeFormDiv.appendChild(typeLabel);
            innerIncomeFormDiv.appendChild(amountField);

            avgIncomeBody.appendChild(innerIncomeFormDiv);
        })

        const closeButton = document.createElement("input");
        closeButton.type = "button";
        closeButton.id = "closeAvgIncome";
        closeButton.classList.add("btn", "btn-danger");
        closeButton.value = "Bezárás";
        avgIncomeBody.appendChild(closeButton);
    }

});