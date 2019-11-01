import transformRatesToJSON from './transformRatesToJSON.js'

async function exampleUsage() {
  const rates = await transformRatesToJSON()
  const multiply = 50
  document.querySelector('p').innerHTML = `Today 1 EUR is: <strong>${rates.USD.toFixed(
    2
  )}</strong> USD and <strong>${rates.GBP.toFixed(2)}</strong> GBP.<br>Today ${multiply} EUR is: <strong>${(
    rates.USD * multiply
  ).toFixed(2)}</strong> USD and <strong>${(rates.GBP * multiply).toFixed(2)}</strong> GBP.`
}
exampleUsage()
