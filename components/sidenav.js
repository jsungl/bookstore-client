'use client'

import { useGlobalContext } from "@/app/context/store";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function SideNav({hasToken}) {
    const pathname = usePathname();
    const { user, setUser } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
      //console.log(hasToken);
      if(hasToken && Object.keys(user).length == 0) {
        fetchUser();
      }
      setLoading(false);
    },[]);

    async function fetchUser() {
      console.log("내 정보 요청!");
      const response = await fetch("http://localhost:8081/api/members/me", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json' 
        }
      });

      const result = await response.json();
      //console.log(result);
      if(result.success) {
        setUser(result.data.member);
      }

    }

    async function onLogoutButtonClickHandler() {
      if(confirm("Do you want to logout?")){

        const response = await fetch("http://localhost:8081/api/members/logout", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json' 
          }
        });
        const result = await response.json();
        if(result.success) {
          setUser({});
          router.replace("/");
        }
      }
    }


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
            {
              loading ? <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100"></ul> :
                
                Object.keys(user).length !== 0 ?
                <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100">
                  <div>
                    <span className="text-white px-2">hello, {user.nickname}</span>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={()=>onLogoutButtonClickHandler()}>logout</button>
                  </div>
                  <hr className="border border-1 w-100"/>
                  <li className="nav-item">
                    <Link href="/addbook" className={pathname === '/addbook' ? 'nav-link active' : 'nav-link'}>Add Book</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/mypage" className={pathname === '/mypage' ? 'nav-link active' : 'nav-link'}>MyPage</Link>
                  </li>
                </ul>
                :
                <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0 w-100">
                  <li className="nav-item">
                    <Link href="/register" className={pathname === '/register' ? 'nav-link active' : 'nav-link'}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/login" className={pathname === '/login' ? 'nav-link active' : 'nav-link'}>Login</Link>
                  </li>
                </ul>
            }
      
          </div>
          
        </div>
        
        </nav>
    )
}