// src/shared/hooks/usePricingToggle.ts

import { useState } from "react";
import { pricingData, PricingCategory } from "@/data/content/pricing.data";

export function usePricingToggle() {
  const [activeCategory, setActiveCategory] = useState<string>(
    pricingData.categories[0]?.id || "business"
  );

  const handleCategoryChange = (categoryId: string): void => {
    setActiveCategory(categoryId);
  };

  const currentCategory: PricingCategory = 
    pricingData.categories.find((cat) => cat.id === activeCategory) || pricingData.categories[0];

  return {
    activeCategory,
    handleCategoryChange,
    categories: pricingData.categories,
    currentCategory,
  };
}