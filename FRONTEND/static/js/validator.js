document.addEventListener("DOMContentLoaded", function() {
    let incomeInput = document.getElementById("incomeAmount");
    let spentInput = document.getElementById("spentAmount");
    let addIncomeButton = document.getElementById("submitIncome");
    let addSpendingButton = document.getElementById("submitSpending");

    function disableIncomeOnClick() {
        addIncomeButton.addEventListener("click", function() {
            addIncomeButton.disabled = true;
        });
    }

    function disableSpendingOnClick() {
        addSpendingButton.addEventListener("click", function() {
            addSpendingButton.disabled = true;
        });
    }

    function validateIncomeField() {
        incomeInput.addEventListener("input", function() {
            if (incomeInput.value.length === 0
                || incomeInput.value === "") addIncomeButton.disabled = true;
            else addIncomeButton.disabled = false;
        });
    }

    function validateSpendingField() {
        spentInput.addEventListener("input", function() {
            if (spentInput.value.length === 0
                || spentInput.value === "") addSpendingButton.disabled = true;
            else addSpendingButton.disabled = false;
        });
    }

    validateIncomeField();
    validateSpendingField();
    disableIncomeOnClick();
    disableSpendingOnClick();
});