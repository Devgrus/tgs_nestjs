<p align="center">
  The good seat test technique avec nest
</p>

## Installation

```bash
$ npm i
```

## Before running the app

<p>Vous devez modifier la valeur "APIKey" and "APIUrl" => src/offer/offer.service.ts, src/purchase/purchase.service.ts </p>
<p>Vous devez modifier la valeur "dbKey" => app.module.ts</p>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API POST: /offer

<p>startDate is optional value</p>

```bash
# JSON file
{
  "fromLatitude": number,
  "fromLongitude": number,
  "nbPassengers": number,
  "toLatitude": number,
  "toLongitude": number,
	"startDate"?: "YYYY-MM-DD HH:MM"
}

# Example
{
  "fromLatitude": 48.870377,
  "fromLongitude": 2.370615,
  "nbPassengers": 1,
  "toLatitude": 48.882719,
  "toLongitude": 2.322451,
	"startDate": "2021-07-30 13:06"
}
```

## API POST: /purchase

<p>startDate is optional value</p>

```bash
# JSON file
{
  "clientId": string,
  "fromAddress": {
    "latitude": number,
    "longitude": number
  },
  "nbPassengers": number,
	"paymentMethod": string,
  "toAddress": {
    "latitude": number,
    "longitude": number
  },
  "vehicleType": string,
	"tripType": string,
	"distance": number,
	"duration": number,
  "willBePaidInCash": Boolean,
  "startDate": string
}

# Example
{
  "clientId": "37f3dab9-34e2-4d6c-ad8c-2806e1ce4f18",
  "fromAddress": {
    "latitude": 48.870377,
    "longitude": 2.370615
  },
  "nbPassengers": 1,
	"paymentMethod": "ON_BOARD",
  "toAddress": {
    "latitude": 48.882719,
    "longitude": 2.322451
  },
  "vehicleType": "PRIME",
	"tripType": "RESERVATION",
	"distance": 4609,
	"duration": 1366,
  "willBePaidInCash": true,
	"startDate": "2021-07-30 12:00"
}
```

## API POST: /rating

```bash
# JSON file
{
	"purchaseId": number,
	"rating": number(1 || 2 || 3 || 4 || 5)
}

# Example
{
	"purchaseId": 1,
	"rating": 5
}
```

## API GET: /history

```bash
Query option: purchaseId

# Example
/history?purchaseId=1
```
