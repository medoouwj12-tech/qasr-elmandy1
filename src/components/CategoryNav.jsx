import React from 'react';
import { UtensilsCrossed, Flame, Beef, Sandwich, Coffee, Layers } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

const ICON_MAP = {
  UtensilsCrossed: UtensilsCrossed,
  Flame: Flame,
  Beef: Beef,
  Sandwich: Sandwich,
  Coffee: Coffee
};

export const CategoryNav = () => {
  const { categories, products, activeCategory, setActiveCategory } = useMenu();

  const getCategoryCount = (catId) => {
    if (!products || !Array.isArray(products)) return 0;
    if (catId === 'all') return products.length;
    return products.filter((p) => p && p.category_id === catId).length;
  };

  const safeCategories = categories && Array.isArray(categories) ? categories : [];

  return (
    <div id="category-nav" className="sticky top-[105px] md:top-[73px] z-20 bg-[#0d0f12]/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-1">
          {/* "All" Category Tab */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                : 'bg-[#161a23] text-slate-300 hover:bg-[#1f2533] hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الكل</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === 'all'
                  ? 'bg-slate-950 text-amber-300'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {getCategoryCount('all')}
            </span>
          </button>

          {/* Category Items */}
          {safeCategories.map((cat) => {
            const IconComponent = (cat.icon && ICON_MAP[cat.icon]) ? ICON_MAP[cat.icon] : UtensilsCrossed;
            const count = getCategoryCount(cat.id);
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                    : 'bg-[#161a23] text-slate-300 hover:bg-[#1f2533] hover:text-white border border-slate-800'
                }`}
              >
                {IconComponent ? <IconComponent className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                <span>{cat.name_ar}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
