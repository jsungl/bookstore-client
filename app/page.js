"use client"

import Card from "@/components/card";
import PlaceHolder from "@/components/placeholder";
import { getRequest } from "@/services/bookservice";
import { useEffect, useState } from "react";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    getAllBooks();
  },[refresh])

  async function getAllBooks() {
    const allbooks = await getRequest("/books");
    setBookList(allbooks);
  }

  function isRefreshRequired() {
    setRefresh(!refresh);
  }

  return (
    <>
      {bookList.length !== 0 ?
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 my-3 g-3">
            {
              bookList.map((book,key)=>{
                return (
                  <div className="col" key={key}>
                    <Card bookId={book.bookId}
                          bookTitle={book.title}
                          bookDesc={book.description}
                          bookImageUrl={book.imageUrl}
                          bookPrice={book.price}
                          isRefreshRequired={isRefreshRequired}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        :
        <div className="container empty">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div><i className="bi bi-exclamation-circle"></i></div>
            <div className="ms-2">No Books</div>
          </div>
        </div>
      }
    </>
  );
}
