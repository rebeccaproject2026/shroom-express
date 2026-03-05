const TopSellingProducts = ({ data, onViewAll }) => {
  const products = data || [
    { id: 1, name: "Blue Meanies (Dried)", price: "$4,321" },
    { id: 2, name: "Melmac (Dried)", price: "$1,025" },
    { id: 3, name: "Albino Penis Envy (Dried)", price: "$565" },
    { id: 4, name: "Mango Peach", price: "$520" },
    { id: 5, name: "Aztec God", price: "$499" },
  ];

  return (
    <div className="bg-white rounded-sm shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-800">Top Selling Products</h2>
        <button
          onClick={onViewAll}
          className="text-(--color-primary) text-xs font-semibold bg-[var(--color-primary-soft)]  py-1.5 px-4 rounded-2xl items-center justify-center cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="space-y-1 overflow-y-auto max-h-[320px] ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#333333]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#333333] truncate">{product.name}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-[#333333]">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
