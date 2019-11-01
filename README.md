# European Central Bank currency rates to JSON

European Central Bank's currency rates in JSON (fetched and transformed from the original XML feed)

## Background

The European Central Bank (ECB) [provides up-to-date currency rates](https://www.ecb.europa.eu/stats/) for 32 currencies around the world (the base is EUR). As ECB publishes this information solely in XML format the following ES6 script can be useful **for frontend applications** to get the data in the more convinient JSON.

The script contains two async functions where the first one queries the XML feed with the native Fetch API (to avoid CORS warnings the great: https://cors-anywhere.herokuapp.com/ service is in use here 🙏 -- will need to be replaced a hosted version of CORS anywhere in the future as it has rate limit! ☝️), and the second transforms the relevant XML attribute values to an easy-to-use JSON (OK, it returns a JS object, you need to stringify it if you really need JSON)

## Original feed (XML)

```xml
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
<gesmes:subject>Reference rates</gesmes:subject>
<gesmes:Sender>
<gesmes:name>European Central Bank</gesmes:name>
</gesmes:Sender>
<Cube>
<Cube time="2019-08-23">
<Cube currency="USD" rate="1.1065"/>
<Cube currency="JPY" rate="117.79"/>
<Cube currency="BGN" rate="1.9558"/>
<Cube currency="CZK" rate="25.769"/>
<Cube currency="DKK" rate="7.4559"/>
<Cube currency="GBP" rate="0.90453"/>
<Cube currency="HUF" rate="328.58"/>
<Cube currency="PLN" rate="4.3550"/>
<Cube currency="RON" rate="4.7212"/>
<Cube currency="SEK" rate="10.7165"/>
<Cube currency="CHF" rate="1.0893"/>
<Cube currency="ISK" rate="138.10"/>
<Cube currency="NOK" rate="9.9593"/>
<Cube currency="HRK" rate="7.3940"/>
<Cube currency="RUB" rate="72.9469"/>
<Cube currency="TRY" rate="6.3815"/>
<Cube currency="AUD" rate="1.6396"/>
<Cube currency="BRL" rate="4.5224"/>
<Cube currency="CAD" rate="1.4741"/>
<Cube currency="CNY" rate="7.8439"/>
<Cube currency="HKD" rate="8.6776"/>
<Cube currency="IDR" rate="15726.13"/>
<Cube currency="ILS" rate="3.8924"/>
<Cube currency="INR" rate="79.3040"/>
<Cube currency="KRW" rate="1341.19"/>
<Cube currency="MXN" rate="22.0041"/>
<Cube currency="MYR" rate="4.6362"/>
<Cube currency="NZD" rate="1.7360"/>
<Cube currency="PHP" rate="58.008"/>
<Cube currency="SGD" rate="1.5360"/>
<Cube currency="THB" rate="33.997"/>
<Cube currency="ZAR" rate="16.8439"/>
</Cube>
</Cube>
</gesmes:Envelope>
```

## Output (JSON)

```json
{
  "time": "2019-08-23",
  "USD": 1.1065,
  "JPY": 117.79,
  "BGN": 1.9558,
  "CZK": 25.769,
  "DKK": 7.4559,
  "GBP": 0.90453,
  "HUF": 328.58,
  "PLN": 4.355,
  "RON": 4.7212,
  "SEK": 10.7165,
  "CHF": 1.0893,
  "ISK": 138.1,
  "NOK": 9.9593,
  "HRK": 7.394,
  "RUB": 72.9469,
  "TRY": 6.3815,
  "AUD": 1.6396,
  "BRL": 4.5224,
  "CAD": 1.4741,
  "CNY": 7.8439,
  "HKD": 8.6776,
  "IDR": 15726.13,
  "ILS": 3.8924,
  "INR": 79.304,
  "KRW": 1341.19,
  "MXN": 22.0041,
  "MYR": 4.6362,
  "NZD": 1.736,
  "PHP": 58.008,
  "SGD": 1.536,
  "THB": 33.997,
  "ZAR": 16.8439
}
```

## Usage

```javascript
transformRatesToJSON()
```

Use it with promises (or with async/await syntax as below) to get the rates for the specific currencies. Like for US dollar: `rates.USD`. _Note:_ ECB - not like other APIs based on their data - doesn't use rate limits, however their service isn't fast, try to call this function as few places as possibble and store the JSON for later usage.
See other details in 'Background' section above.

```javascript
async function exampleUsage() {
  const rates = await transformRatesToJSON()
  console.log(rates.USD)
}
exampleUsage()
// output: 1.1065
```

In the src folder there is an example.js and example.html. With an express server (in server.js) you can test it without cors warnings on http://localhost:5000/example.html.
Run it with `node src/server.js` or `yarn example` commands.

# License

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
