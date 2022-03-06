export function tCurrency(t, amount) {
  return t('format:currency', {
    amount: amount.amount,
    formatParams: { amount: { currency: amount.unit } },
  });
}

export function tDate(t, date) {
  return t('format:datetime', {
    val: date,
  });
}
