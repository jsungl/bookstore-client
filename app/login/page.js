"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGlobalContext } from "../context/store";


export default function Page() {

    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [errorField, setErrorField] = useState({});
    const router = useRouter();

    const { setUser } = useGlobalContext();
    

    async function onSubmitButtonClickHandler(e) {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8081/api/members/login", {
            method: 'POST',
            credentials: 'include', // 핵심 변경점
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loginForm)
        })

        const result = await response.json();

        if(!result.success) {
            let error = result.data.error;
            setIsError(true);
            setMessage(error.errorMessage);
            setErrorField(error.errorField);

        } else {
            alert("login success!");
            setUser(result.data.member);
            router.replace("/");
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]:value});
    }

    return (
        <div className="container h-100">
            {
                isError && 
                (<div>
                    <div className="alert alert-danger" role="alert">
                        <h4>로그인 실패</h4>
                        <h6>에러 메시지: {message}</h6>
                    </div>
                </div>)
            }   
            <div className="d-flex justify-content-center align-items-center h-100">
                <div style={{ width: '35rem' }}>
                    <form onSubmit={(e)=>onSubmitButtonClickHandler(e)}>
                        <img className="footer_logo mb-4" src="/bookstore-logo.png" alt="logo" width="57" height="57"></img>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            {/* <input type="text" className="form-control" id="username" name="username" placeholder="ID" value={user.username} onChange={handleChange}/> */}
                            <input type="text" className={isError && (errorField || errorField.username)? 'form-control is-invalid' : 'form-control'} 
                            id="username" name="username" placeholder="ID" value={loginForm.username} onChange={handleChange}/>
                            <div className={errorField.username ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                                {errorField.username}
                            </div>
                            <label htmlFor="floatingInput">ID</label>
                        </div>
                        <div className="form-floating">
                            {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={user.password} onChange={handleChange}/> */}
                            <input type="password" className={isError && (errorField || errorField.password)? 'form-control is-invalid' : 'form-control'} 
                            id="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleChange}/>
                            <div className={errorField.password ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                                {errorField.password}
                            </div>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="form-check text-start my-3">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}