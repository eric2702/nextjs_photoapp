import React from "react";

async function getData(param: string) {
  const res = fetch(`https://api.github.com/users/${param}`);
  return (await res).json();
}
export default async function DetailCari({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  return (
    <div>
      <p>Detail user: {params.slug}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
