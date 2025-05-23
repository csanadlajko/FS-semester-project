document.addEventListener("DOMContentLoaded", function() {
    hideTablesWhenLoaded();
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
            .then(resp => {
                if(resp.status === 200) {
                    let curr = document.getElementById("currencyType").value;
                    alert(`Bevétel sikeresen hozzáadva!\nAdatok: ${incomeType} - ${incomeAmount} ${curr}`);
                }
                else alert("Sikertelen bevétel hozzáadás!");
            })
            .catch(err => console.error(err))
            await getTotalSavings()
            clearIncome();
            await createIncomeStatTable();
            await createOverallStatTable();
        });
    }

    function addCurrencyType() {
        document.getElementById("addCurrencyType").addEventListener("click", async function() {
            let currencyType = document.getElementById("currencyType").value;

            const newCurrencyType = {
                currencyType: currencyType
            }

            await fetch("http://localhost:5284/MoneyStats/addCurrency", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(newCurrencyType)
            })
            .then(resp => {
                if (resp.status === 200) alert("Valuta sikeresen elmentve!");
                else alert("A valuta mentése hibára futott");
            })
            .then(getCurrency)
            .catch(err => console.error(err));
        });
    }

    async function getCurrency() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getCurrency");
        let currency = await resp.json()
        document.getElementById("currencyType").value = currency.currencyType;
        currency = currency.currencyType;
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
            .then(resp => {
                if (resp.status === 200) {
                    let curr = document.getElementById("currencyType").value;
                    alert(`Költekezés sikeresen hozzáadva!\nAdatok: ${spendingType} - ${spendingAmount} ${curr}`);
                }
                else alert("Sikertelen költekezés hozzáadás");
            })
            .catch(err => console.error(err))
            await getTotalSavings();
            clearSpending();
            await createSpendingStatTable();
            await createOverallStatTable();
        })
        
    }

    function updateLabelNames() {
        document.getElementById("incomeAmount").addEventListener("click", function() {
            document.getElementById("incomeLabel").innerText = `Bevétel ${document.getElementById("incomeType").value}-ból/ből:`
        });
        document.getElementById("spentAmount").addEventListener("click", function() {
            document.getElementById("spentLabel").innerText = `Kiadás ${document.getElementById("spentType").value}-ra/re:`
        });
    }
    updateLabelNames();
    addNewIncome();
    addNewSpending();
    addCurrencyType();
    getCurrency();
    getTotalSavings();

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
        if (Number(savingResponse.totalSavings) < 0) alert(`Figyelem, túlköltekezés! Mértéke: ${Math.abs(savingResponse.totalSavings)} ${currencyType}`)
        if (savingResponse.totalSavings === Number(0)) {
            document.getElementById("totalSavings").value = "";
        }
        else {
            document.getElementById("totalSavings").value = savingResponse.totalSavings + ` ${currencyType}`;
            if (savingResponse.totalSavings < 0) {
                document.getElementById("totalSavings").style.color = "red";
                document.getElementById("totalSavings").style.fontWeight = "bold";
            } else {
                document.getElementById("totalSavings").style.color = "black";
                document.getElementById("totalSavings").style.fontWeight = "normal";
            }
        }
    }

    async function getTotalIncome() {
        const response = await fetch("http://localhost:5284/MoneyStats/getAllIncome");
        const incomeResponse = await response.json();
        let totalIncome = 0;
        incomeResponse.forEach(item => totalIncome += Number(item.incomeAmount));
        return totalIncome;
    }

    async function getAllIncome() {
        const response = await fetch("http://localhost:5284/MoneyStats/getAllIncome");
        const incomeResponse = await response.json();
        return incomeResponse;
    }

    async function getTotalSpending() {
        const response = await fetch("http://localhost:5284/MoneyStats/getAllSpending");
        const spendingResponse = await response.json();
        let totalSpending = 0;
        spendingResponse.forEach(item => totalSpending += Number(item.spendingAmount));
        return totalSpending;
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
        const currencyType = document.getElementById("currencyType").value;

        incomeList.forEach(item => {
            let row = document.createElement("tr");

            let categoryCell = document.createElement("td");
            categoryCell.textContent = item.incomeType;

            let incomeCell = document.createElement("td");
            incomeCell.textContent = item.incomeAmount + ` ${currencyType}`;

            let incomeBarCell = document.createElement("td");

            let incomeBarContainer = document.createElement("div");
            incomeBarContainer.classList.add("progress");

            let incomeBar = document.createElement("div");
            incomeBar.classList.add("progress-bar", "bg-success");
            incomeBar.style.width = (item.incomeAmount / totalIncome) * 100 + "%";
            incomeBar.textContent = ((item.incomeAmount / totalIncome) * 100).toFixed(1) + "%";

            let percentage = document.createElement("td");
            percentage.textContent = ((item.incomeAmount / totalIncome) * 100).toFixed(1) + "%"

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
        const currencyType = document.getElementById("currencyType").value;

        allSpending.forEach(item => {
            let row = document.createElement("tr");

            let categoryCell = document.createElement("td");
            categoryCell.textContent = item.spendingType;

            let spendingCell = document.createElement("td");
            spendingCell.textContent = item.spendingAmount + ` ${currencyType}`;

            let spendingBarCell = document.createElement("td");
            let spendingBarContainer = document.createElement("div");
            spendingBarContainer.classList.add("progress");

            let spendingBar = document.createElement("div");
            spendingBar.classList.add("progress-bar", "bg-danger");
            spendingBar.textContent = ((item.spendingAmount / totalSpending) * 100).toFixed(1) + "%"
            spendingBar.style.width = (item.spendingAmount / totalSpending) * 100 + "%";

            let percentageCell = document.createElement("td");
            percentageCell.textContent = ((item.spendingAmount / totalSpending) * 100).toFixed(1) + "%";

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
        const currencyType = document.getElementById("currencyType").value;

        const popularIncome = await getPopularIncome();
        const popularSpending = await getPopularSpending();

        let row = document.createElement("tr");

        let totalIncomeCell = document.createElement("td");
        totalIncomeCell.textContent = totalIncome + ` ${currencyType}`;

        let totalSpendingCell = document.createElement("td");
        totalSpendingCell.textContent = totalSpending + ` ${currencyType}`;

        let incomeRatioCell = document.createElement("td");
        let incomeRatioContainer = document.createElement("div");

        let incomeRatioBar = document.createElement("div");
        incomeRatioCell.textContent = `${popularIncome.incomeType} ` + ((popularIncome.incomeAmount / totalIncome) * 100).toFixed(1) + "%";

        let spendingRatioCell = document.createElement("td");
        let spendingRatioContainer = document.createElement("div");

        let spendingRatioBar = document.createElement("div");
        spendingRatioBar.classList.add("progress-bar");
        spendingRatioCell.textContent = `${popularSpending.spendingType} ` + ((popularSpending.spendingAmount / totalSpending) * 100).toFixed(1) + "%";

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

    function showStats(switchId, tableDivId) {
        document.getElementById(switchId).addEventListener("click", async function() {
            const isChecked  = document.getElementById(switchId).checked;
            hideTables(tableDivId, isChecked);
        });
    }

    createIncomeStatTable();
    createSpendingStatTable();
    createOverallStatTable();
    showStats("showStats", "overallStatTable");
    showStats("showIncomeStats", "incomeStatTable");
    showStats("showSpendingStats", "spendingStatTable");

    function hideTables(tableDivId, isChecked) {
        document.getElementById(tableDivId).style.display = isChecked ? "block" : "none";
    }

    async function getPopularIncome() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getFilteredIncome");
        const allIncome = await resp.json();
        let maxIdx = 0;
        for (let i = 1; i < allIncome.length; i++) {
            if (allIncome[i].incomeAmount > allIncome[maxIdx].incomeAmount) {
                maxIdx = i;
            }
        }
        if (!allIncome[maxIdx]) return 
        return allIncome[maxIdx];
    }

    async function getPopularSpending() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getFilteredSpending");
        const allSpending = await resp.json();
        let maxIdx = 0;
        for (let i = 1; i < allSpending.length; i++) {
            if (allSpending[i].spendingAmount > allSpending[maxIdx].spendingAmount) maxIdx = i;
        }
        return allSpending[maxIdx];
    }

    function hideTablesWhenLoaded() {
        document.getElementById("incomeStatTable").style.display = "none";
        document.getElementById("overallStatTable").style.display = "none";
        document.getElementById("spendingStatTable").style.display = "none";
        document.getElementById("showStats").checked = false;
        document.getElementById("showSpendingStats").checked = false;
        document.getElementById("showIncomeStats").checked = false;
    }
})