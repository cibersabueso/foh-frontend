export class SalesList {
  client?: string;
  clientID?: number;
  date?: string;
  saleID?: number;
  total?: number;
}

export class SaleDetail {
  cellPhone?: string;
  clientID?: number;
  date?: string;
  dni?: string;
  email?: string;
  lastName?: string;
  name?: string;
  saleID?: number;
  total?: number;
}

export class SaleDetailProducts {
  amount?: number;
  name?: string;
  price?: number;
  saleID?: number;
  total?: number
}
