export interface WeatherResponse {
  error: any;
  id: string;
  result: WeatherReport[];
}

export interface WeatherReport {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision?: string;
  stationId: string;
  text: string;
  textHTML: string;
}
