# bmkg-weather

NodeJS BMKG Weather Service

### Install

```
npm install bmkg-weather
```

or

```
yarn add bmkg-weather
```

### Implementation

```typescript
import BMKGWeather from 'bmkg-weather';

const result = await BMKGWeather.getAll();

console.log(result);

const searchResult = await BMKGWeather.getAll({ query: 'sumbawa' });
console.log(searchResult);
```
