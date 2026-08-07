import { createJSONStorage, persist } from "zustand/middleware";
import { Product, SortBy } from "../types/product";
import { getNextCodigo } from "../lib/products";
import { create } from "zustand";

interface ProductState {
  products: Product[];
  searchQuery: string;
  sortBy: SortBy;

  addProduct: (product: Omit<Product, "codigo" | "creacion">) => void;
  deleteProduct: (codigo: number) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortBy) => void;
}

export const userProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      searchQuery: "",
      sortBy: "creacion",
      addProduct: (newProduct) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...newProduct,
              codigo: getNextCodigo(state.products),
              creacion: new Date().toISOString(),
            },
          ],
        })),
      deleteProduct: (codigo) =>
        set((state) => ({
          products: state.products.filter((c) => c.codigo !== codigo),
        })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
