
import { useProducts } from '../core/hooks'
import { BarLoader } from 'react-spinners';
import { Product } from '../core/types';

const ItemsContainer = () => {
  const getProducts = useProducts();
  const items = getProducts.data ?? [];

  if (getProducts.isLoading) {
    return (
      <div className='flex w-75'>
        <BarLoader height={8} width="100%" color='#36d7b7' />
      </div>
    )
  }
  return (
    <div className="md:w-full w-full px-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items?.products?.map((item: Product) => {
          return (
            <div key={item.id} className=''>
              <img src={item.images[0]} alt={item.name} loading='lazy' width={0} height={0} sizes='100vh' className='w-[200px] h-[200px] object-cover' />
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span>{item.category.toLowerCase()}</span>
                <span>{item.price}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItemsContainer