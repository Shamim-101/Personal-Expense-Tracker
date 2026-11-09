const title = document.getElementById('title');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');

const expenseList = document.getElementById('expenseList');
const total = document.getElementById('total');

const themeBtn = document.getElementById('themeBtn');
const entryCount = document.getElementById('entryCount');

const budget = document.getElementById('budget');
const remainingBudget = document.getElementById('remainingBudget');
const budgetStatus = document.getElementById('budgetStatus');

let totalExpense = 0;

// Dark Mode
themeBtn.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = "☀ Light Mode";
    } else {
        themeBtn.textContent = "⏾ Dark Mode";
    }

});

// Budget Check
function checkBudget() {

    const budgetAmount = Number(budget.value);

    if (budgetAmount <= 0) {
        remainingBudget.textContent = "0";
        return;
    }

    const remaining = budgetAmount - totalExpense;

    remainingBudget.textContent = remaining;

   if (remaining < 0) {

    budgetStatus.textContent =
        "⚠ Budget Exceeded!";

    budgetStatus.style.color =
        "red";

}
else if (remaining === 0) {

    budgetStatus.textContent =
        "⚠ Not Enough Money";

    budgetStatus.style.color =
        "yellow";

}
else {

    budgetStatus.textContent =
        "🔥 Budget Available";

    budgetStatus.style.color =
        "green";
}
}

// Budget Change
budget.addEventListener('input', checkBudget);

// Add Expense
addBtn.addEventListener('click', () => {

    const name = title.value;
    const money = Number(amount.value);

    if (name === "" || money <= 0) {

        alert("Enter valid expense");
        return;
    }

    const li = document.createElement('li');

    const text = document.createElement('span');
    text.textContent = `${name} - ৳${money}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener('click', () => {

        totalExpense -= money;

        total.textContent = totalExpense;

        li.remove();

        entryCount.textContent =
            expenseList.children.length;

        checkBudget();

    });

    li.appendChild(text);
    li.appendChild(deleteBtn);

    expenseList.appendChild(li);

    totalExpense += money;

    total.textContent = totalExpense;

    entryCount.textContent =
        expenseList.children.length;

    title.value = "";
    amount.value = "";

    checkBudget();

});