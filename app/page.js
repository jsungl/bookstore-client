"use client";

import Card from "@/components/card";
import { useEffect, useState } from "react";
// import { getCookie } from 'cookies-next';
import Loading from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    // console.log(getCookie('accessToken'));

    fetch("/api/books", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBookList(res.data.books);
        setIsFetch(true);
      });
    setLoading(false);
  }, [refresh]);

  function isRefreshRequired() {
    setRefresh(!refresh);
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="content_header d-flex align-items-center">
          <Header />
        </div>
        <div className="content_body flex-grow-1">
          <div className="container">
            {bookList.length !== 0 ? (
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
            ) : (
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
            )}
          </div>
        </div>
        <div className="content_footer">
          <Footer />
        </div>
      </>
    );
  }
}
