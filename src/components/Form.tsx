import React, { memo } from "react";
import "../styles/Form.css";

interface Props {
  searchInputId: (e: React.FormEvent) => void;
  search: string;
  setSearch: (value: React.SetStateAction<string>) => void;
  setLimit: React.Dispatch<any>;
}

const Form: React.FC<Props> = ({searchInputId, search, setSearch, setLimit}) => {
  return (
    <form className="Form" onSubmit={searchInputId}>
      <label htmlFor="artistSearch">Get Recommendations based on your favourite musicians:</label>
      <input 
        type="text"
        value={search}
        id="artistSearch"
        placeholder="Enter artist/ band name..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <label htmlFor="limit">Number of recommendations:</label>
      <select name="limit" id="limit" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(e.target.value)}>
        <option selected value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </select>
    </form>
  );
};

export default memo(Form);