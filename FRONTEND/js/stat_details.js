document.addEventListener("DOMContentLoaded", function() {
    async function getFilteredIncomeTypes() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getFilteredIncome")
        const respJson = await resp.json()
        return respJson
    }

    async function getFilteredSpending() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getFilteredSpending")
        const respJson = await resp.json()
        return respJson
    }

    async function createFilteredIncomeTable() {
        const filterIncomeBody = document.getElementById("incomeDetTable");
        filterIncomeBody.innerHTML = "";

        const incomeResponse = await getFilteredIncomeTypes();

        let totalIncome = 0;
        incomeResponse.forEach(item => {
            totalIncome += item.incomeAmount;
        });

        incomeResponse.forEach(item => {
            const row = document.createElement("tr");

            const typeNameCell = document.createElement("td");
            typeNameCell.innerText = item.incomeType;

            const incomeAmountCell = document.createElement("td");
            incomeAmountCell.innerText = (item.incomeAmount / totalIncome * 100).toLocaleString() + "%";

            row.appendChild(typeNameCell);
            row.appendChild(incomeAmountCell);

            filterIncomeBody.appendChild(row);
        })
    }

    async function createFilteredSpendingTable() {
        const filterSpendingBody = document.getElementById("spendingDetTable");
        filterSpendingBody.innerHTML = "";

        const spendingResp = await getFilteredSpending();
        let totalSpending = 0;

        spendingResp.forEach(item => {
            totalSpending += item.spendingAmount;
        })

        spendingResp.forEach(item => {
            const row = document.createElement("tr");

            const spendingTypeCell = document.createElement("td");
            spendingTypeCell.innerText = item.spendingType;

            const spendingRateCell = document.createElement("td");
            spendingRateCell.innerText = (item.spendingAmount / totalSpending * 100).toLocaleString() + "%";

            row.appendChild(spendingTypeCell);
            row.appendChild(spendingRateCell);

            filterSpendingBody.appendChild(row);
        })
    }
    createFilteredIncomeTable();
    createFilteredSpendingTable();
});
