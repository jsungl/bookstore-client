import Image from "next/image";
import styles from "./page.module.css";
import Hedaer from "./components/Header";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="position-relative">
        <Hedaer/>
        <div className="content_wrapper d-none d-md-block">
            <div className="content_header">BookStore</div>
            <div className="content_body">
              <button type="button" className="btn btn-primary">Button</button>
            </div>
            <div className="content_footer">
              footer
            </div>
        </div>
        
        <div className="mobile_wrap d-md-none">
          <nav className="navbar d-md-none bg-white fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">BookStore</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Add book</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                </ul>            
              </div>
            </div>
          </nav>
          <div className="content_header">BookStore</div>
          <div className="content_body">
            <button type="button" className="btn btn-primary">Button</button>
          </div>
          <div className="content_footer">
            footer
          </div>
        </div>
      </div>
    </div>
  );
}
