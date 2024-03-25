"use client"

import { getRequest, putRequest } from "@/services/bookservice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId');

    useEffect(() => {
        getBookById();
    },[])


    async function getBookById() {
        const book = await getRequest("/book/"+bookId);
        setTitle(book.title);
        setDescription(book.description);
        setImageUrl(book.imageUrl);
        setPrice(book.price);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        const book = {
            title,
            description,
            imageUrl,
            price
        }
        
        await putRequest("/update?bookId="+bookId, book);
        //router.push("/");
        router.back();
    }

    return (
        <div className="container empty">
            <h3 className="text-center mt-5">Update Book</h3>
            <div className="mt-5">
                <form onSubmit={(e)=>{onSubmitHandler(e)}}>
                    <div className="mb-3">
                        <label htmlFor="bookTitle" className="form-label">Book Title</label>
                        <input type="text" className="form-control" id="bookTitle" value={title} onChange={(e)=>setTItle(e.target.value)}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="bookDescription" className="form-label">Description</label>
                        <textarea className="form-control" id="bookDescription" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bookImageUrl" className="form-label">Book Image URL</label>
                        <input type="text" className="form-control" id="bookImageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bookPrice" className="form-label">Book Price</label>
                        <input type="number" className="form-control" id="bookPrice" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Save</button>
                </form>
            </div>
        </div>
    )
}