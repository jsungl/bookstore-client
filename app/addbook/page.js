"use client"

import { postRequest } from "@/services/bookservice";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function AddBook() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);
    const router = useRouter();

    async function onSubmitHandler(e) {
        e.preventDefault();
        const book = {
            title,
            description,
            imageUrl,
            price
        }
        
        await postRequest("/addBook", book);
        router.push("/");
    }

    return (
        <div className="container empty">
            <h3 className="text-center mt-5">Add Book</h3>
            <div className="mt-5">
                <form onSubmit={(e)=>{onSubmitHandler(e)}}>
                    <div className="mb-3">
                        <label htmlFor="bookTitle" className="form-label">Book Title</label>
                        <input type="text" className="form-control" id="bookTitle" value={title} onChange={(e)=>setTitle(e.target.value)}/>
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

                    <button type="submit" className="btn btn-outline-primary">Register</button>
                </form>
            </div>
        </div>
    )
}