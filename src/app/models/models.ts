export interface Product {
  itemCost: number;
  productName: string;
}

export interface Customer {
  address: string;
  city: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  latitude: number;
  longitude: number;
  orders: Product[];
  state: {
    abbreviation: string;
    name: string;
  };
  fullName: string;
}
