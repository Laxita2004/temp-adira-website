"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

interface FilterChipProps {
  paramKey: string;       // e.g., "category", "pattern", "minPrice"
  paramValue: string;     // value of that filter
  label?: string;         // optional override label to show
}

const FilterChip: React.FC<FilterChipProps> = ({ paramKey, paramValue, label }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);

    if (paramKey === "minPrice" || paramKey === "maxPrice") {
      // remove both min and max together if one is removed
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <span className="flex text-gray-700 items-center bg-gray-200 text-sm px-3 py-1 rounded-full">
      {label || paramValue}
      <button onClick={removeFilter} className="ml-2 text-gray-600 hover:text-black">
        <X size={14} />
      </button>
    </span>
  );
};

export default FilterChip;
