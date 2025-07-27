document.addEventListener('DOMContentLoaded', function() {

    async function getAvgIncome() {
        const resp = await fetch("http://localhost:5284/MoneyStats/getAverageFromPython")
        const respJson = await resp.json()
        return respJson
    }

    document.getElementById('showStats').addEventListener('click', async function() {
        const avgIncome = await getAvgIncome();
        console.log("Average income data successfully received from python calculation.")
        console.log(avgIncome);
    });
});