import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "../../components/Select";
import Input from "../../components/Input";

const THC_CBD_UNIT_OPTIONS = [
  { value: "MG", label: "MG" },
  { value: "G", label: "G" },
];

const PRICE_UNIT_OPTIONS = [
  { value: "Grams", label: "Grams" },
  { value: "Units", label: "Units" },
  { value: "OZ", label: "OZ" },
];

const UNIT_OPTIONS = [
  { value: "Item", label: "Item" },
  { value: "Grams", label: "Grams" },
  { value: "Units", label: "Units" },
  { value: "OZ", label: "OZ" },
  { value: "Capsule", label: "Capsule" },
  { value: "Pack", label: "Pack" },
  { value: "Box", label: "Box" },
  { value: "Bottle", label: "Bottle" },
  { value: "Bag", label: "Bag" },
  { value: "oz", label: "oz" },
  { value: "lb", label: "lb" },
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
];

const PRODUCT_OPTIONS = [
  { value: "blueMeanies", label: "Blue Meanies (Dried)" },
  { value: "melmac", label: "Melmac (Dried)" },
  { value: "albinoPenis", label: "Albino Penis Envy (Dried)" },
  { value: "mangoPeach", label: "Mango Peach" },
  { value: "other", label: "Other Product" },
];

const GENETIC_OPTIONS = [
  { value: "Hybrid", label: "Hybrid" },
  { value: "Indica", label: "Indica" },
  { value: "Sativa", label: "Sativa" },
];

const CATEGORY_OPTIONS = [
  { value: "Mushrooms", label: "Mushrooms" },
  { value: "Microdose", label: "Microdose" },
  { value: "Edibles", label: "Edibles" },
  { value: "Cannabis", label: "Cannabis" },
  { value: "DMT", label: "DMT" },
  { value: "Tobbaco", label: "Tobbaco" },
];
const SUB_CATEGORY_OPTIONS = [
  { value: "ClassicStrains", label: "Classic Strains" },
  { value: "PremiumStrains", label: "Premium Strains" },
];

