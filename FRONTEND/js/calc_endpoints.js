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

    document.getElementById("showAvgSpendingStats").addEventListener("click", async function () {
        await displayAverageSpending();
        document.getElementById("closeAvgSpending").addEventListener("click", function() {
            document.getElementById("spending-average-container").style.display = "none";
        });
    })

    async function displayAverageSpending() {
        document.getElementById("spending-average-container").style.display = "flex";
        const avgSpendingBody = document.getElementById("spending-avg-form");
        avgSpendingBody.innerHTML = "";

        const filteredSpending = await getAvgSpending();
        filteredSpending.forEach(item => {
            const innerSpendingFormDiv = document.createElement("div");
            innerSpendingFormDiv.classList.add("mb-3");

            const typeLabel = document.createElement("label");
            typeLabel.classList.add("col-form-label");
            typeLabel.htmlFor = `${item.spendingType}-amountField`;
            typeLabel.innerText = item.spendingType;

            const amountField = document.createElement("input");
            amountField.classList.add("form-control")
            amountField.type = "text";
            amountField.value = item.spendingAmount;
            amountField.disabled = true;
            amountField.id = `${item.spendingType}-amountField`;

            innerSpendingFormDiv.appendChild(typeLabel);
            innerSpendingFormDiv.appendChild(amountField);

            avgSpendingBody.appendChild(innerSpendingFormDiv);
        });

        createCloseButton("spending-avg-form", "closeAvgSpending");
    }

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
            amountField.disabled = true;
            amountField.id = `${item.incomeType}-amountField`;

            innerIncomeFormDiv.appendChild(typeLabel);
            innerIncomeFormDiv.appendChild(amountField);

            avgIncomeBody.appendChild(innerIncomeFormDiv);
        })

        createCloseButton("income-avg-form", "closeAvgIncome")

    }

    function createCloseButton(parent_id, button_id) {
        const parent = document.getElementById(parent_id)
        const closeButtonDiv = document.createElement("div");
        closeButtonDiv.classList.add("d-grid")

        const closeButton = document.createElement("input");
        closeButton.type = "button";
        closeButton.id = button_id;
        closeButton.classList.add("btn", "btn-danger");
        closeButton.value = "Bezárás";
        closeButtonDiv.appendChild(closeButton);
        parent.appendChild(closeButtonDiv);
    }

});