"use client"

import Card from "@/components/card";
import Loading from "@/components/loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";

export default function Search() {

    const [bookList, setBookList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const {loading, setLoading} = useGlobalContext();

    const searchParams = useSearchParams();
    const keyword = searchParams.get('query');

    useEffect(()=>{
        findBooks();
    },[refresh, keyword])

    async function findBooks() {
        const response = await fetch(`http://localhost:8081/api/books?query=${keyword}`,{ 
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            } 
        });
        const result = await response.json();

        if(result.success) {
            const data = result.data.books;
            setBookList(data);
            setLoading(false);
        } else {
            setIsError(true);
            setMessage(result.data.error.errorMessage);
        }
        
    }


    function isRefreshRequired() {
        setRefresh(!refresh);
    }


    return (
        <>
            {loading === true && <Loading/>}
            <div className="container">
                { 
                    isError ?
                    <div>    
                        <div className="alert alert-danger" role="alert">
                            <h4>요청실패</h4>
                            <h6>에러 메시지: {message}</h6>
                        </div>
                    </div>
                    :
                    (bookList.length === 0 ?
                        loading === false &&
                        <div className="container h-100">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div><i className="bi bi-exclamation-circle"></i></div>
                                <div className="ms-2">No Books</div>
                            </div>
                        </div>
                    :
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
                    )    
                }
            </div>
        </>
    )
}