"use client";

import { useGlobalContext } from "@/app/context/store";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaveUs() {
  const [passwordForm, setPasswordForm] = useState({ password: "" });
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
    } else {
      setIsFetch(true);
    }
  }

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);

  async function onSubmitButtonClickHandler(e) {
    e.preventDefault();

    if (confirm("Do you want to delete account?")) {
      const response = await fetch("/api/members/leave", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      const result = await response.json();
      if (result.success) {
        setUser({});
        router.push("/", { scroll: false });
      } else {
        let error = result.data.error;
        setIsError(true);
        setMessage(error.errorMessage);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleHideAlert = () => {
    setIsError(false);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="container h-100">
        {isError && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h4>An error occurred while processing your request.</h4>
            <h6>error message: {message}</h6>
            <button
              type="button"
              className="btn-close"
              onClick={handleHideAlert}
            ></button>
          </div>
        )}
        {isFetch && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div style={{ width: "35rem" }}>
              <form onSubmit={(e) => onSubmitButtonClickHandler(e)}>
                <img
                  className="footer_logo mb-4"
                  src="/bookstore-logo.png"
                  alt="logo"
                  width="57"
                  height="57"
                ></img>
                <h1 className="h3 mb-3 fw-normal">Leave Us</h1>
                <div>
                  <p className="invalid-feedback d-block">
                    You must enter a password to delete account.
                  </p>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className={
                      isError ? "form-control is-invalid" : "form-control"
                    }
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={passwordForm.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 my-3"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
