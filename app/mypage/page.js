"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Loading from "@/components/loading";
import { useGlobalContext } from "../context/store";

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
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useGlobalContext();
  const router = useRouter();

  async function fetchUser() {
    const response = await fetch("/api/members/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.success) {
      setMember(result.data.member);
      setIsFetch(true);
    } else {
      let error = result.data.error;
      if (error.errorCode === "E4011") {
        alert(
          "You are not authorized to view this page. Please log in to continue."
        );
        router.replace("/", { scroll: false });
      } else if (
        error.errorCode !== "E4011" &&
        error.errorCode.startsWith("E401")
      ) {
        alert(
          "You do not have permission to access this page. Please log in and try again."
        );
        setUser({});
        router.push("/", { scroll: false });
      }
      setIsError(true);
      setMessage(error.errorMessage);
    }
  }

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);

  function onFetchButtonHandler() {
    setBookList(member.books);
    setClicked(!clicked);
  }

  function onDeleteButtonHandler() {
    router.push("/mypage/leave-us", { scroll: false });
  }

  if (loading) {
    // return <Loading />;
    return <div className="container"></div>;
  } else {
    return (
      <>
        {isError ? (
          <div className="container">
            <div className="alert alert-danger" role="alert">
              <h4>An error occurred while processing your request.</h4>
              <h6>error message: {message}</h6>
            </div>
          </div>
        ) : (
          isFetch && (
            <div className="container">
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
                className="btn btn-outline-secondary me-2"
                onClick={() => onFetchButtonHandler()}
              >
                My Book
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDeleteButtonHandler()}
              >
                Delete Account
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
                            <Link href={`/book/${book.bookId}`}>
                              {book.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </>
    );
  }
}
