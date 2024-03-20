"use client"

import Card from "@/components/card";
import PlaceHolder from "@/components/placeholder";
import { getRequest } from "@/services/bookservice";
import { useEffect, useState } from "react";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(()=>{
    getAllBooks();
  },[])

  async function getAllBooks() {
    const allbooks = await getRequest("/books");
    setBookList(allbooks);
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
                    <Card bookTitle={book.title} 
                          bookDesc={book.description}
                          bookImageUrl={book.imageUrl}
                          bookPrice={book.price}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        :
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 my-3 g-3">
            {
              numbers.map((key)=>{
                return (
                  <div className="col" key={key}>
                    <PlaceHolder/>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </>
  );
}
