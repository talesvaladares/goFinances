export function formatCurrency(amount: number){

  const currencyFormatted = amount.toLocaleString('pt-BR',{
    style: 'currency',
    currency: 'BRL'
  })

  return currencyFormatted;
}