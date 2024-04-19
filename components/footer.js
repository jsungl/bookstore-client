"use client"

import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";

export default function Footer() {
    const { user } = useGlobalContext();

    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <Link href="/" className="me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                <img className="footer_logo" src="/bookstore-logo.png" alt="logo" width="24" height="24"></img>
                </Link>
                <span className="mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
            </div>

            <ul className="nav col-md-4 justify-content-end">
                {Object.keys(user).length !== 0 ?
                <>
                    <li className="nav-item"><Link href="/addbook" className="nav-link px-2 text-body-secondary">Add Book</Link></li>
                    <li className="nav-item"><Link href="/mypage" className="nav-link px-2 text-body-secondary">MyPage</Link></li>
                </>
                :
                <>
                    <li className="nav-item"><Link href="/register" className="nav-link px-2 text-body-secondary">Register</Link></li>
                    <li className="nav-item"><Link href="/login" className="nav-link px-2 text-body-secondary">Login</Link></li>
                </>
                }
            </ul>
            </footer>
        </div>
    )
}