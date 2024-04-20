"use client";

import Loading from "@/components/loading";
import { useGlobalContext } from "../context/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { loading, setLoading } = useGlobalContext();
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
  const router = useRouter();

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
    if (!result.success || result.data.member.role !== "ADMIN") {
      alert("권한이 없습니다.");
      router.replace("/");
    } else {
      setMember(result.data.member);
      setLoading(false);
    }
  }

  async function onButtonClickHandler() {
    if (!clicked) {
      const response = await fetch("http://localhost:8081/api/members", {
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

  return (
    <>
      {loading === true && <Loading />}
      <div className="container">
        {isError && (
          <div>
            <div className="alert alert-danger" role="alert">
              <h4>회원 목록 조회 실패</h4>
              <h6>에러 메시지: {message}</h6>
            </div>
          </div>
        )}
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
          onClick={() => onButtonClickHandler()}
        >
          Member List
        </button>
        {clicked && (
          <div>
            <h5 className="mt-5">Registered Member List</h5>
            {memberList.length === 0 ? (
              loading === false && (
                <div>
                  <span>No Members</span>
                </div>
              )
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
      </div>
    </>
  );
}
