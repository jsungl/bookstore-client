"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  useEffect(() => {
    search === null ? setKeyword("") : setKeyword(search);
  }, [search]);

  function onSubmitHandler(e) {
    e.preventDefault();
    router.push("/search?query=" + keyword, { scroll: false });
  }

  return (
    <div className="container py-3">
      <form
        className="d-flex"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search by title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
