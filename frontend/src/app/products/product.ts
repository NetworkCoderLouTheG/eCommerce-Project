export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  specs?: string;
  category?: {
    id?: number;
    name?: string;
  } | null;
}
