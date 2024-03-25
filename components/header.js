"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {

    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    function onSubmitHandler(e) {
        e.preventDefault();
        router.push("/search?keyword=" + keyword);
    }

    return (
        <div className="container">
            <form className="d-flex" onSubmit={(e)=>{onSubmitHandler(e)}}>
                <input className="form-control me-2" type="text" placeholder="Search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}