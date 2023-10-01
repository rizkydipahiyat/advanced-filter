
import { debounce } from 'lodash';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'
import { useSearchParams } from 'react-router-dom'

const SearchBar = () => {
  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useSearchParams();

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(async () => {
      const text = e.target.value;
      if (text.length === 0) {
        keyword.delete('keyword')
        setKeyword(keyword, {
          replace: true
        })
      } else {
        keyword.set('keyword', text)
        setKeyword(keyword, {
          replace: true
        })
      }
    }, 1500)()
  }


  return (
    <div className={`flex items-center gap-x-2 border-b-[1px] pb-2` + (focused ? 'focused' : '')}>
      <IoSearchOutline />
      <input onBlur={() => setFocused(false)} onFocus={() => setFocused((focus) => !focus)} defaultValue={keyword.get('keyword') ?? ''} type="text" onChange={onKeywordChange} name='keyword' id='keyword' className='outline-none' placeholder='Find items by name...' />
    </div>
  )
}

export default SearchBar