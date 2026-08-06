"use client";

import { ChevronDown, ListFilter, Search } from "lucide-react";
import { userProductStore } from "@/stores/use-product.store";
import { SortBy } from "@/types/product";

export function ProductFilter() {
  const searchQuery = userProductStore((state) => state.searchQuery);
  const setSearchQuery = userProductStore((state) => state.setSearchQuery);
  const sortBy = userProductStore((state) => state.sortBy);
  const setSortBy = userProductStore((state) => state.setSortBy);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-linear-to-b from-white to-blue-50 p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-lg border border-blue-200 bg-white/70 py-2 pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="relative">
        <ListFilter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="w-full appearance-none rounded-lg border border-blue-200 bg-white/70 py-2 pl-9 pr-9 text-sm text-stone-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
        >
          <option value="creacion">Más recientes</option>
          <option value="cantidad">Mayor cantidad</option>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="codigo">Código</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
      </div>
    </div>
  );
}
