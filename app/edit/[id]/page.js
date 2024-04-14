"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
    const params = useParams();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [errorField, setErrorField] = useState({});

    useEffect(()=>{
        fetch(`http://127.0.0.1:8081/api/books/${params.id}`,{ 
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            setTitle(res.data.book.title);
            setDescription(res.data.book.description);
            setImageUrl(res.data.book.imageUrl);
            setPrice(res.data.book.price);
        })
    },[])


    async function onSubmitHandler(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            imageUrl,
            price
        }

        const response = await fetch(`http://127.0.0.1:8081/api/books/${params.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        // if(response.ok) {
        //     alert("update success");
        //     router.push("/");
        // }

        const result = await response.json();

        if(!result.success) {
            let error = result.data.error;
            setAlert(true);
            setMessage(error.errorMessage);
            setErrorField(error.errorField);
        } else {
            router.push("/");
        }
        
    }

    return (
        
        <div className="container">
            {
                alert && 
                (<div>
                    <div className="alert alert-danger" role="alert">
                        <h4>수정실패</h4>
                        <h6>에러 메시지: {message}</h6>
                    </div>
                </div>)
            }
            
            <h3 className="text-center mt-5">Update Book</h3>
            <div className="mt-5">
                <form onSubmit={(e)=>{onSubmitHandler(e)}}>
                    <div className="mb-3">
                        <label htmlFor="bookTitle" className="form-label">Book Title</label>
                        <input type="text" className={alert && errorField.title ? 'form-control is-invalid' : 'form-control'} id="bookTitle" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <div className={errorField.title ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.title}
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="bookDescription" className="form-label">Description</label>
                        <textarea className={alert && errorField.description ? 'form-control is-invalid' : 'form-control'} id="bookDescription" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        <div className={errorField.description ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.description}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bookImageUrl" className="form-label">Book Image URL</label>
                        <input type="text" className={alert && errorField.imageUrl ? 'form-control is-invalid' : 'form-control'} id="bookImageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                        <div className={errorField.imageUrl ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.imageUrl}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bookPrice" className="form-label">Book Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="number" className={alert && errorField.price ? 'form-control is-invalid' : 'form-control'} id="bookPrice" value={price} onChange={(e)=>setPrice(e.target.value)} aria-label="Amount (to the nearest dollar)" />
                        </div>
                        <div className={errorField.price ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.price}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Save</button>
                </form>
            </div>
        </div>
            
    )
}