import React from "react";
import Form from "react-bootstrap/Form";
import { ContactContext } from "../../context/contactContext";
import { useContext } from "react";
import {debounce} from 'lodash'
export default function Search() {
  const { dispatch } = useContext(ContactContext);
  const searchInputHandler = (e) => {
    // dispatch({ type: "SET_QUERY_SEARCH"} });
    dispatch({ type: "SEARCH_CONTACT" , payload: { query: e.target.value }});
  };
  const debounceSearch = debounce(searchInputHandler,1000)
  return (
    <Form.Control
      type="search"
      placeholder="جستجوی مخاطب"
      className="me-2 w-25"
      onChange={debounceSearch}
    />
  );
}
