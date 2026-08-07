import { filterAndSortProducts, getNextCodigo } from "@/lib/products";
import type { Product } from "@/types/product";

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  codigo: 1,
  nombre: "Producto",
  descripcion: "Descripción genérica",
  cantidad: 1,
  creacion: "2026-08-01T10:00:00.000Z",
  ...overrides,
});

const products: Product[] = [
  makeProduct({
    codigo: 3,
    nombre: "Manzana",
    descripcion: "Frutas",
    cantidad: 10,
    creacion: "2026-08-01T10:00:00.000Z",
  }),
  makeProduct({
    codigo: 1,
    nombre: "Peras",
    descripcion: "Frutas dulces",
    cantidad: 30,
    creacion: "2026-08-05T10:00:00.000Z",
  }),
  makeProduct({
    codigo: 2,
    nombre: "Banana",
    descripcion: "Frutas tropicales",
    cantidad: 20,
    creacion: "2026-08-03T10:00:00.000Z",
  }),
];

describe("getNextCodigo", () => {
  it("returns 1 for an empty list", () => {
    expect(getNextCodigo([])).toBe(1);
  });

  it("returns the max existing codigo plus one", () => {
    const codes = [
      makeProduct({ codigo: 5 }),
      makeProduct({ codigo: 2 }),
      makeProduct({ codigo: 9 }),
    ];
    expect(getNextCodigo(codes)).toBe(10);
  });
});

describe("filterAndSortProducts", () => {
  it("sorts by creation date descending", () => {
    const result = filterAndSortProducts(products, "", "creacion");
    expect(result.map((p) => p.nombre)).toEqual(["Peras", "Banana", "Manzana"]);
  });

  it("sorts by quantity descending", () => {
    const result = filterAndSortProducts(products, "", "cantidad");
    expect(result.map((p) => p.cantidad)).toEqual([30, 20, 10]);
  });

  it("sorts by name ascending", () => {
    const result = filterAndSortProducts(products, "", "nombre");
    expect(result.map((p) => p.nombre)).toEqual(["Banana", "Manzana", "Peras"]);
  });

  it("sorts by codigo ascending", () => {
    const result = filterAndSortProducts(products, "", "codigo");
    expect(result.map((p) => p.codigo)).toEqual([1, 2, 3]);
  });

  it("filters by name case-insensitively", () => {
    const result = filterAndSortProducts(products, "MANZANA", "nombre");
    expect(result.map((p) => p.nombre)).toEqual(["Manzana"]);
  });

  it("filters by description", () => {
    const result = filterAndSortProducts(products, "dulces", "creacion");
    expect(result.map((p) => p.nombre)).toEqual(["Peras"]);
  });

  it("trims the search query", () => {
    const result = filterAndSortProducts(products, "  banana  ", "nombre");
    expect(result.map((p) => p.nombre)).toEqual(["Banana"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterAndSortProducts(products, "inexistente", "nombre")).toEqual([]);
  });

  it("does not mutate the input array", () => {
    const copy = [...products];
    filterAndSortProducts(products, "", "nombre");
    expect(products).toEqual(copy);
  });
});
