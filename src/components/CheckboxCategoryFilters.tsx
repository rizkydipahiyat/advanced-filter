import { useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { useProducts } from '../core/hooks';
import { getUniqueValue } from '../core/utils';
import { Product } from '../core/types';


const CheckboxCategoryFilters = () => {
  const [keyword, setKeyword] = useSearchParams();
  const filterCategory = keyword.get('category')?.split(',') ?? [];
  const [category, setCategory] = useState(filterCategory);
  const getProducts = useProducts();
  const items = getProducts.data?.products ?? [];
  const allCategory = getUniqueValue<string, Product>(items, 'category');
  const groupedItems = allCategory.map((category) => ({
    label: category,
    name: category,
    value: category
  })).sort((a, b) => a.name.localeCompare(b.name));

  const onCategoryChange = (value: string) => () => {
    const updatedCategories = {
      ...category,
      [value]: !category[value],
    };
    setCategory(updatedCategories);

    // Buat URL baru berdasarkan kategori yang dicentang
    const selectedCategories = Object.keys(updatedCategories).filter((key) => updatedCategories[key]);
    const categoryParam = selectedCategories.join(',');
    if (categoryParam.length === 0) {
      keyword.delete('category')
      setKeyword(keyword, {
        replace: true
      })
    } else {
      keyword.set('category', categoryParam);
      setKeyword(keyword, {
        replace: true,
      });
    }
  };
  return (
    <div className="py-2">
      <h2 className="font-semibold pb-3">Category</h2>
      {/* {groupedItems.map((field, key) => (
        <div className="flex items-center gap-x-2" key={key}>
          <input type="checkbox" name={field.name} id={field.name} checked={category[field.value] ?? false} onChange={onCategoryChange(field.value)} />
          <label>{field.label}</label>
        </div>
      ))} */}
      <div className="flex items-center gap-x-2">
        <input type="checkbox" name="ELECTRONIC" id="ELECTRONIC" checked={category['ELECTRONIC'] ?? false} onChange={onCategoryChange('ELECTRONIC')} />
        <label>ELECTRONICS</label>
      </div>
      <div className="flex items-center gap-x-2">
        <input type="checkbox" name="CAMERA" id="CAMERA" checked={category['CAMERA'] ?? false} onChange={onCategoryChange('CAMERA')} />
        <label>CAMERAS</label>
      </div>
      <div className="flex items-center gap-x-2">
        <input type="checkbox" name="HEADPHONE" id="HEADPHONE" checked={category['HEADPHONE'] ?? false} onChange={onCategoryChange('HEADPHONE')} />
        <label>HEADPHONES</label>
      </div>
      <div className="flex items-center gap-x-2">
        <input type="checkbox" name="SPORT" id="SPORT" checked={category['SPORT'] ?? false} onChange={onCategoryChange('SPORT')} />
        <label>SPORTS</label>
      </div>
      <div className="flex items-center gap-x-2">
        <input type="checkbox" name="CLOTH" id="CLOTH" checked={category['CLOTH'] ?? false} onChange={onCategoryChange('CLOTH')} />
        <label>CLOTHS</label>
      </div>
    </div>
  )
}

export default CheckboxCategoryFilters