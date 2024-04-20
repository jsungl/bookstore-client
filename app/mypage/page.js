"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import Loading from "@/components/loading";

export default function MyPage() {
  const [member, setMember] = useState({
    id: "",
    username: "",
    email: "",
    nickname: "",
    role: "",
  });
  const [bookList, setBookList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const { loading, setLoading } = useGlobalContext();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const response = await fetch("http://localhost:8081/api/members/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      setMember(result.data.member);
      setLoading(false);
    } else {
      let error = result.data.error;
      setIsError(true);
      setMessage(error.errorMessage);
    }
  }

  function onButtonClickHandler() {
    setBookList(member.books);
    setClicked(!clicked);
  }

  return (
    <>
      {loading === true && <Loading />}
      <div className="container">
        {isError && (
          <div>
            <div className="alert alert-danger" role="alert">
              <h4>회원 조회 실패</h4>
              <h6>에러 메시지: {message}</h6>
            </div>
          </div>
        )}
        <h3 className="text-center mt-5">My Page</h3>
        <div className="mb-3">
          <label htmlFor="memberId" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="memberId"
            value={member.id}
            readOnly
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="memberUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="memberUsername"
            value={member.username}
            readOnly
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="memberEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="memberEmail"
            value={member.email}
            readOnly
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="memberNickname" className="form-label">
            Nickname
          </label>
          <input
            type="text"
            className="form-control"
            id="memberNickname"
            value={member.nickname}
            readOnly
          ></input>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onButtonClickHandler()}
        >
          My Book
        </button>
        {clicked && (
          <div>
            <h5 className="mt-5">Registered Book List</h5>
            {bookList.length === 0 ? (
              loading === false && (
                <div>
                  <span>No books</span>
                </div>
              )
            ) : (
              <ol className="list-group list-group-numbered">
                {bookList.map((book, key) => {
                  return (
                    <li className="list-group-item" key={key}>
                      <Link href={`/book/${book.bookId}`}>{book.title}</Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        )}
      </div>
    </>
  );
}
