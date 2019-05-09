## Currency conversion service

Code is deploy on `Heroku` ( `https://currency-conversion-service.herokuapp.com`)

### Play with it

```
curl -X POST \
  https://currency-conversion-service.herokuapp.com/conversions \
  -H 'Content-Type: application/json' \
  -d '{
	"base_currency": "USD",
	"value": 1000,
	"quote_currency": "EUR"
}'
```

#### See currencies available

```
curl -X GET \
  https://currency-conversion-service.herokuapp.com/currencies \
  -H 'Content-Type: application/json' \
```

Using ExchangeRatesAPI (https://github.com/exchangeratesapi/exchangeratesapi).
