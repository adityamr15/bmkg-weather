# bmkg-weather
![npm](https://img.shields.io/npm/v/bmkg-weather?style=flat-square&logo=npm)
![npm](https://img.shields.io/npm/dt/bmkg-weather?color=4caf50&logo=react-native-wheel-picker-expo&style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/bmkg-weather?style=flat-square)

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
