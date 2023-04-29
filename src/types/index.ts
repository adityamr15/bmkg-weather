export interface AreaParameter {
  value: string[];
  dateTime: string;
}

export interface Weather {
  name: string;
  latitude: number;
  longitude: number;
  weather: AreaParameter[];
}

export interface SearchParam {
  query: string;
}
