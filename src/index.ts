import axios from 'axios';
import { xml2js } from 'xml-js';

import { BASE_BMKG_WEATHER_URL, XML_DATA } from './config';
import { AreaParameter, SearchParam, Weather } from './types';

class BMKGWeather {
  private nextSyncDateTime = 0;
  private jsonData: Weather[] = [];

  private get shouldSync(): boolean {
    return Date.now() > this.nextSyncDateTime;
  }

  async sync() {
    if (this.shouldSync) {
      if (!this.jsonData.length) {
        // wait until request finish
        const data = await this.request();
        this.jsonData = data;
      } else {
        // continue process without waiting request to finish
        this.request().then((data) => {
          this.jsonData = data;
        });
      }
    }

    return this.jsonData;
  }

  // TODO: feature to find weather data by latitude and longitude
  // async getByLatLang(_latitude: number, _longitude: number) {
  //   const data = await this.sync();
  //   return data;
  // }

  async getAll(search: SearchParam = { query: '' }) {
    const data = await this.sync();

    if (typeof search.query === 'string' && search.query.length) {
      return data.filter((weather) =>
        weather.name.toLowerCase().includes(search.query?.toLowerCase())
      );
    }

    return data;
  }

  private async request() {
    const result = [];

    for (const XML of XML_DATA) {
      const { data } = await axios.get(BASE_BMKG_WEATHER_URL + XML);
      const jsonData = xml2js(data, {
        compact: true,
        ignoreDeclaration: true,
      }) as any;

      result.push(...this.parseWeather(jsonData));
    }

    this.updateNextSyncDateTime();

    return result;
  }

  private updateNextSyncDateTime() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // one day time interval to sync update
    this.nextSyncDateTime = now.getTime();
  }

  private parseWeather(jsonData: any): Weather[] {
    const area = jsonData.data.forecast.area;
    return area.map((data: any) => {
      return {
        name: `${data.name.map((name: any) => name._text).join(', ')}, ${
          area[0]._attributes.domain
        }`,
        latitude: data._attributes.latitude,
        longitude: data._attributes.longitude,
        weather: this.parseTemperatureParam(data.parameter),
      };
    });
  }

  private parseTemperatureParam(
    jsonDataAreaParameters: any[]
  ): AreaParameter[] {
    try {
      const weatherAndTemperatureParam = jsonDataAreaParameters.find(
        (data) => data._attributes.id === 't'
      );

      return weatherAndTemperatureParam.timerange.map((timerange: any) => ({
        value: timerange.value.map(
          (value: any) => `${value._text}°${value._attributes.unit}`
        ),
        dateTime: this.parseDateTimeFormat(timerange._attributes.datetime),
      }));
    } catch (error) {
      return [];
    }
  }

  private parseDateTimeFormat(dateTime: string) {
    return (
      dateTime.slice(0, 4) +
      '-' +
      dateTime.slice(4, 6) +
      '-' +
      dateTime.slice(6, 8) +
      ' ' +
      dateTime.slice(8, 10) +
      ':' +
      dateTime.slice(10)
    );
  }
}

export default new BMKGWeather();
