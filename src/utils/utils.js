export function tCurrency(t, amount) {
  return t('format:currency', {
    amount: amount.amount,
    formatParams: { amount: { currency: amount.currency ?? amount.unit } },
  });
}

export function tDate(t, date) {
  return t('format:datetime', {
    val: date,
  });
}

export function tTime(t, date) {
  return t('format:datetime', {
    val: date,
    formatParams: {
      val: {
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  });
}

export function tDateTime(t, date) {
  return t('format:datetime', {
    val: date,
    formatParams: {
      val: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  });
}
