const income = document.getElementById('incomeInput');
const currency = document.getElementById('currency');
const expense = document.getElementById('expense');
const amount = document.getElementById('amount');
const expenseType = document.getElementById('expenseType');
const addButton = document.getElementById('addButton');
const budgetValue = document.getElementById('remainingBudget');
const totalExpense = document.getElementById('totalExpense');
const totalSavings = document.getElementById('totalSavings');


    //variables for list items and values //
const listItemText = document.getElementById('listItem');
const listItemAmount = document.getElementById('amountItem');
const listItemTypeText = document.getElementById('listType');

let selectedCurrencyText, selectedCurrencyValue, insertedCurrencySign;

let enteredIncomeNum;
let enteredAmountNum;

let budgetValueNum = 0;
// let savingsValueNum = 0;


let currentBudget = NaN;
let defaultCurrency;

let listExpenses = 0;
let currentExpenseType;

let incomeNumberResult;
let listItemAMountResult;

function defaultState() {
   const defaultCurrencyText = document.getElementById('currency');
   selectedCurrencyText = defaultCurrencyText.options[0].text;
}
defaultState();

    // SETTING AN ENABLED/DISABLED FLAG FOR FUNCTIONS //



addButton.addEventListener('click', addListItem);
addButton.addEventListener('click', remainingBudget);
  


income.addEventListener('input', validateInput);
income.addEventListener('input', updateAmountState)
amount.addEventListener('input', validateInput);
currency.addEventListener('input', selectCurrency);

let enabled = false;

function checkIfEnabled() {
    if (income.value !== '' && amount.value !== '' && expense.value !== '') {
        enabled = true;
    }
}

    // Function to validate the input fields //

function validateInput() {
    //allows only numbers
    income.value = income.value.replace(/[^0-9]/g, ''); 
    amount.value = amount.value.replace(/[^0-9]/g, ''); 

    //blocks the first character to be 0 
    //--(if copied there is a bug that removes the number previously typed in)--
    if (income.value[0] === '0' || amount.value[0] === '0') {
        console.log('remove', typeof(income.value));
        income.value = income.value.substring(1); 
        amount.value = amount.value.substring(1);
    }
   
    //sets the income and amount values to numbers
    const enteredIncome = income.value;
    const enteredAmount = amount.value;
    enteredAmountNum = Number(enteredAmount);
    enteredIncomeNum = Number(enteredIncome);
    updateAmountState();
}


//shows the budget amount and updates it whenever there is new input for INCOME
function updateAmountState() {
   
   budgetValue.classList.remove('hide');

   budgetValueNum = enteredIncomeNum - listExpenses;

   totalSavings.innerText = `${budgetValueNum}${selectedCurrencyText}`;
   budgetValue.innerText = `${budgetValueNum}${selectedCurrencyText}`;
   changeSpan()
}


        // CURRENCY AND ITEM TYPE SELECTION //

function selectCurrency() {

    //assigns the value of the selected option
    const currentCurrency = currency.options[currency.selectedIndex];

    selectedCurrencyText = currentCurrency.text;
    selectedCurrencyValue = currentCurrency.value;
    // updateCurrency(selectedCurrencyText, selectedCurrencyValue);
    // setCurrencyText()
    changeSpan()
}


    // SELECTING AND CHANGING THE SPAN TEXT OF CURRENCY //

function changeSpan() {
    const spanElementsTotal = document.querySelectorAll('span.currency-sign');
        Array.from(spanElementsTotal).forEach(function(spanElement) {
            if (selectedCurrencyValue === 'dollar') {
                spanElement.innerHTML = '$';
                console.log('yay a dollar');
            } else if (selectedCurrencyValue === 'euro') {
                spanElement.innerHTML = '€';
                console.log('yay a euro');
            } else if (selectedCurrencyValue === 'dinar') {
                spanElement.innerHTML = 'DINAR';
                console.log('yay a dinar');
            }
        })
}




            // REMAINING BUDGET CALCULATION WHEN ADD ITEM BUTTON IS CLICKED //

function remainingBudget() {

        checkIfEnabled();

        if (enabled === true) {
            totalSavings.classList.remove('hide');
            listExpenses += enteredAmountNum;
            
            totalExpense.innerText = `${listExpenses}${selectedCurrencyText}`;
            budgetValue.innerText = `${enteredIncomeNum - listExpenses}${selectedCurrencyText}`;
            totalSavings.innerText = `${enteredIncomeNum - listExpenses}${selectedCurrencyText}`;
        };
}


        // CREATES A LIST ITEM WITH THE INSERTED VALUES AND DESCRIPTION //
function addListItem() {
 
    checkIfEnabled();

    if (enabled === true) {

        
            const listItem = document.createElement('li');
            listItem.innerHTML = expense.value;
            console.log(listItem.innerHTML);

            const currentItemAmount = document.createElement('li');
            insertedCurrencySign = document.createElement('span');
            insertedCurrencySign.innerHTML = selectedCurrencyText;
            currentItemAmount.innerHTML = amount.value;
            console.log(currentItemAmount.innerHTML);

            const listItemType = document.createElement('li');
            listItemType.innerHTML = expenseType.value;
            console.log(listItemType.innerHTML);


            if (listItemType.innerHTML == 'groceries') {
                    
                    listItem.classList.add('groceries');
                    currentItemAmount.classList.add('groceries');
                    insertedCurrencySign.classList.add('currency-sign');
                    listItemType.classList.add('groceries');

            } else if (listItemType.innerHTML === 'bills'){

                    listItem.classList.add('bills');
                    currentItemAmount.classList.add('bills');
                    insertedCurrencySign.classList.add('currency-sign');
                    listItemType.classList.add('bills');

            } else if (listItemType.innerHTML === 'luxury'){

                    listItem.classList.add('luxury');
                    currentItemAmount.classList.add('luxury');
                    insertedCurrencySign.classList.add('currency-sign');
                    listItemType.classList.add('luxury');

            }   else if (listItemType.innerHTML === 'health'){

                    listItem.classList.add('health');
                    currentItemAmount.classList.add('health');
                    insertedCurrencySign.classList.add('currency-sign');
                    listItemType.classList.add('health');

            } else {
                return;
            };
            listItemText.appendChild(listItem);
            listItemAmount.appendChild(currentItemAmount);
            currentItemAmount.appendChild(insertedCurrencySign);
            listItemTypeText.appendChild(listItemType);
    };
}