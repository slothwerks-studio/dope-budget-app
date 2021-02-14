// Get references to the Monthly Budget section
let monthlyBudget = document.getElementById("monthly_budget");
let incomeInput = document.getElementById("income_input");
let updateBudgetButton = document.getElementById("update_budget");

// Get referencs to the Add Expense section
let nameInput = document.getElementById("name_input");
let amountInput = document.getElementById("amount_input");
let addExpenseButton = document.getElementById("add_expense");

// Other referencws
let expenseList = document.getElementById("expense_list"); // This is a DIV
let totalExpenses = document.getElementById("total_expenses"); // Paragraph element
let remainingBalance = document.getElementById("remaining_balance"); // Paragraph element

// Create some starting values
let monthlyIncome = 0;
let expenses = []; // Wil be an array of objects
let expenseTotal = 0;
let balance = 0;
let expenseKeyValue = 0;

// Add events to buttons
updateBudgetButton.onclick = updateBudget;
addExpenseButton.onclick = addExpense;

// Build a function that stores the input for the monthly budget
function updateBudget(event) {
    event.preventDefault();
    monthlyIncome = incomeInput.value;
    monthlyBudget.innerText = "$" + monthlyIncome;
    updateBalance();
}

// Build a function which updates the remaining balance
// This will compare the monthly budget with the total of the expenses
function updateBalance() {
    balance = monthlyIncome - expenseTotal;
    remainingBalance.innerText = "$" + balance;
    if (balance < 0) {
        remainingBalance.classList.remove('green');
        remainingBalance.classList.add('red');
    } else {
        remainingBalance.classList.remove('red');
        remainingBalance.classList.add('green');
    }
}

// Build a function that will add an expense, then update the
// expense total based on the total values of all expenses
function addExpense(event) {
    event.preventDefault();
    if (!nameInput.value.trim() || !amountInput.value.trim()) {
        window.alert("Please enter a description and amount for your expense.");
    } else {
        // Increase the expenseKeyValue
        expenseKeyValue = expenseKeyValue + 1;
        // Create a new expense
        let expense = {
            key: expenseKeyValue,
            name: nameInput.value,
            amount: amountInput.value
        };
        // Add the expense to the document
        let newExpense = document.createElement("p");
        newExpense.innerHTML = `
            <span>${expense.name} $${expense.amount}</span>
            &nbsp;
            <button 
                class="remove_expense" 
                id="${expense.key}"
                onclick="removeExpense(${expense.key})"
            >
                Remove
            </button>
        `;
        newExpense.id = `key_${expense.key}`;
        expenseList.appendChild(newExpense);
        // Add the expense amount to our expenses array
        expense.amount = parseInt(expense.amount); // Turn the amount into a number
        expenses.push(expense);
        // Clear the form
        nameInput.value = "";
        amountInput.value = "";
        // Update the expense total
        updateExpenseTotal();
    }

}

// Write a function that removes an expense from the expense list
// Then updates the total expenses appropriately
function removeExpense(keyValue) {
    console.log("Here is the keyValue of this item:", keyValue);
    // Remove the expense from the expense list
    let expenseToRemove = document.getElementById(`key_${keyValue}`);
    expenseList.removeChild(expenseToRemove);
    // Remove this expense from the expenses array
    let indexToRemove = expenses.findIndex((expense) => {
        return (expense.key === keyValue);
    });
    console.log("Here is the index of the item we're removing: ", indexToRemove);
    expenses.splice(indexToRemove, 1);
    // Update the expense total
    updateExpenseTotal();
}

// Build a function that re-calculates the expense total
// then displays the result in the app
function updateExpenseTotal() {
    // Reset the expense total
    expenseTotal = 0;
    // Loop through the expenses and add them up
    for (let i = 0; i < expenses.length; i++) {
        expenseTotal = expenseTotal + expenses[i].amount;
    }
    totalExpenses.innerText = "$" + expenseTotal;
    updateBalance();
}
