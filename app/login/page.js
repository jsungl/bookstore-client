"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
// import Loading from "@/components/loading";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const router = useRouter();

  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    if (user) {
      setUser({});
    }
    setLoading(false);
  }, []);

  async function onSubmitButtonHandler(e) {
    e.preventDefault();

    const response = await fetch("/api/members/login", {
      method: "POST",
      credentials: "include", // 핵심 변경점
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    const result = await response.json();

    if (!result.success) {
      let error = result.data.error;
      //console.log(error);
      setIsError(true);
      setMessage(error.errorMessage);
      setErrorField(error.errorField);
    } else {
      alert("login success!");
      setUser(result.data.member);
      router.replace("/", { scroll: false });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleHideAlert = () => {
    setIsError(false);
  };

  if (loading) {
    // return <Loading />;
    return <div className="container"></div>;
  } else {
    return (
      <div className="container h-100">
        {isError && (
          <div>
            <div className="alert alert-danger alert-dismissible" role="alert">
              <h4>Login Failed.</h4>
              <h6>error message: {message}</h6>
              <button
                type="button"
                className="btn-close"
                onClick={handleHideAlert}
              ></button>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center h-100">
          <div style={{ width: "35rem" }}>
            <form onSubmit={(e) => onSubmitButtonHandler(e)}>
              <img
                className="footer_logo mb-4"
                src="/bookstore-logo.png"
                alt="logo"
                width="57"
                height="57"
              ></img>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

              <div className="form-floating">
                {/* <input type="text" className="form-control" id="username" name="username" placeholder="ID" value={user.username} onChange={handleChange}/> */}
                <input
                  type="text"
                  className={
                    isError && errorField === "username"
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="username"
                  name="username"
                  placeholder="ID"
                  value={loginForm.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="username">ID</label>
              </div>
              <div className="form-floating">
                {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={user.password} onChange={handleChange}/> */}
                <input
                  type="password"
                  className={
                    isError && errorField === "password"
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="remember-me"
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
