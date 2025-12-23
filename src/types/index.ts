export interface Product {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreateProductData {
  title: string;
  body: string;
}

export interface UpdateProductData {
  title?: string;
  body?: string;
}
