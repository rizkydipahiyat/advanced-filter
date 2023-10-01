import { useMemo, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom"
import { useProducts } from "../core/hooks";


const Pagination = () => {
  const [keyword, setKeyword] = useSearchParams();
  const getProducts = useProducts();
  const items = useMemo(() => getProducts.data ?? [], [getProducts.data]);
  const currentPage = items.currentPage;
  const totalProduct = items.totalProducts;
  const perPage = items.perPage;
  const totalPage = Math.ceil(totalProduct / perPage);

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const onPageChange = (page: any) => {
    if (page === 0) {
      keyword.delete('page')
      setKeyword(keyword, {
        replace: true
      })
    } else {
      keyword.set('page', page);
      setKeyword(keyword, {
        replace: true,
      });
    }
  }




  return (
    <div className='px-3 py-5'>
      <div className="flex items-center gap-x-3 mt-4">
        {pages.map((page) => {
          return (
            <div key={page} className={`px-3 py-2 rounded-md cursor-pointer ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'
              }`} onClick={() => onPageChange(page)}>
              <span>{page}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pagination