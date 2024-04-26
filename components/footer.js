"use client";

import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const onLogoutButtonHandler = async () => {
    if (confirm("Do you want to logout?")) {
      const response = await fetch("http://localhost:8081/api/members/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setUser({});
        router.replace("/", { scroll: false });
      }
    }
  };

  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            href="/"
            className="me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img
              className="footer_logo"
              src="/bookstore-logo.png"
              alt="logo"
              width="24"
              height="24"
            ></img>
          </Link>
          <span className="mb-md-0 text-body-secondary">
            &copy; 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end">
          {Object.keys(user).length !== 0 ? (
            <>
              <li className="nav-item me-2">
                <Link
                  href="/addbook"
                  className="nav-link px-2 text-body-secondary"
                >
                  Add Book
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  href="/mypage"
                  className="nav-link px-2 text-body-secondary"
                >
                  MyPage
                </Link>
              </li>
              <li className="nav-item ms-2">
                <button
                  type="button"
                  className="btn btn-link text-body-secondary text-decoration-none p-2"
                  onClick={onLogoutButtonHandler}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  href="/register"
                  className="nav-link px-2 text-body-secondary"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/login"
                  className="nav-link px-2 text-body-secondary"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </footer>
    </div>
  );
}
