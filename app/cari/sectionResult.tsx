import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  query: string;
}

export default function SectionResult({ query }: Props) {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/search/users?q=${query}`,
    fetcher
  );
  return (
    <div>
      <p>Hasil Pencarian: {query}</p>
      {isLoading && (
        <p style={{ backgroundColor: "red", color: "white" }}>loading</p>
      )}
      {error && <p style={{ backgroundColor: "red", color: "white" }}>error</p>}
      {data && (
        <p style={{ backgroundColor: "red", color: "white" }}>
          {JSON.stringify(data)}
        </p>
      )}
    </div>
  );
}
