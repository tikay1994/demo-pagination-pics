import React, { useState, useEffect } from "react";
import "./App.css";
import queryString from "query-string";
import Pagination from "./pagination";
import SearchForm from "./search";
import PicList from "./picList";
function App() {
  const [picList, setPicList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    async function fetchPicList() {
      try {
        const requireUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requireUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        const { data, pagination } = responseJSON;
        setPicList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchPicList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("new page", newPage);

    setFilters({
      ...filters,
      _page: newPage,
    });
  }
  function handleFiltersChange(newFilters) {
    console.log("new filters", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.search,
    });
  }

  return (
    <div className="App">
      <SearchForm onSubmit={handleFiltersChange} />
      <PicList pics={picList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
