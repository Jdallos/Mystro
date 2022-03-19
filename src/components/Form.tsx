import React from "react";

interface Props {
  searchInputId: (e: React.FormEvent) => void;
  search: string;
  setSearch: (value: React.SetStateAction<string>) => void;
}

const Form: React.FC<Props> = ({searchInputId, search, setSearch}) => {
  return (
    <form onSubmit={searchInputId}>
      <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>{search}</p>
    </form>
  );
};

export default Form;
