import Link from "next/link";

export default function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <Link href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                <img className="footer_logo" src="/bookstore-logo.png" alt="logo" width="24" height="24"></img>
                </Link>
                <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
            </div>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><Link href="/addBook" className="nav-link px-2 text-body-secondary">Add Book</Link></li>
                <li className="nav-item"><Link href="/login" className="nav-link px-2 text-body-secondary">Login</Link></li>
            </ul>
            </footer>
        </div>
    )
}