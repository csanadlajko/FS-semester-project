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
        incomeResponse.forEach(item => totalIncome += item.incomeAmount);

        incomeResponse.forEach(item => {
            const row = document.createElement("tr");

            const typeNameCell = document.createElement("td");
            typeNameCell.innerText = item.incomeType;

            const incomeAmountCell = document.createElement("td");
            const incomeFilterContainer = document.createElement("div");
            incomeFilterContainer.classList.add("progress");

            const incomeFilterBar = document.createElement("div");
            incomeFilterBar.classList.add("progress-bar", "bg-success");
            incomeFilterBar.innerText = (item.incomeAmount / totalIncome * 100).toLocaleString() + "%";
            incomeFilterBar.style.width = (item.incomeAmount / totalIncome * 100) + "%";

            incomeFilterContainer.appendChild(incomeFilterBar);
            incomeAmountCell.appendChild(incomeFilterContainer);
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

        spendingResp.forEach(item => totalSpending += item.spendingAmount);

        spendingResp.forEach(item => {
            const row = document.createElement("tr");

            const spendingTypeCell = document.createElement("td");
            spendingTypeCell.innerText = item.spendingType;

            const spendingRateCell = document.createElement("td");
            const spendingFilterContainer = document.createElement("div");
            spendingFilterContainer.classList.add("progress");

            const spendingFilterBar = document.createElement("div");
            spendingFilterBar.classList.add("progress-bar", "bg-danger");
            spendingFilterBar.innerText = (item.spendingAmount / totalSpending * 100).toLocaleString() + "%";
            spendingFilterBar.style.width = (item.spendingAmount / totalSpending * 100) + "%";

            spendingFilterContainer.appendChild(spendingFilterBar);
            spendingRateCell.appendChild(spendingFilterContainer);
            row.appendChild(spendingTypeCell);
            row.appendChild(spendingRateCell);

            filterSpendingBody.appendChild(row);
        })
    }
    createFilteredIncomeTable();
    createFilteredSpendingTable();
});
