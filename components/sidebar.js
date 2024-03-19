'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SideBar() {

    const pathname = usePathname()

    useEffect(()=>{
        console.log(pathname)
    },[])

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark align-items-start">
        <div className="container-fluid">
          <div className="logo_brand d-flex align-items-center justify-content-between">
              <div className="logo d-flex align-items-center justify-content-center">
                  <Link href="/">
                      <img src="/bookstore-removebg-logo.png" alt="logo"></img>
                  </Link>
              </div>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <hr className="border border-1 w-100"/>
            <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <Link href="/addbook" className="nav-link active">Add Book</Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
    )
}