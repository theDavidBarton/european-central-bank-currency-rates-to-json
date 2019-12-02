'use strict'

import transformRatesToJSON from './transformRatesToJSON.js'

async function exampleUsage() {
  const rates = await transformRatesToJSON()
  const submit = document.querySelector('#submitExample')

  document.querySelector('#example').innerHTML = `
  today 1 EUR is: <strong>${rates.USD.toFixed(2)} 
  </strong>USD and <strong>${rates.GBP.toFixed(2)} </strong>GBP`

  submit.disabled = false
  // conversion
  const convertRates = () => {
    let inputInEUR

    const inputFieldValue = document.querySelector('#inputField').value
    const inputCurrency = document.querySelector('#inputCurrency').value
    const outputCurrency = document.querySelector('#outputCurrency').value

    if (!isNaN(inputFieldValue)) {
      inputCurrency !== 'EUR'
        ? (inputInEUR = parseFloat(inputFieldValue) / rates[inputCurrency])
        : (inputInEUR = parseFloat(inputFieldValue))
      outputCurrency !== 'EUR'
        ? (document.querySelector('#outputField').value = (inputInEUR * rates[outputCurrency]).toFixed(2))
        : (document.querySelector('#outputField').value = inputInEUR.toFixed(2))
    } else {
      document.querySelector('#outputField').value = 'please give a valid price!'
    }
  }

  submit.addEventListener('click', convertRates)
}
exampleUsage()
