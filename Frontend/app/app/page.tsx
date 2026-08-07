import { ListProduct } from "@/components/product-list";
import { ProductFilter } from "@/components/product-filter";
import { ProductFormModal } from "@/components/product-form-modal";

export default function Home() {
  return (
    <main className="min-h-dvh w-full bg-linear-to-b from-blue-50 via-stone-50 to-stone-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Productos</h1>
            <p className="text-sm text-stone-500">
              Gestiona tu catálogo de productos
            </p>
          </div>
          <ProductFormModal />
        </header>

        <ProductFilter />
        <ListProduct />
      </div>
    </main>
  );
}
