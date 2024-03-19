"use client"

import Card from "@/components/card";
import { getRequest } from "@/services/bookservice";
import { useEffect, useState } from "react";

export default function Home() {
  const [bookList, setBookList] = useState([]);

  useEffect(()=>{
    getAllBooks();
  },[])

  async function getAllBooks() {
    const allbooks = await getRequest("https://picsum.photos/v2/list");
    setBookList(allbooks);
  }

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 my-3 g-3">
          {
            bookList.map((book,key)=>{
              return (
                <div className="col" key={key}>
                  <Card bookTitle={book.author} bookImageUrl={book.download_url}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
