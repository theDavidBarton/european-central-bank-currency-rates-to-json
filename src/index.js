/*
MIT License

Copyright (c) 2019 David Barton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

async function getCurrencyRatesXML() {
  try {
    let response = await fetch(
      'https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
    )
    let data = await response.text()
    let parsedData = await new DOMParser().parseFromString(
      data,
      'application/xml'
    )
    let cubeContent = await parsedData.getElementsByTagName('*')
    return Object.values(cubeContent)
  } catch (e) {
    console.error(e)
  }
}

async function transformRatesToJSON() {
  let rates = []
  let data = await getCurrencyRatesXML()
  try {
    data.map(el => {
      if (el.attributes.getNamedItem('currency') !== null) {
        rates.push({
          [el.attributes.getNamedItem('currency').value]: parseFloat(
            el.attributes.getNamedItem('rate').value
          )
        })
      } else if (el.attributes.getNamedItem('time') !== null) {
        rates.push({ time: el.attributes.getNamedItem('time').value })
      }
    })
  } catch (e) {
    console.error(e)
  }
  rates = Object.assign({}, ...rates)
  console.log(rates)
  return rates
}
