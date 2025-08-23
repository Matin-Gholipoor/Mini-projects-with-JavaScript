let incomeCents;
let expenseCents;

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

loadPage();

document.querySelector('.js-add-transaction-button').addEventListener('click', (event) => {
  if (
    document.querySelector('.js-description-input').value !== '' &&
    document.querySelector('.js-amount-input').value !== ''
  ) {
    event.preventDefault();
    addNewTransaction();
    loadPage();
    saveTransactions();
  }
});
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keypress', (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      if (
        document.querySelector('.js-description-input').value !== '' &&
        document.querySelector('.js-amount-input').value !== ''
      ) {
        event.preventDefault();
        addNewTransaction();
        loadPage();
        saveTransactions();
      }
    }
  });
});

function loadPage() {
  document.querySelector('.js-transactions-section').innerHTML = '';

  incomeCents = transactions.reduce((balanceCents, transaction) => {
    if (transaction.amountCents >= 0)
      balanceCents += transaction.amountCents;
    return balanceCents;
  }, 0);
  expenseCents = transactions.reduce((balanceCents, transaction) => {
    if (transaction.amountCents < 0)
      balanceCents += transaction.amountCents;
    return balanceCents;
  }, 0);

  document.querySelector('.js-balance-value').textContent = `
      ${incomeCents + expenseCents < 0 ? '-' : ''}$${centsToDollars(Math.abs(incomeCents + expenseCents))}
    `;
  document.querySelector('.js-income-value').textContent = `
      ${incomeCents < 0 ? '-' : ''}$${centsToDollars(Math.abs(incomeCents))}
    `;
  document.querySelector('.js-expense-value').textContent = `
      ${expenseCents < 0 ? '-' : ''}$${centsToDollars(Math.abs(expenseCents))}
    `;

  transactions.forEach((transaction) => {
    const history = `
      <div class="history-card ${transaction.amountCents >= 0 ? "positive-history" : "negative-history"}">
        <p class="history-name">
          ${transaction.description}
        </p>
        <p>
          ${transaction.amountCents < 0 ? '-' : ''}$${centsToDollars(Math.abs(transaction.amountCents))}
        </p>
        <button class="delete-button js-delete-button">X</button>
      </div>
    `;

    document.querySelector('.js-transactions-section').innerHTML += history;
  });

  document.querySelectorAll('.js-delete-button').forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log(index);
      console.log(transactions);
      transactions.splice(index, 1);
      console.log(transactions);
      loadPage();
      saveTransactions();
    });
  });
}

function centsToDollars(cents) {
  return (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addNewTransaction() {
  const description = document.querySelector('.js-description-input').value;
  const amountCents = Number(document.querySelector('.js-amount-input').value);

  transactions.push(
    {
      description,
      amountCents
    }
  );

  document.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });
}