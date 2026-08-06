"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Hash,
  Package,
  PackageSearch,
  Trash2,
} from "lucide-react";
import { userProductStore } from "@/stores/use-product.store";
import type { Product } from "@/types/product";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal.component";
import type { ModalOrigin } from "@/components/ui/modal.component";

export function ListProduct() {
  const products = userProductStore((state) => state.products);
  const searchQuery = userProductStore((state) => state.searchQuery);
  const sortBy = userProductStore((state) => state.sortBy);
  const deleteProduct = userProductStore((state) => state.deleteProduct);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteOrigin, setDeleteOrigin] = useState<ModalOrigin | undefined>();

  const sortedProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = products.filter((p) =>
      query
        ? p.nombre.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query)
        : true,
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
  }, [products, searchQuery, sortBy]);

  const requestDelete = (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDeleteOrigin({
      x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
      y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
    });
    setProductToDelete(product);
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.codigo);
    setProductToDelete(null);
  };

  return (
    <section
      aria-label="Lista de productos"
      className="rounded-xl border border-stone-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
    >
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <PackageSearch className="h-10 w-10 text-stone-300" />
          <p className="font-medium text-stone-600">No se encontraron productos</p>
          <p className="text-sm text-stone-400">
            Agrega un producto para comenzar.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-stone-200">
          {sortedProducts.map((p) => (
            <li
              key={p.codigo}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <Package className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-stone-900">
                    {p.nombre}
                  </p>
                  <p className="truncate text-sm text-stone-500">
                    {p.descripcion}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-stone-900">
                    {p.cantidad} uds
                  </p>
                  <p className="flex items-center justify-end gap-1 text-xs text-stone-400">
                    <Hash className="h-3 w-3" />
                    #{p.codigo}
                  </p>
                  <p className="flex items-center justify-end gap-1 text-xs text-stone-400">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(p.creacion).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(event) => requestDelete(p, event)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDeleteModal
        product={productToDelete}
        origin={deleteOrigin}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
