import { userProductStore } from "@/stores/use-product.store";

const resetStore = () => {
  userProductStore.setState({
    products: [],
    searchQuery: "",
    sortBy: "creacion",
  });
};

beforeEach(resetStore);

describe("userProductStore", () => {
  it("auto-generates sequential codigo values", () => {
    const { addProduct } = userProductStore.getState();
    addProduct({ nombre: "A", descripcion: "Descripción A", cantidad: 1 });
    addProduct({ nombre: "B", descripcion: "Descripción B", cantidad: 2 });

    const codigos = userProductStore.getState().products.map((p) => p.codigo);
    expect(codigos).toEqual([1, 2]);
  });

  it("continues the sequence after a deletion", () => {
    const { addProduct, deleteProduct } = userProductStore.getState();
    addProduct({ nombre: "A", descripcion: "Descripción A", cantidad: 1 });
    addProduct({ nombre: "B", descripcion: "Descripción B", cantidad: 2 });
    deleteProduct(1);
    addProduct({ nombre: "C", descripcion: "Descripción C", cantidad: 3 });

    const codigos = userProductStore.getState().products.map((p) => p.codigo);
    expect(codigos).toEqual([2, 3]);
  });

  it("sets the creation date when adding a product", () => {
    const { addProduct } = userProductStore.getState();
    addProduct({ nombre: "A", descripcion: "Descripción A", cantidad: 1 });

    const [product] = userProductStore.getState().products;
    expect(Number.isNaN(new Date(product.creacion).getTime())).toBe(false);
  });

  it("deletes a product by codigo", () => {
    const { addProduct, deleteProduct } = userProductStore.getState();
    addProduct({ nombre: "A", descripcion: "Descripción A", cantidad: 1 });
    addProduct({ nombre: "B", descripcion: "Descripción B", cantidad: 2 });
    deleteProduct(1);

    const products = userProductStore.getState().products;
    expect(products).toHaveLength(1);
    expect(products[0].codigo).toBe(2);
  });

  it("updates the search query", () => {
    userProductStore.getState().setSearchQuery("café");
    expect(userProductStore.getState().searchQuery).toBe("café");
  });

  it("updates the sort option", () => {
    userProductStore.getState().setSortBy("cantidad");
    expect(userProductStore.getState().sortBy).toBe("cantidad");
  });
});
