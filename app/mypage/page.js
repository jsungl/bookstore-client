"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/store";
import Loading from "@/components/loading";


export default function MyPage() {
    // const { user } = useGlobalContext();
    const [member, setMember] = useState({id:'', nickname:''});
    const [bookList, setBookList] = useState([]);
    const [clicked, setClicked] = useState(false);
    const {loading, setLoading} = useGlobalContext();

    useEffect(()=>{
        fetchUser();
    },[])

    async function fetchUser() {
        const response = await fetch("http://localhost:8081/api/members/me", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json' 
          }
        });
  
        const result = await response.json();
        if(result.success) {
        //   setUser(result.data.member);
          setMember(result.data.member);
          setLoading(false);
        }
  
    }

    function onButtonClickHandler() {
        setBookList(member.books);
        setClicked(!clicked);
    }

    return (
        <>
        {loading === true && <Loading/>}
        <div className="container">
            <h3 className="text-center mt-5">My Page</h3>
            <div className="mb-3">
                <label htmlFor="memberId" className="form-label">ID</label>
                <input type="text" className="form-control" id="memberId" value={member.id} readOnly></input>
            </div>
            <div className="mb-3">
                <label htmlFor="memberNickname" className="form-label">Nickname</label>
                <input type="text" className="form-control" id="memberNickname" value={member.nickname} readOnly></input>
            </div>
        

            <button type="button" className="btn btn-secondary" onClick={()=>onButtonClickHandler()}>My Book</button>
            {clicked && 
                <div>
                    <h5 className="mt-5">Registered Book List</h5>
                    {bookList.length === 0 ? loading === false && <div><span>No books</span></div> :
                    <ol className="list-group list-group-numbered">
                        {bookList.map((book,key)=>{
                            return (
                                <li className="list-group-item" key={key}>
                                    <Link href={`/book/${book.bookId}`}>{book.title}</Link>
                                </li>
                            )
                        })
                        }
                    </ol>
                    }
                </div>
            }
            
        </div>
        </>

    )
}