const STOCK_OPTIONS = [
  { value: "In-Stock", label: "In-Stock" },
  { value: "Low-Stock", label: "Low-Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const BEST_SELLING_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const POTENCY_OPTIONS = [
  { value: "None", label: "None" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const EFFECT_OPTIONS = [
  { value: "None", label: "None" },
  { value: "Body / Energetic", label: "Body / Energetic" },
  { value: "Body / Euphoric", label: "Body / Euphoric" },
  { value: "Body / Mental", label: "Body / Mental" },
  { value: "Body / Spiritual", label: "Body / Spiritual" },
  { value: "Highly Visual / Spiritual", label: "Highly Visual / Spiritual" },
  { value: "Intense Body", label: "Intense Body" },
  { value: "Intense / Energetic", label: "Intense / Energetic" },
  { value: "Intense / Visual", label: "Intense / Visual" },
  { value: "Mental / Spiritual", label: "Mental / Spiritual" },
  { value: "Mild / Spiritual", label: "Mild / Spiritual" },
  { value: "Natural Body", label: "Natural Body" },
  { value: "Natural Mind", label: "Natural Mind" },
  { value: "Natural Mood", label: "Natural Mood" },
  { value: "Spiritual / Visual", label: "Spiritual / Visual" },
  { value: "Very Intense", label: "Very Intense" },
  { value: "Visual / Body", label: "Visual / Body" },
  { value: "Visual / Euphoric", label: "Visual / Euphoric" },
  { value: "Visual / Spiritual", label: "Visual / Spiritual" },
];

const VEGAN_SOY_OPTIONS = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Yes" },
];

const AddInventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [searchProduct, setSearchProduct] = useState("");
  const [productName, setProductName] = useState("Blue Meanies (Dried)");
  const [unit, setUnit] = useState("Item");
  const [productOrder, setProductOrder] = useState("298");
  const [thcCbdUnit, setThcCbdUnit] = useState("MG");
  const [thcMg, setThcMg] = useState("");
  const [cbdMg, setCbdMg] = useState("");
  const [potency, setPotency] = useState("None");
  const [description, setDescription] = useState("");
  const [purchaseQty, setPurchaseQty] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [selectProduct, setSelectProduct] = useState("blueMeanies");
  const [category, setCategory] = useState("Mushrooms");
  const [subCategory, setSubCategory] = useState("None");
  const [effect, setEffect] = useState("None");
  const [veganSoyFree, setVeganSoyFree] = useState("No");
  const [stock, setStock] = useState("In-Stock");

  const [variations, setVariations] = useState([
    { id: 1, unit: '3.5g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
    { id: 2, unit: '7g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
    { id: 3, unit: '14g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
    { id: 4, unit: '28g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
  ]);

  useEffect(() => {
    if (category === "Edibles") {
      setVariations([
        { id: 1, unit: '4 G', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
      ]);
    } else if (category === "Microdose") {
      setVariations([
        { id: 1, unit: '100 MG / 30 Cap', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 2, unit: '150 MG / 30 Cap', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 3, unit: '200 MG / 30 Cap', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 4, unit: '500 MG / 15 Cap', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
      ]);
    } else {
      setVariations([
        { id: 1, unit: '3.5g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 2, unit: '7g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 3, unit: '14g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
        { id: 4, unit: '28g', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' },
      ]);
    }
  }, [category]);

  const addVariation = () => {
    setVariations([...variations, { id: Date.now(), unit: '', costPrice: '', salePrice: '', lowStock: '10', lowStockUnit: 'Item', quantity: '' }]);
  };

  const removeVariation = (id) => {
    setVariations(variations.filter(v => v.id !== id));
  };

  const updateVariation = (id, field, value) => {
    setVariations(variations.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  useEffect(() => {
    if (isEditMode) {
      // Mock data pre-fill for edit mode
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductName("Blue Meanies (Dried)");
      setProductOrder("298");
      setThcCbdUnit("10");
      setThcMg("2");
      setCbdMg("10");
      setDescription(`Kush Kraft Premium Pre-Rolls – Blue Gelato
Kush Kraft's Blue Gelato pre-rolls offer a refined twist on a fruity powerhouse. This balanced hybrid blends the sweet berry notes of Blueberry with the citrusy richness of Gelato, creating a flavour profile that's both smooth and invigorating.`);
      setPurchaseQty("1023");
      setPurchaseCost("10230.00");
      setSalePrice("10999.00");
      setDiscountedPrice("10979.00");
      setLowStockAlert("23");
      setSelectProduct("blueMeanies");
      setCategory("Mushrooms");
      setStock("In-Stock");
    }
  }, [isEditMode]);

  const handleClose = () => {
    if (isEditMode) {
      navigate(`/inventories/view-inventory/${id}`);
    } else {
      navigate("/inventory");
    }
  };
  const handleSave = () => {
    if (isEditMode) {
      navigate(`/inventories/view-inventory/${id}`);
    } else {
      navigate("/inventory");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 bg-white shadow-sm overflow-hidden">
      {/* Header - fixed: title left, Close (red) + Save (blue) right */}
      <div className="px-5">
        <div className="flex flex-wrap items-center justify-between gap-2  py-3 border-b border-[#000000] shrink-0">
          <h1 className="text-lg font-bold text-gray-900">{isEditMode ? "Edit Product" : "Add Product"}</h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 font-medium text-sm  cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-1.5 py-2 bg-(--color-secondary) text-white rounded-sm hover:opacity-90 font-medium text-sm  cursor-pointer"
            >
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {/* Search - full width, reusable Input */}
        {isEditMode ? (
          <div className="pt-2 pb-2" />
        ) : (
          <div className="px-4 pt-4 pb-2">
            <Input
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Search Product..."
              compact
              className="max-w-full border-gray-300 bg-[#DDDDDD]!"
            />
          </div>
        )

        }

        {/* Two columns: left wider (~65%), right narrower (~35%) */}
        <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">
          {/* Left column - main product details */}
          <div className="space-y-4">
            {/* General Information - two-column internal grid */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2">
                General Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3">
                <div>
                  <Input
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Unit
                  </label>
                  <Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    options={UNIT_OPTIONS}
                    placeholder="Select Unit"
                    compact
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Category
                  </label>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={CATEGORY_OPTIONS}
                    placeholder="Category"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Subcategory
                  </label>
                  <Select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    options={SUB_CATEGORY_OPTIONS}
                    placeholder="Subcategory"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Potency
                  </label>
                  <Select
                    value={potency}
                    onChange={(e) => setPotency(e.target.value)}
                    options={POTENCY_OPTIONS}
                    placeholder="Select Potency"
                    compact
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                <div>
                  <Input
                    label="Product Order"
                    value={productOrder}
                    onChange={(e) => setProductOrder(e.target.value)}
                    placeholder="Product Order"
                    compact
                  />
                </div>
                <div>
                  <Input
                    label="Psilocybin"
                    value={thcCbdUnit}
                    onChange={(e) => setThcCbdUnit(e.target.value)}
                    placeholder="Psilocybin"
                    compact
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    label="Psilocin"
                    value={thcMg}
                    onChange={(e) => setThcMg(e.target.value)}
                    placeholder="Psilocin"
                    compact
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    label="Active Compound"
                    value={cbdMg}
                    onChange={(e) => setCbdMg(e.target.value)}
                    placeholder="Active Compound"
                    compact
                    type="number"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-[#DDDDDD] rounded-sm bg-white font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px]"
                />
              </div>
            </div>

            {/* Pricing & Stock - Dynamic Variations Table */}
            <div>
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-[#000000]">
                Pricing & Stock
              </h2>

              <div className="space-y-3 mt-3">
                {/* Table Headers */}
                <div className="grid grid-cols-[1.2fr_1.2fr_1.2fr_1.5fr_1.2fr_40px] gap-3 mb-1">
                  <span className="text-sm font-semibold text-gray-700">Variation (Unit)</span>
                  <span className="text-sm font-semibold text-gray-700">Cost Price (CAD)</span>
                  <span className="text-sm font-semibold text-gray-700">Sale Price (CAD)</span>
                  <span className="text-sm font-semibold text-gray-700">Low Stock Alert</span>
                  <span className="text-sm font-semibold text-gray-700">Stock Quantity</span>
                  <span></span>
                </div>

                {/* Variation Rows */}
                {variations.map((v) => (
                  <div key={v.id} className="grid grid-cols-[1.2fr_1.2fr_1.2fr_1.5fr_1.2fr_40px] gap-2 items-center">
                    <Input
                      value={v.unit}
                      onChange={(e) => updateVariation(v.id, 'unit', e.target.value)}
                      placeholder="Variation"
                      className="text-xs!"
                      compact
                    />

                    <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                      <div className="flex items-center justify-center px-2 py-2 bg-gray-50 border-r border-[#DDDDDD] font-bold text-gray-700 text-xs shrink-0">
                        $
                      </div>
                      <input
                        type="text"
                        value={v.costPrice}
                        onChange={(e) => updateVariation(v.id, 'costPrice', e.target.value)}
                        placeholder="Enter Cost Price"
                        className="flex-1 min-w-0 px-2 py-2 text-xs border-0 font-medium placeholder-gray-300 focus:outline-none bg-white"
                      />
                    </div>

                    <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                      <div className="flex items-center justify-center px-2 py-2 bg-gray-50 border-r border-[#DDDDDD] font-bold text-gray-700 text-xs shrink-0">
                        $
                      </div>
                      <input
                        type="text"
                        value={v.salePrice}
                        onChange={(e) => updateVariation(v.id, 'salePrice', e.target.value)}
                        placeholder="Enter Sale Price"
                        className="flex-1 min-w-0 px-2 py-2 text-xs border-0 font-medium placeholder-gray-300 focus:outline-none bg-white"
                      />
                    </div>

                    <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white h-[36px]">
                      <input
                        type="text"
                        value={v.lowStock}
                        onChange={(e) => updateVariation(v.id, 'lowStock', e.target.value)}
                        className="w-10 px-2 text-xs border-0 font-medium focus:outline-none bg-white border-r border-[#DDDDDD]"
                      />
                      <div className="flex-1 min-w-0 bg-white relative">
                        <select
                          value={v.lowStockUnit}
                          onChange={(e) => updateVariation(v.id, 'lowStockUnit', e.target.value)}
                          className="w-full h-full text-[11px] border-0 bg-transparent focus:outline-none pl-2 pr-6 font-medium text-gray-900 cursor-pointer appearance-none"
                        >
                          {UNIT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                          <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <Input
                      value={v.quantity}
                      onChange={(e) => updateVariation(v.id, 'quantity', e.target.value)}
                      placeholder="Enter Quantity"
                      className="text-xs!"
                      compact
                    />

                    <button
                      type="button"
                      onClick={() => removeVariation(v.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors shrink-0"
                    >
                      <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVariation}
                  className="mt-3 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-[#0061FF] text-white rounded-sm hover:opacity-90 font-semibold text-sm shadow-sm transition-all active:scale-95"
                >
                  <span className="text-lg leading-none">+</span>
                  Add Variation
                </button>
              </div>
            </div>

            {/* Set Low Stock Alert - title with underline, combined [Unit | Enter Qty] input */}
            <div>
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-[#000000]">
                Set Low Stock Alert
              </h2>
              <div className="mt-3 max-w-xs">
                <label className="block text-sm font-medium text-[#212121] mb-0.5">
                  Low Stock Alert
                </label>
                <div className="flex rounded-sm border border-[#DDDDDD] overflow-hidden bg-white">
                  <div className="flex items-center justify-center px-3 py-2 bg-[#F3F3F3] border-r border-[#DDDDDD] font-semibold text-gray-700 text-sm shrink-0">
                    Unit
                  </div>
                  <input
                    type="text"
                    value={lowStockAlert}
                    onChange={(e) => setLowStockAlert(e.target.value)}
                    placeholder="Enter Qty"
                    className="flex-1 min-w-0 px-3 py-2 text-sm border-0 font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Available: 100 Units
                </p>
              </div>
            </div>

            {/* Available Stock - title with underline, two side-by-side display cards */}
            <div>
              <h2 className="text-base font-bold text-[#212121]  pb-2 border-b border-[#000000]">
                Available Stock
              </h2>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-[#F3F3F3] rounded-sm p-2 border border-[#DDDDDD]">
                  <p className="text-sm font-medium text-[#212121] mb-1">
                    Available Quantity
                  </p>
                  <p className="text-xl font-bold text-[#212121] ">568 Units</p>
                </div>
                <div className="bg-[#F3F3F3] rounded-sm p-2 border border-[#DDDDDD]">
                  <p className="text-sm font-medium text-[#212121] mb-1">
                    Available Stock Valuation
                  </p>
                  <p className="text-xl font-bold text-[#212121] ">$1952.36</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right column - Others: all dropdowns use reusable Select */}
          <div className="border border-[#D8D8D8] rounded-md self-start mt-2 py-3.5">
            <h2 className="text-base font-bold px-4 text-gray-900 mb-2">
              Category
            </h2>
            <div className="space-y-3 px-4">
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                  Effect
                </label>
                <Select
                  value={effect}
                  onChange={(e) => setEffect(e.target.value)}
                  options={EFFECT_OPTIONS}
                  placeholder="Effect"
                  compact
                />
              </div>
              {category === "Mushrooms" && (
                <div>
                  <label className="block text-sm font-semibold text-[#212121] mb-0.5">
                    Vegan & Soy Free
                  </label>
                  <Select
                    value={veganSoyFree}
                    onChange={(e) => setVeganSoyFree(e.target.value)}
                    options={VEGAN_SOY_OPTIONS}
                    placeholder="Vegan & Soy Free"
                    compact
                  />
                </div>
              )}

              <div className="pt-2">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Product Status</h3>
                <div className="space-y-2">
                  {[
                    { id: 'In-Stock', label: 'In Stock', desc: 'Product is available for sale', color: 'bg-blue-500' },
                    { id: 'Low-Stock', label: 'Low Stock', desc: 'Stock is running low', color: 'bg-yellow-500' },
                    { id: 'Out of Stock', label: 'Out of Stock', desc: 'Product is currently unavailable', color: 'bg-red-500' },
                  ].map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setStock(s.id)}
                      className={`p-2.5 border rounded-lg cursor-pointer transition-all ${stock === s.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className={`w-3 h-3 rounded-full ${s.color}`} />
                        <span className="text-sm font-bold text-gray-900">{s.label}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddInventory;
