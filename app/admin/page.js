"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Loading from "@/components/loading";
import { useGlobalContext } from "../context/store";

export default function Admin() {
  const [member, setMember] = useState({
    id: "",
    username: "",
    email: "",
    nickname: "",
    role: "",
  });
  const [memberList, setMemberList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const router = useRouter();
  const { setUser } = useGlobalContext();

  async function fetchUser() {
    const response = await fetch("/api/members/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!result.success) {
      alert(
        "You are not authorized to view this page. Please log in to continue."
      );
      setUser({});
      router.replace("/", { scroll: false });
    } else {
      if (result.data.member.role !== "ADMIN") {
        alert(
          "You do not have permission to access this page. Please log in and try again."
        );
        router.push("/", { scroll: false });
      } else {
        setMember(result.data.member);
        setIsFetch(true);
      }
    }
  }

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);

  async function onMemberListButtonHandler() {
    if (!clicked) {
      const response = await fetch("/api/members", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setMemberList(result.data.members);
      } else {
        let error = result.data.error;
        setIsError(true);
        setMessage(error.errorMessage);
      }
    }

    setClicked(!clicked);
  }

  const handleHideAlert = () => {
    setIsError(false);
  };

  if (loading) {
    // return <Loading />;
    return <div className="container"></div>;
  } else {
    return (
      <>
        <div className="container">
          {isError && (
            <div>
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <h4>An error occurred while processing your request.</h4>
                <h6>error message: {message}</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleHideAlert}
                ></button>
              </div>
            </div>
          )}
          {isFetch && (
            <>
              <h3 className="text-center mt-5">Admin Page</h3>
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
                onClick={() => onMemberListButtonHandler()}
              >
                Member List
              </button>
              {clicked && (
                <div>
                  <h5 className="mt-5">Registered Member List</h5>
                  {memberList.length === 0 ? (
                    <div>
                      <span>No Members</span>
                    </div>
                  ) : (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">ID</th>
                          <th scope="col">Email</th>
                          <th scope="col">Nickname</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {memberList.map((member, key) => {
                          return (
                            <tr key={key}>
                              <th scope="row">{member.id}</th>
                              <td>{member.username}</td>
                              <td>{member.email}</td>
                              <td>{member.nickname}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}
