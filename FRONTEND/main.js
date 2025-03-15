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
            await createSpendingStatTable();
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
        const incomeTableBody = document.getElementById("incomeStats");
        incomeTableBody.innerHTML = "";
        const totalIncome = await getTotalIncome();
        const incomeList = await getAllIncome();

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
            incomeBar.textContent = ((item.incomeAmount / totalIncome) * 100).toFixed(4);

            let percentage = document.createElement("td");
            percentage.textContent = ((item.incomeAmount / totalIncome) * 100).toFixed(4) + "%"

            incomeBarContainer.appendChild(incomeBar);
            incomeBarCell.appendChild(incomeBarContainer);

            row.appendChild(categoryCell);
            row.appendChild(incomeCell);
            row.appendChild(incomeBarCell);
            row.appendChild(percentage)

            incomeTableBody.appendChild(row);
        });
    }

    async function createSpendingStatTable() {
        const spendingTableBody = document.getElementById("spendingStats");
        spendingTableBody.innerHTML = "";
        const totalSpending = await getTotalSpending();
        const allSpending = await getAllSpending();

        allSpending.forEach(item => {
            let row = document.createElement("tr");

            let categoryCell = document.createElement("td");
            categoryCell.textContent = item.spendingType;

            let spendingCell = document.createElement("td");
            spendingCell.textContent = item.spendingAmount.toLocaleString();

            let spendingBarCell = document.createElement("td");
            let spendingBarContainer = document.createElement("div");
            spendingBarContainer.classList.add("progress");

            let spendingBar = document.createElement("div");
            spendingBar.classList.add("progress-bar", "bg-danger");
            spendingBar.style.width = (item.spendingAmount / totalSpending) * 100 + "%";

            let percentageCell = document.createElement("td");
            percentageCell.textContent = ((item.spendingAmount / totalSpending) * 100).toFixed(4) + "%";

            spendingBarContainer.appendChild(spendingBar);
            spendingBarCell.appendChild(spendingBarContainer);
            row.appendChild(categoryCell);
            row.appendChild(spendingCell);
            row.appendChild(spendingBarCell);
            row.appendChild(percentageCell);

            spendingTableBody.appendChild(row);
        });
    }
    
    async function createOverallStatTable() {
        const overallStatsTableBody = document.getElementById("overallStats");
        overallStatsTableBody.innerHTML = "";
        const totalIncome = await getTotalIncome();
        const totalSpending = await getTotalSpending();
        const totalSavings = await getTotalSavings();
        const balance = totalIncome + totalSpending;

        let row = document.createElement("tr");

        let totalIncomeCell = document.createElement("td");
        totalIncomeCell.textContent = totalIncome.toLocaleString();

        let totalSpendingCell = document.createElement("td");
        totalSpendingCell.textContent = totalSpending.toLocaleString();

        let incomeRatioCell = document.createElement("td");
        let incomeRatioContainer = document.createElement("div");
        incomeRatioContainer.classList.add("progress");

        let incomeRatioBar = document.createElement("div");
        incomeRatioBar.classList.add("progress-bar");
        incomeRatioBar.style.width = (totalIncome / balance) * 100 + "%";
        incomeRatioBar.textContent = ((totalIncome / balance) * 100).toFixed(4) + "%";

        let spendingRatioCell = document.createElement("td");
        let spendingRatioContainer = document.createElement("div");
        spendingRatioContainer.classList.add("progress");

        let spendingRatioBar = document.createElement("div");
        spendingRatioBar.classList.add("progress-bar");
        spendingRatioBar.style.width = (totalSpending / balance) * 100 + "%";
        spendingRatioBar.textContent = ((totalSpending / balance) * 100).toFixed(4) + "%";

        let savings = document.createElement("td");
        savings.textContent = document.getElementById("totalSavings").value;

        incomeRatioContainer.appendChild(incomeRatioBar);
        incomeRatioCell.appendChild(incomeRatioContainer);
        spendingRatioContainer.appendChild(spendingRatioBar);
        spendingRatioCell.appendChild(spendingRatioContainer);
        row.appendChild(totalIncomeCell);
        row.appendChild(totalSpendingCell);
        row.appendChild(incomeRatioCell);
        row.appendChild(spendingRatioCell);
        row.appendChild(savings);

        overallStatsTableBody.appendChild(row);
    }

    function generateOverallStats() {
        document.getElementById("generateStats").addEventListener("click", async function() {
            await createOverallStatTable();
        })
    }

    createIncomeStatTable();
    createSpendingStatTable()
    generateOverallStats();

})
