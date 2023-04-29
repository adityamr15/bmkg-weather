import BMKGW from '../index';

declare module 'BMKGWeather' {
  const whatever: typeof BMKGW;
  export = whatever;
}
