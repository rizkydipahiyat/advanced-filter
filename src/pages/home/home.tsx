import { useMemo } from 'react';
import SearchBar from "../../components/SearchBar"
import { useProducts } from '../../core/hooks';
import ItemsContainer from '../../components/ItemsContainer';
import { IoFilterOutline } from 'react-icons/io5';
import Select from '../../components/Select';
import { Link, useSearchParams } from 'react-router-dom';
import CheckboxCategoryFilters from '../../components/CheckboxCategoryFilters';
import Pagination from '../../components/Pagination';


const Home = () => {
  const [keyword, setKeyword] = useSearchParams();
  const getProducts = useProducts()
  const items = useMemo(() => getProducts.data?.products ?? [], [getProducts.data]);
  const itemsCounts = useMemo(() => items.reduce((initial: any, item: any) => {
    if (!isNaN(initial[item.category])) {
      initial[item.category] += 1;
    } else {
      initial[item.category] = 1
    }
    return initial;
  }, {}),
    [items]
  )


  return (
    <div className="container mx-auto max-w-full px-5 py-5 md:px-16 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-3 gap-y-3">
        <Link to={'/'}>
          <h1 className="font-bold text-zinc-600">New Arrival</h1>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center gap-y-2">
          <SearchBar />
          <Select
            onChange={(e) => {
              keyword.set('sort', e.target.value);
              setKeyword(keyword, {
                replace: true
              })
            }}
            label="Sort by"
            name="sort"
            options={[
              {
                label: 'Name',
                value: 'name'
              },
              {
                label: 'Price High',
                value: 'priceDesc',
              },
              {
                label: 'Price Low',
                value: 'priceAsc',
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 py-10">
        <div className='w-full md:w-1/4 px-3'>
          <div className="flex items-center gap-x-2 pb-2">
            <IoFilterOutline size={24} />
            <h2 className='font-semibold text-lg'>FILTER PRODUCT BY</h2>
          </div>
          <hr className="border-b-[2px]" />
          <ul className='py-2'>
            <li>
              <div className="flex items-center justify-between">
                <span className='font-semibold'>Filters</span>
                <span>{items.length} Products</span>
              </div>
            </li>
            <li className='mt-2'>
              <div className="flex items-center justify-between">
                <span>Electronics</span>
                <span>{itemsCounts['ELECTRONIC'] ?? 0}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Cameras</span>
                <span>{itemsCounts['CAMERA'] ?? 0}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Headphones</span>
                <span>{itemsCounts['HEADPHONE'] ?? 0}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Sports</span>
                <span>{itemsCounts['SPORT'] ?? 0}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Cloths</span>
                <span>{itemsCounts['CLOTH'] ?? 0}</span>
              </div>
            </li>
          </ul>
          <hr className='border-b-[2px]' />
          <CheckboxCategoryFilters />
        </div>
        <div className="flex flex-col">
          <ItemsContainer />
          <Pagination />
        </div>
      </div>
    </div >
  )
}

export default Home