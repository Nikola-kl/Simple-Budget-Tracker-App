const income = document.getElementById('incomeInput');
const currency = document.getElementById('currency');
const expense = document.getElementById('expense');
const amount = document.getElementById('amount');
const expenseType = document.getElementById('expenseType');
const addButton = document.getElementById('addButton');
const budgetValue = document.getElementById('remainingBudget');
const totalExpense = document.getElementById('totalExpense');




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


function defaultState() {
   const defaultCurrencyText = document.getElementById('currency');
   selectedCurrencyText = defaultCurrencyText.options[0].text;
   document.querySelector('div.remaining-budget-amounts h4.currency-sign').textContent = selectedCurrencyText;
   document.querySelector('div.total-expense-amounts h4.currency-sign').textContent = selectedCurrencyText;
}
defaultState();

    



addButton.addEventListener('click', addButtonEvents);
function addButtonEvents() {
    addListItem();
    remainingBudget();
}
  
income.addEventListener('input', validateInputIncome);
income.addEventListener('input', updateAmountState)
amount.addEventListener('input', validateInputAmount);
currency.addEventListener('input', selectCurrency);

// SETTING AN ENABLED/DISABLED FLAG FOR FUNCTIONS //
let enabled = false;

function checkIfEnabled() {
    if (income.value !== '' && amount.value !== '' && expense.value !== '') {
        enabled = true;
    } else {
        enabled = false;
    }
}

    // Function to validate the input fields //

function validateInputIncome() {
    //allows only numbers
    income.value = income.value.replace(/[^0-9]/g, ''); 

    //blocks the first character to be 0 
    //--(if copied there is a bug that removes the number previously typed in)--
    //     BUG SOLVED BY DIVIDING INTO SEPARATE FUNCTIONS //

    if (income.value[0] === '0') {
       
        income.value = income.value.substring(1); 
       
    }
   
    //sets the income values to numbers
    const enteredIncome = income.value;
    enteredIncomeNum = Number(enteredIncome);
    updateAmountState(enteredIncomeNum);
}


function validateInputAmount() {
    //allows only numbers
    
    amount.value = amount.value.replace(/[^0-9]/g, ''); 

    //blocks the first character to be 0 
    //--(if copied there is a bug that removes the number previously typed in)--
    if (amount.value[0] === '0') {
        amount.value = amount.value.substring(1);
    }  
    //sets the amount values to numbers
    const enteredAmount = amount.value;
    enteredAmountNum = Number(enteredAmount);
}


//shows the budget amount and updates it whenever there is new input for INCOME
function updateAmountState() {
   
   budgetValue.classList.remove('hide');

   budgetValueNum = enteredIncomeNum - listExpenses;
   const existingSpanElement = document.querySelectorAll('h3 > span.currency-sign');
    existingSpanElement.forEach(selectCurrency);
      

   budgetValue.textContent = `${budgetValueNum}`;
}


        // CURRENCY AND ITEM TYPE SELECTION //

function selectCurrency() {
    
    //assigns the value of the selected currency option
    const currentCurrency = currency.options[currency.selectedIndex];

    selectedCurrencyText = currentCurrency.text;
    selectedCurrencyValue = currentCurrency.value;

    updateCurrencySigns(selectedCurrencyValue, selectedCurrencyText);
}


function updateCurrencySigns(value, text) {
    const spanElementsTotal = document.querySelectorAll('h4.currency-sign, span.currency-sign');
    Array.from(spanElementsTotal).forEach(function(spanElement) {
        if (value === 'dollar') {
            spanElement.innerHTML = text;
            // console.log('yay a dollar');
        } else if (value === 'euro') {
            spanElement.innerHTML = text;
            // console.log('yay a euro');
        } else if (value === 'dinar') {
            spanElement.innerHTML = text;
            // console.log('yay a dinar');
        }
    })
    
}

            // REMAINING BUDGET CALCULATION WHEN ADD ITEM BUTTON IS CLICKED //

function remainingBudget() {

        checkIfEnabled();

        if (enabled === true) {
            listExpenses += enteredAmountNum;
            
            totalExpense.innerText = `${listExpenses}`;
            budgetValue.innerText = `${enteredIncomeNum - listExpenses}`;
          
        }
    }
        // CREATES A LIST ITEM WITH THE INSERTED VALUES AND DESCRIPTION //
function addListItem() {
 
    checkIfEnabled();

    if (enabled === true) {

            document.querySelector('div.remaining-budget-amounts').classList.remove('hide');
            document.querySelector('div.total-expense-amounts').classList.remove('hide');

            const listItem = document.createElement('li');
            listItem.innerHTML = expense.value;
            // console.log(listItem.innerHTML);

            const currentItemAmount = document.createElement('li');
            insertedCurrencySign = document.createElement('span');
            insertedCurrencySign.innerHTML = selectedCurrencyText;
            currentItemAmount.innerHTML = amount.value;
            // console.log(currentItemAmount.innerHTML);

            const listItemType = document.createElement('li');
            listItemType.innerHTML = expenseType.value;
            // console.log(listItemType.innerHTML);



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

            }   else if (listItemType.innerHTML === 'other'){

                listItem.classList.add('other');
                currentItemAmount.classList.add('other');
                insertedCurrencySign.classList.add('currency-sign');
                listItemType.classList.add('other');

            }   else {
                    return;
            };
            listItemText.appendChild(listItem);
            listItemAmount.appendChild(currentItemAmount);
            currentItemAmount.appendChild(insertedCurrencySign);
            listItemTypeText.appendChild(listItemType);
    };
}