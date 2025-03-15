document.addEventListener("DOMContentLoaded", function() {
    function addNewIncome() {
        document.getElementById("submitIncome").addEventListener("click", async function() {
            let incomeAmount = document.getElementById("incomeAmount").value;
            let incomeType = document.getElementById("incomeType").value;

            const transaction = {
                incomeAmount: Number(incomeAmount),
                incomeType: incomeType,
            }
            await fetch("http://localhost:5284/MoneyStats/addIncome", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaction)
            })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            await getTotalSavings()
            clearIncome();
            await createIncomeStatTable()
        });
    }

    function addNewSpending() {
        document.getElementById("submitSpending").addEventListener("click", async function () {
            let spendingAmount = document.getElementById("spentAmount").value;
            let spendingType = document.getElementById("spentType").value;

            const transaction = {
                spendingAmount: Number(spendingAmount),
                spendingType: spendingType
            }

            await fetch("http://localhost:5284/MoneyStats/addSpending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaction)
            })
            .then(resp => console.log(resp.json()))
            .then(err => console.log(err))
            await getTotalSavings()
            clearSpending()
        })
        
    }

    function updateLabelNames() {
        document.getElementById("incomeAmount").addEventListener("click", function() {
            document.getElementById("incomeLabel").innerText = `Income from ${document.getElementById("incomeType").value}:`
        });
        document.getElementById("spentAmount").addEventListener("click", function() {
            document.getElementById("spentLabel").innerText = `Money spent on ${document.getElementById("spentType").value}:`
        });
    }
    updateLabelNames()
    addNewIncome()
    addNewSpending()
    getTotalSavings()

    function clearIncome() {
        document.getElementById("incomeAmount").value = "";
    }

    function clearSpending () {
        document.getElementById("spentAmount").value = "";
    }

    async function getTotalSavings() {
        const response = await fetch("http://localhost:5284/MoneyStats/getSavings");
        const savingResponse = await response.json();
        const currencyType = document.getElementById("currencyType").value;
        if (savingResponse.totalSavings === Number(0)) {
            document.getElementById("totalSavings").value = "";
        }
        else {
            document.getElementById("totalSavings").value = `${savingResponse.totalSavings} ${currencyType}`;
        }
    }

    async function getTotalIncome() {
        const response = await fetch("http://localhost:5284/MoneyStats/getTotalIncome");
        const incomeResponse = await response.json();
        return Number(incomeResponse.totalIncome);
    }

    async function getAllIncome() {
        const response = await fetch("http://localhost:5284/MoneyStats/getAllIncome");
        const incomeResponse = await response.json();
        console.log(incomeResponse)
        return incomeResponse;
    }

    async function getTotalSpending() {
        const response = await fetch("http://localhost:5284/MoneyStats/getTotalSpending");
        const spendingResponse = await response.json();
        return Number(spendingResponse.totalSpending);
    }

    async function getAllSpending() {
        const response = await fetch("http://localhost:5284/MoneyStats/getAllSpending");
        const spendingResponse = await response.json();
        return spendingResponse;
    }

    async function createIncomeStatTable() {
        const tableBody = document.getElementById("incomeStats");
        tableBody.innerHTML = "";
        const totalIncome = await getTotalIncome();
        const incomeList = await getAllIncome();
        console.log("this is the income list below")
        console.log(incomeList);

        incomeList.forEach(item => {
            let row = document.createElement("tr");

            let categoryCell = document.createElement("td");
            categoryCell.textContent = item.incomeType;

            let incomeCell = document.createElement("td");
            incomeCell.textContent = item.incomeAmount.toLocaleString();

            let incomeBarCell = document.createElement("td");

            let incomeBarContainer = document.createElement("div");
            incomeBarContainer.classList.add("progress");

            let incomeBar = document.createElement("div");
            incomeBar.classList.add("progress-bar", "bg-success");
            incomeBar.style.width = (item.incomeAmount / totalIncome) * 100 + "%";
            incomeBar.textContent = item.income > 0 ? item.income.toLocaleString() + " Ft" : "";

            incomeBarContainer.appendChild(incomeBar);
            incomeBarCell.appendChild(incomeBarContainer);

            row.appendChild(categoryCell);
            row.appendChild(incomeCell);
            row.appendChild(incomeBarCell);

            tableBody.appendChild(row);
        });
    }

})
