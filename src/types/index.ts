export interface IAreaParameter {
  value: string[];
  dateTime: string;
}

export interface IWeather {
  name: string;
  latitude: number;
  longitude: number;
  weather: IAreaParameter[];
}
