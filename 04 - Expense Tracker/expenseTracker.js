let incomeCents;
let expenseCents;

loadPage();

function loadPage() {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [
    {
      description: 'car fix',
      amountCents: -10000
    },
    {
      description: 'winning in lottery',
      amountCents: 500000
    },
    {
      description: 'charity',
      amountCents: -5000
    }
  ];

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
        <button class="delete-button">X</button>
      </div>
    `;

    document.querySelector('.js-transactions-section').innerHTML += history;
  });
}

function centsToDollars(cents) {
  return (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}