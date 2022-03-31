import React from "react";
import "../styles/Form.css";

interface Props {
  searchInputId: (e: React.FormEvent) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setLimit: React.Dispatch<React.SetStateAction<string>>;
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
      <select name="limit" defaultValue="20" id="limit" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(e.target.value)}>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </select>
    </form>
  );
};

export default Form;