"use client"

import { getRequest } from "@/services/bookservice";
import { useEffect, useState } from "react";

export default function Book(props) {
    const bookId = props.params.id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getBookById();
    },[])

    async function getBookById() {
        const book = await getRequest("/book/" + bookId);
        setTitle(book.title);
        setDescription(book.description);
        setImageUrl(book.imageUrl);
        setPrice(book.price);
    }

    function onAddCartButtonClickHandler() {
        alert("Service not yet!");
    }

    function onBuyButtonClickHandler() {
        alert("Service not yet!");
    }


    return (
        <div className="container">
            <h3 className="text-center my-5">Book Information</h3>
            <div className="d-flex flex-column mb-3">
                <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1">
                    <div className="col-lg-4 col-md-12">
                        <div className="d-flex justify-content-center">
                            <img src={imageUrl} className="bd-img" alt="book image"/>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="p-1 fs-4 border-bottom">
                            <p>{title}</p>
                        </div>
                        <div className="p-1"><p>{description}</p></div>
                        <div className="d-flex flex-column mt-5 p-1" style={{ width: '15rem' }}>
                            <div>
                                <h5>Total: ${price}</h5>
                            </div>
                            <select className="form-select" aria-label="Default select example" defaultValue={0}>
                                <option value={0}>Quantity</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                            <div className="mt-2">
                                <button type="button" className="btn btn-primary me-3" style={{ background: '#FFD814',borderColor:'#FCD200'}}
                                        onClick={()=>onAddCartButtonClickHandler()}>Add to Cart</button>
                                <button type="button" className="btn btn-primary" style={{ background: '#FFA41C',borderColor:'#FF8F00'}}
                                        onClick={()=>onBuyButtonClickHandler()}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-5"/>
                <div className="container empty">
                    <div>
                        <h5>Descrition</h5>
                        <div>{description}</div>
                    </div>
                    
                </div>
            </div>
            
            
        </div>
    )
}