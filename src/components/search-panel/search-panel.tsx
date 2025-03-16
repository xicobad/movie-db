import {useState, useEffect, useCallback} from 'react';
import { Input } from 'antd';
import {debounce} from "lodash"
import "./search-panel.css";

const { Search } = Input;

const SearchPanel = ({onSearch} : {onSearch: (query: string) => void}) =>  {

  const [query, setQuery] = useState("");

  const debounceSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 500), 
    [onSearch]
  );

  useEffect(() => {
    if (query) {
      debounceSearch(query);
    }
  }, [query, debounceSearch])

    return (
      <Search 
      className="search-input"
      placeholder="input search text"
      enterButton="Search"
      size="middle"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      />
    );
}

export default SearchPanel;