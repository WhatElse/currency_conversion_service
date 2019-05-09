export interface IRates {
  base: string;
  rates: {
    [key: string]: number;
  };
  date: string;
}
