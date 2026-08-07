"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  Hash,
  Package,
  PackagePlus,
  Plus,
} from "lucide-react";
import { userProductStore } from "@/stores/use-product.store";
import { ProductFormValues, productSchema } from "@/types/product";
import { getNextCodigo } from "@/lib/products";
import { cancelButtonClass, darkButtonClass, infoButtonClass } from "@/lib/button-styles";
import { Modal, ModalOrigin } from "@/components/ui/modal";

const inputBaseClass =
  "mt-1 w-full rounded-lg border bg-white/70 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2";
const inputNormalClass = "border-stone-300 focus:border-blue-400 focus:ring-blue-200";
const inputErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-200";

export function ProductFormModal() {
  const addProduct = userProductStore((state) => state.addProduct);
  const nextCodigo = userProductStore((state) =>
    getNextCodigo(state.products),
  );

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<ModalOrigin | undefined>();
  const [step, setStep] = useState<"form" | "preview">("form");
  const [preview, setPreview] = useState<ProductFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: { nombre: "", descripcion: "", cantidad: undefined },
  });

  const openModal = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
    }
    setStep("form");
    setPreview(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setPreview(null);
    setStep("form");
    reset();
  };

  const onSubmit = (values: ProductFormValues) => {
    setPreview(values);
    setStep("preview");
  };

  const confirmCreate = () => {
    if (!preview) return;
    addProduct(preview);
    closeModal();
  };

  const isFormStep = step === "form";
  const previewRows = preview
    ? [
        { label: "Nombre", value: preview.nombre },
        { label: "Descripción", value: preview.descripcion },
        { label: "Cantidad", value: String(preview.cantidad) },
      ]
    : [];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-2 rounded-xl bg-custom-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 pointer"
      >
        <Plus className="h-4 w-4" />
        Agregar Producto
      </button>

      <Modal
        open={open}
        onClose={closeModal}
        severity="info"
        title={isFormStep ? "Agregar producto" : "Confirmar creación"}
        description={
          isFormStep
            ? "Completa los datos del nuevo producto."
            : "Revisa la información antes de guardar."
        }
        icon={isFormStep ? PackagePlus : Package}
        origin={origin}
        footer={
          isFormStep ? (
            <>
              <button
                type="button"
                onClick={closeModal}
                className={cancelButtonClass}
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="product-form"
                disabled={!isValid}
                className={darkButtonClass}
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={closeModal}
                className={cancelButtonClass}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmCreate}
                className={infoButtonClass}
              >
                <Check className="h-4 w-4" />
                Crear Producto
              </button>
            </>
          )
        }
      >
        {isFormStep ? (
          <form
            id="product-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="product-nombre"
                className="block text-sm font-medium text-stone-700"
              >
                Nombre
              </label>
              <input
                id="product-nombre"
                type="text"
                autoFocus
                placeholder="Ej. Café en grano"
                {...register("nombre")}
                className={`${inputBaseClass} ${errors.nombre ? inputErrorClass : inputNormalClass}`}
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="product-descripcion"
                className="block text-sm font-medium text-stone-700"
              >
                Descripción
              </label>
              <input
                id="product-descripcion"
                type="text"
                placeholder="Ej. Grano arábica tostado 500g"
                {...register("descripcion")}
                className={`${inputBaseClass} ${errors.descripcion ? inputErrorClass : inputNormalClass}`}
              />
              {errors.descripcion && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="product-cantidad"
                className="block text-sm font-medium text-stone-700"
              >
                Cantidad
              </label>
              <input
                id="product-cantidad"
                type="number"
                min={0}
                step={1}
                placeholder="Ej. 25"
                {...register("cantidad", { valueAsNumber: true })}
                className={`${inputBaseClass} ${errors.cantidad ? inputErrorClass : inputNormalClass}`}
              />
              {errors.cantidad && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.cantidad.message}
                </p>
              )}
            </div>
          </form>
        ) : (
          preview && (
            <div className="overflow-hidden rounded-xl border border-blue-100 bg-blue-50/50">
              <div className="flex items-center gap-2 border-b border-blue-100 bg-linear-to-r from-blue-500 to-blue-400 px-4 py-3">
                <Package className="h-4 w-4 text-white" />
                <h3 className="text-sm font-semibold text-white">
                  Nuevo producto
                </h3>
              </div>
              <dl className="divide-y divide-stone-100 px-4">
                <div className="flex items-center justify-between py-3">
                  <dt className="flex items-center gap-1.5 text-sm text-stone-500">
                    <Hash className="h-3.5 w-3.5" />
                    Código
                  </dt>
                  <dd className="text-sm font-semibold text-stone-900">
                    #{nextCodigo}
                  </dd>
                </div>
                {previewRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3"
                  >
                    <dt className="text-sm text-stone-500">{row.label}</dt>
                    <dd className="max-w-[60%] truncate text-sm font-semibold text-stone-900">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        )}
      </Modal>
    </>
  );
}
