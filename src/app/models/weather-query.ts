export interface WeatherQuery {
  id: string;
  method: string;
  params: [
    {
      id: string;
      reportTypes: string[];
      stations?: string[];
      countries?: string[];
    },
  ];
}
