import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../admin/components/Input';
import Select from '../../../../admin/components/Select';

const CATEGORY_OPTIONS = [
  { value: "Mushrooms", label: "Mushrooms" },
  { value: "Edibles", label: "Edibles" },
  { value: "Microdose", label: "Microdose" },
  { value: "Concentrates", label: "Concentrates" },
  { value: "Accessories", label: "Accessories" },
];

const SUB_CATEGORY_OPTIONS = [
  { value: "Focus & Clarity", label: "Focus & Clarity" },
  { value: "Dried Mushrooms", label: "Dried Mushrooms" },
  { value: "Capsules", label: "Capsules" },
  { value: "Gummies", label: "Gummies" },
];

const UNIT_OPTIONS = [
  { value: "capsule", label: "capsule" },
  { value: "gram", label: "gram" },
  { value: "item", label: "item" },
  { value: "pack", label: "pack" },
];

const POTENCY_OPTIONS = [
  { value: "Potency 1", label: "Potency 1" },
  { value: "Potency 2", label: "Potency 2" },
  { value: "Potency 3", label: "Potency 3" },
];

const EFFECT_OPTIONS = [
  { value: "Natural Body", label: "Natural Body" },
  { value: "Energetic", label: "Energetic" },
  { value: "Visual", label: "Visual" },
];

const VARIATION_TYPE_OPTIONS = [
  { value: "Units", label: "Units" },
  { value: "Weight", label: "Weight" },
];

const PRODUCT_TAG_OPTIONS = [
  { value: "Best Seller", label: "Best Seller" },
  { value: "New Arrival", label: "New Arrival" },
  { value: "Organic", label: "Organic" },
  { value: "Premium", label: "Premium" },
  { value: "Fast Acting", label: "Fast Acting" },
  { value: "Lab Tested", label: "Lab Tested" },
];

