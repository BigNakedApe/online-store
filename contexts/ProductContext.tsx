import { createContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
  initialProducts,
}: {
  children: ReactNode;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}