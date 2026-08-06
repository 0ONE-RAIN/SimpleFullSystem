"use client";

import { AlertTriangle, Hash, Package, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import {
  Modal,
  type ModalOrigin,
} from "@/components/ui/modal.component";

interface ConfirmDeleteModalProps {
  product: Product | null;
  origin?: ModalOrigin;
  onClose: () => void;
  onConfirm: (product: Product) => void;
}

export function ConfirmDeleteModal({
  product,
  origin,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={product !== null}
      onClose={onClose}
      severity="danger"
      title="Eliminar producto"
      description="Esta acción no se puede deshacer. ¿Confirmas que deseas eliminar este producto?"
      icon={Trash2}
      origin={origin}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => product && onConfirm(product)}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </button>
        </>
      }
    >
      {product && (
        <div className="overflow-hidden rounded-xl border border-red-100 bg-red-50/50">
          <div className="flex items-center gap-2 border-b border-red-100 bg-linear-to-r from-red-500 to-red-400 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-white" />
            <h3 className="text-sm font-semibold text-white">
              Producto a eliminar
            </h3>
          </div>
          <dl className="divide-y divide-stone-100 px-4">
            <div className="flex items-center justify-between py-3">
              <dt className="flex items-center gap-1.5 text-sm text-stone-500">
                <Hash className="h-3.5 w-3.5" />
                Código
              </dt>
              <dd className="text-sm font-semibold text-stone-900">
                #{product.codigo}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="flex items-center gap-1.5 text-sm text-stone-500">
                <Package className="h-3.5 w-3.5" />
                Nombre
              </dt>
              <dd className="max-w-[60%] truncate text-sm font-semibold text-stone-900">
                {product.nombre}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-stone-500">Cantidad</dt>
              <dd className="text-sm font-semibold text-stone-900">
                {product.cantidad} uds
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Modal>
  );
}