const Step4ProductsTags = ({ formData, setFormData }) => {
  const [inventoryMode, setInventoryMode] = useState('now');
  const [currentProduct, setCurrentProduct] = useState({
    name: 'Blue Meanies (Dried)',
    category: 'Mushrooms',
    subcategory: 'Dried Mushrooms',
    sku: 'SKU-BM-001',
    unit: 'gram',
    potency: 'Potency 1',
    effect: 'Natural Body',
    description: 'High quality dried mushrooms for a premium experience.',
    variationType: 'Units',
    tags: ['Premium'],
    variations: [
      { id: 1, unit: '3.5g', cost: '10.00', sale: '20.00', discount: '19.00', stock: '10' },
      { id: 2, unit: '7g', cost: '20.00', sale: '30.00', discount: '29.00', stock: '10' },
    ],
    images: []
  });

  useEffect(() => {
    // Pre-fill wizard data for testing and validation
    if (!formData.licenseNumber || formData.productTypes.length === 0) {
      setFormData(prev => ({
        ...prev,
        licenseNumber: 'LIC-2026-ON-00123',
        productTypes: ['Microdose'],
        inventoryMode: 'now'
      }));
    }
  }, []);

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleSaveProduct = () => {
    if (previewImage) {
      setCurrentProduct(prev => ({
        ...prev,
        images: [...prev.images, previewImage]
      }));
      setPreviewImage(null);
    }
  };

  const removeGalleryImage = (imgUrl) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imgUrl)
    }));
  };

  const handleModeChange = (mode) => {
    setInventoryMode(mode);
    setFormData({ ...formData, inventoryMode: mode });
  };

  const updateProductField = (field, value) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
  };

  const updateVariation = (id, field, value) => {
    setCurrentProduct(prev => ({
      ...prev,
      variations: prev.variations.map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  const addVariation = () => {
    setCurrentProduct(prev => ({
      ...prev,
      variations: [...prev.variations, { id: Date.now(), unit: '', cost: '', sale: '', discount: '', stock: '' }]
    }));
  };

  const removeVariation = (id) => {
    setCurrentProduct(prev => ({
      ...prev,
      variations: prev.variations.filter(v => v.id !== id)
    }));
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="lucide:layout-grid" className="text-[#E93E2B]" width="20" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Products</h3>
            <p className="text-[#181211] text-xs leading-tight">Define what the store sells and how it appears in search</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 4 of 5</span>
      </div>

      <div className="p-5 space-y-6">
        {/* Inventory Setup Section */}
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="text-sm font-bold text-[#1E293B]">Inventory Setup</h4>
            <p className="text-sm mt-1 text-[#475569]">Add products new or continue store step and add inventory letter</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Add Now Card */}
            <div
              onClick={() => handleModeChange('now')}
              className={`p-3 border-2 rounded-md cursor-pointer transition-all ${inventoryMode === 'now' ? 'border-[#F04438] bg-[#FEF3F2]' : 'border-[#CBD5E1] bg-[#F8FAFC]'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${inventoryMode === 'now' ? 'border-[#E93E2B]' : 'border-gray-300'}`}>
                  {inventoryMode === 'now' && <div className="w-2.5 h-2.5 bg-[#E93E2B] rounded-full" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">Add inventory now</p>
                  <p className="text-sm text-[#64748B] mt-1 font-normal">Create product categories, stock quantity, pricing, and available for this store</p>
                </div>
              </div>
            </div>

            {/* Add Later Card */}
            <div
              onClick={() => handleModeChange('later')}
              className={`p-3 border-2 rounded-md cursor-pointer transition-all ${inventoryMode === 'later' ? 'border-[#F04438] bg-[#FEF3F2]' : 'border-[#CBD5E1] bg-[#F8FAFC]'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${inventoryMode === 'later' ? 'border-[#E93E2B]' : 'border-gray-300'}`}>
                  {inventoryMode === 'later' && <div className="w-2.5 h-2.5 bg-[#E93E2B] rounded-full" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">Add inventory later</p>
                  <p className="text-sm text-[#64748B] mt-1 font-normal">You can add inventory anytime from Store Inventory after the store is created</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-xs text-[#64748B]">
            <Icon icon="material-symbols:warning-rounded" className="w-4 h-4 text-[#64748B]" />
            <span>You can always update inventory setting from store setting after creation.</span>
          </div>
        </div>

        {inventoryMode === 'now' && (
          <>
            {/* Product Details Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <Input
                    label="Product Name"
                    required
                    value={currentProduct.name}
                    onChange={(e) => updateProductField('name', e.target.value)}
                    placeholder="e.g. Micro Dose Copusles 30mg"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Category <span className="text-red-500">*</span></label>
                  <Select
                    options={CATEGORY_OPTIONS}
                    value={currentProduct.category}
                    onChange={(e) => updateProductField('category', e.target.value)}
                    placeholder="Micro Dose"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Subcategory <span className="text-red-500">*</span></label>
                  <Select
                    options={SUB_CATEGORY_OPTIONS}
                    value={currentProduct.subcategory}
                    onChange={(e) => updateProductField('subcategory', e.target.value)}
                    placeholder="Focus & Clarity"
                    compact
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Input
                  label="SKU"
                  required
                  value={currentProduct.sku}
                  onChange={(e) => updateProductField('sku', e.target.value)}
                  placeholder="e.g #MIC-CAP-30"
                  compact
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Unit <span className="text-red-500">*</span></label>
                  <Select
                    options={UNIT_OPTIONS}
                    value={currentProduct.unit}
                    onChange={(e) => updateProductField('unit', e.target.value)}
                    placeholder="capsule"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Potency <span className="text-red-500">*</span></label>
                  <Select
                    options={POTENCY_OPTIONS}
                    value={currentProduct.potency}
                    onChange={(e) => updateProductField('potency', e.target.value)}
                    placeholder="Potency 1"
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Effect <span className="text-red-500">*</span></label>
                  <Select
                    options={EFFECT_OPTIONS}
                    value={currentProduct.effect}
                    onChange={(e) => updateProductField('effect', e.target.value)}
                    placeholder="Natural Body"
                    compact
                  />
                </div>
              </div>

              <div className='mb-0'>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Product Description <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-sm text-sm min-h-[100px] focus:outline-none"
                  placeholder="Describe this product - what it is, benefits, usage instructions..."
                  value={currentProduct.description}
                  onChange={(e) => updateProductField('description', e.target.value)}
                  maxLength={500}
                />
                <p className="text-right text-[10px] text-gray-400 mt-1">{currentProduct.description.length}/500</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Variation</label>
                  <Select
                    options={VARIATION_TYPE_OPTIONS}
                    value={currentProduct.variationType}
                    onChange={(e) => updateProductField('variationType', e.target.value)}
                    compact
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Products Tags</label>
                  <Select
                    options={PRODUCT_TAG_OPTIONS}
                    value={currentProduct.tags[0] || ''}
                    onChange={(e) => updateProductField('tags', [e.target.value])}
                    placeholder="Select Tags"
                    compact
                  />
                </div>
              </div>

              {/* Variations Table */}
              <div className="pt-2 space-y-4">
                {currentProduct.variations.map((v, idx) => (
                  <div key={v.id} className="relative group">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pr-10">
                      <div>
                        <Input
                          label="Variation (Unit)"
                          value={v.unit}
                          onChange={(e) => updateVariation(v.id, 'unit', e.target.value)}
                          placeholder="e.g. 3.5g"
                          compact
                        />
                      </div>
                      <div>
                        <Input
                          label="Cost Price *"
                          value={v.cost}
                          onChange={(e) => updateVariation(v.id, 'cost', e.target.value)}
                          placeholder="$ 00.00"
                          compact
                          prefix={<span className="text-gray-400 text-xs font-bold">$</span>}
                        />
                      </div>
                      <div>
                        <Input
                          label="Sale Price *"
                          value={v.sale}
                          onChange={(e) => updateVariation(v.id, 'sale', e.target.value)}
                          placeholder="$ 00.00"
                          compact
                          prefix={<span className="text-gray-400 text-xs font-bold">$</span>}
                        />
                      </div>
                      <div>
                        <Input
                          label="Discount Price *"
                          value={v.discount}
                          onChange={(e) => updateVariation(v.id, 'discount', e.target.value)}
                          placeholder="$ 00.00"
                          compact
                          prefix={<span className="text-gray-400 text-xs font-bold">$</span>}
                        />
                      </div>
                      <div>
                        <Input
                          label="Stock Quantity *"
                          value={v.stock}
                          onChange={(e) => updateVariation(v.id, 'stock', e.target.value)}
                          placeholder="00"
                          compact
                        />
                      </div>
                    </div>

                    {idx > 0 && (
                      <button
                        onClick={() => removeVariation(v.id)}
                        className="absolute right-0 bottom-1.5 w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Icon icon="lucide:trash-2" width="18" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addVariation}
                  className="flex items-center gap-1 text-[#E93E2B] text-sm font-bold hover:opacity-80 transition-opacity"
                >
                  <Icon icon="lucide:plus" width="16" />
                  Add Variation
                </button>
              </div>

              {/* Upload Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div
                  onClick={() => document.getElementById('product-image-upload').click()}
                  className="relative border-2 border-dashed border-[#BDBDD2] rounded-lg h-[200px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#E93E2B] transition-colors bg-gray-50/30 overflow-hidden"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <>
                      <input
                        type="file"
                        id="product-image-upload"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center">
                        <Icon icon="lucide:plus" className="text-[#E93E2B]" width="20" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#181211]">Click to upload Product Image</p>
                        <p className="text-xs text-gray-400 mt-1">Upload a PNG or JPG<br />(520×520px recommended - max 2MB)</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-[#181211]">Product Gallery</p>
                  <div className="grid grid-cols-2 gap-3 max-w-[240px]">
                    {currentProduct.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
                        <img
                          src={img}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); removeGalleryImage(img); }}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm border border-red-500"
                        >
                          <Icon icon="lucide:trash-2" width="14" />
                        </button>
                      </div>
                    ))}
                    <div
                      onClick={() => document.getElementById('product-image-upload').click()}
                      className="aspect-square bg-gray-50 border border-dashed border-[#BDBDD2] rounded-lg flex items-center justify-center cursor-pointer hover:bg-white hover:border-[#E93E2B] transition-all"
                    >
                      <div className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                        <Icon icon="lucide:plus" className="text-[#E93E2B]" width="20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-start gap-3 pt-4 font-manrope">
                <button className="px-6 py-2.5 bg-white shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] text-sm font-semibold text-[#475569] transition-all flex items-center gap-2 hover:bg-gray-50 rounded-md border border-gray-100">
                  Save & Add New
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-10 py-2.5 bg-[#E93E2B] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#E93E2B33,0px_10px_15px_-3px_#E93E2B33] hover:bg-[#E93E2B]/90 transition-all flex items-center gap-2 active:scale-95 transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step4ProductsTags;
