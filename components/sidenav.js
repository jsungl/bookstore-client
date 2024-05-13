"use client";

import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function SideNav({ hasToken }) {
  const pathname = usePathname();
  const { user, setUser } = useGlobalContext();
  const [loading, setLoading] = useState(true);
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
      setUser(result.data.member);
    } else {
      setUser({});
      router.push("/", { scroll: false });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (hasToken && Object.keys(user).length === 0) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function onLogoutButtonHandler() {
    if (confirm("Do you want to logout?")) {
      const response = await fetch("/api/members/logout", {
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
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark align-items-start">
      <div className="container-fluid">
        <div className="logo_brand d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center justify-content-center">
            <Link href="/" scroll={false}>
              <img src="/bookstore-removebg-logo.png" alt="logo"></img>
            </Link>
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse w-100"
          id="navbarSupportedContent"
        >
          <hr className="border border-1 w-100" />
          {Object.keys(user).length !== 0 ? (
            <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100">
              <div>
                <span className="text-white px-2">hello, {user.nickname}</span>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => onLogoutButtonHandler()}
                >
                  logout
                </button>
              </div>
              <hr className="border border-1 w-100" />
              <li className="nav-item">
                <Link
                  href="/addbook"
                  className={
                    pathname === "/addbook" ? "nav-link active" : "nav-link"
                  }
                  scroll={false}
                >
                  Add Book
                </Link>
              </li>
              {user.role === "ADMIN" ? (
                <li className="nav-item">
                  <Link
                    href="/admin"
                    className={
                      pathname === "/admin" ? "nav-link active" : "nav-link"
                    }
                    scroll={false}
                  >
                    Admin Page
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href="/mypage"
                    className={
                      pathname.startsWith("/mypage")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    scroll={false}
                  >
                    MyPage
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <Link
                  href="/register"
                  className={
                    pathname === "/register" ? "nav-link active" : "nav-link"
                  }
                  scroll={false}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/login"
                  className={
                    pathname === "/login" ? "nav-link active" : "nav-link"
                  }
                  scroll={false}
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
