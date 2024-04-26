"use client";

import Card from "@/components/card";
import Loading from "@/components/loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [bookList, setBookList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("query");

  useEffect(() => {
    setLoading(false);
  }, []);

  async function findBooks() {
    const response = await fetch(
      `http://localhost:8081/api/books?query=${keyword}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.success) {
      const data = result.data.books;
      setBookList(data);
    } else {
      setIsError(true);
      setMessage(result.data.error.errorMessage);
    }
    setIsFetch(true);
  }

  useEffect(() => {
    findBooks();
  }, [refresh, keyword]);

  function isRefreshRequired() {
    setRefresh(!refresh);
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        {isError ? (
          <div>
            <div className="alert alert-danger" role="alert">
              <h4>An error occurred while processing your request.</h4>
              <h6>error message: {message}</h6>
            </div>
          </div>
        ) : bookList.length === 0 ? (
          isFetch && (
            <div className="container h-100">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                  <i className="bi bi-exclamation-circle"></i>
                </div>
                <div className="ms-2">No Books</div>
              </div>
            </div>
          )
        ) : (
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 my-3 g-3">
            {bookList.map((book, key) => {
              return (
                <div className="col" key={key}>
                  <Card
                    bookId={book.bookId}
                    bookTitle={book.title}
                    bookImageUrl={book.imageUrl}
                    bookPrice={book.price}
                    bookSeller={book.sellerId}
                    isRefreshRequired={isRefreshRequired}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
