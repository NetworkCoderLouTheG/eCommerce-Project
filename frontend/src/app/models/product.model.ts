import { Category } from './category.model';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Category;
  brand: string;
  imageUrl: string;
  specifications: any;
  createdAt?: Date;
  updatedAt?: Date;
}