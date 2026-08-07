import { productSchema } from "@/types/product";

const validProduct = {
  nombre: "Café",
  descripcion: "Grano arábica tostado 500g",
  cantidad: 5,
};

describe("productSchema", () => {
  it("accepts a valid product", () => {
    expect(productSchema.safeParse(validProduct).success).toBe(true);
  });

  it("rejects a nombre that is too short", () => {
    const result = productSchema.safeParse({ ...validProduct, nombre: "C" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["nombre"]);
    }
  });

  it("rejects a descripcion that is too short", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      descripcion: "Gr",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["descripcion"]);
    }
  });

  it("rejects a negative cantidad", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      cantidad: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a decimal cantidad", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      cantidad: 2.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric cantidad", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      cantidad: Number.NaN,
    });
    expect(result.success).toBe(false);
  });
});
