"use client"

import Card from "@/components/card";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch("http://127.0.0.1:8081/api/books",{ cache: 'no-store' })
    .then(res=>res.json())
    .then(res=>{
      setBookList(res.data.books);
      setLoading(false);
    })
  },[refresh])

  function isRefreshRequired() {
    setRefresh(!refresh);
  }

  return (
    <>
      
      <div className="container">
        { 
          loading ? <Loading/>
          :
          (bookList.length !== 0 ?
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 my-3 g-3">
                {
                  bookList.map((book,key)=>{
                    return (
                      <div className="col" key={key}>
                        <Card bookId={book.bookId}
                              bookTitle={book.title}
                              bookImageUrl={book.imageUrl}
                              bookPrice={book.price}
                              isRefreshRequired={isRefreshRequired}
                        />
                      </div>
                    )
                  })
                }
              </div>
            :
            <div className="container h-100">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div><i className="bi bi-exclamation-circle"></i></div>
                <div className="ms-2">No Books</div>
              </div>
            </div>
          )
        }
      </div>
        
    </>
  );
}
