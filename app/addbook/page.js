"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function AddBook() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [errorField, setErrorField] = useState({});

    const router = useRouter();

    async function onSubmitHandler(e) {
        e.preventDefault();

        const book = {
            title,
            description,
            imageUrl,
            price
        }
        
        const response = await fetch("http://127.0.0.1:8081/api/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });

        const result = await response.json();
        console.log(result);

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
        // <div className="container empty">
        <div className="container">
            {
                alert && 
                (<div>
                    {/* <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <h4>등록실패</h4>
                        <h6>에러 메시지: {message}</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> */}
                    <div className="alert alert-danger" role="alert">
                        <h4>등록실패</h4>
                        <h6>에러 메시지: {message}</h6>
                    </div>
                </div>)
            }    
            <h3 className="text-center mt-5">Add Book</h3>
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
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className={alert && errorField.description ? 'form-control is-invalid' : 'form-control'} id="description" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
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

                    <button type="submit" className="btn btn-outline-primary">Register</button>
                </form>
            </div>
        </div>
    )
}