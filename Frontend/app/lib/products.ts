import type { Product, SortBy } from "@/types/product";

export function getNextCodigo(products: Product[]): number {
  return products.reduce((max, p) => Math.max(max, p.codigo), 0) + 1;
}

export function filterAndSortProducts(
  products: Product[],
  searchQuery: string,
  sortBy: SortBy,
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  const filtered = products.filter(
    (p) =>
      !query ||
      p.nombre.toLowerCase().includes(query) ||
      p.descripcion.toLowerCase().includes(query),
  );

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "nombre":
        return a.nombre.localeCompare(b.nombre);
      case "cantidad":
        return b.cantidad - a.cantidad;
      case "codigo":
        return a.codigo - b.codigo;
      case "creacion":
      default:
        return (
          new Date(b.creacion).getTime() - new Date(a.creacion).getTime()
        );
    }
  });
}
