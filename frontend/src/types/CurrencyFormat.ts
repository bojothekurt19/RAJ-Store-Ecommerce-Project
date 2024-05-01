const currencyPH = new Intl.NumberFormat(undefined, {
  currency: 'PHP',
  style: 'currency',
})

export function CurrencyFormat(number: number) {
  return currencyPH.format(number)
}
