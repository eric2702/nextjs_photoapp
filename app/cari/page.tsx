"use client";
import React from "react";
import SectionResult from "./sectionResult";

export default function cari() {
  const [query, setQuery] = React.useState("");
  const OnSearch = (e: any) => {
    e.preventDefault();
    const inputQuery = e.target[0].value;
    setQuery(inputQuery);
  };
  return (
    <div>
      <form onSubmit={OnSearch}>
        <input type="text" />
        <button>cari orang</button>
      </form>
      {query && <SectionResult query={query} />}
    </div>
  );
}
