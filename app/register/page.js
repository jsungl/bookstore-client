"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

    const [memberForm, setMemberForm] = useState({memberId: '', email: '', password: '', rePassword: '', nickname: ''});
    const [matchError, setMatchError] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [errorField, setErrorField] = useState({});
    const router = useRouter();

    async function onSubmitHandler(e) {
        e.preventDefault();

        if(memberForm.password != memberForm.rePassword) {
            setMatchError(true);
            return
        }

        const data = {
            "memberId": memberForm.memberId,
            "email": memberForm.email,
            "password" : memberForm.password,
            "nickname": memberForm.nickname
        }

        const response = await fetch("http://127.0.0.1:8081/api/members/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(!result.success) {
            let error = result.data.error;
            setIsError(true);
            setMessage(error.errorMessage);
            setErrorField(error.errorField);

        } else {
            alert("register success!");
            router.push("/");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberForm({ ...memberForm, [name]: value });
        //console.log({ ...memberForm, [name]: value });
    }

    return (
        <div className="container">
            {
                isError && 
                (<div>
                    <div className="alert alert-danger" role="alert">
                        <h4>회원가입 실패</h4>
                        <h6>에러 메시지: {message}</h6>
                    </div>
                </div>)
            }     
            <h3 className="text-center mt-5">Sign Up</h3>
            <div className="mt-5">
                <form onSubmit={(e)=>{onSubmitHandler(e)}}>
                    <div className="mb-3">
                        <label htmlFor="memberId" className="form-label">ID</label>
                        <input type="text" className={isError && (errorField || errorField.memberId)? 'form-control is-invalid' : 'form-control'} id="memberId" 
                        name="memberId" value={memberForm.memberId} onChange={handleChange}/>
                        <div className={errorField.memberId ? 'form-text d-none' : 'form-text'}>
                            Must be 4 to 12 characters using only English lowercase letters and numbers.
                        </div>
                        <div className={errorField.memberId ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.memberId}
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="memberEmail" className="form-label">Email</label>
                        <input type="email" className={isError && (errorField || errorField.email) ? 'form-control is-invalid' : 'form-control'} id="memberEmail" 
                        name="email" value={memberForm.email} onChange={handleChange}/>
                        <div className={errorField.email ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.email}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="memberPassword" className="form-label">Password</label>
                        <input type="password" className={isError && errorField.password ? 'form-control is-invalid' : 'form-control'} id="memberPassword" 
                        name="password" value={memberForm.password} onChange={handleChange}/>
                        <div className={errorField.password ? 'form-text d-none' : 'form-text'}>
                            Must be 8 to 12 characters, including at least one English case, number, and special character.
                        </div>
                        <div className={errorField.password ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.password}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="memberRePassword" className="form-label">RePassword</label>
                        <input type="password" className={matchError ? 'form-control is-invalid' : 'form-control'} id="memberRePassword" name="rePassword" value={memberForm.rePassword} onChange={handleChange}/>
                        <div className={matchError ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            Password does not match.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="memberNickname" className="form-label">Nickname</label>
                        <input type="text" className={isError && (errorField || errorField.nickname) ? 'form-control is-invalid' : 'form-control'} id="memberNickname" 
                        name="nickname" value={memberForm.nickname} onChange={handleChange}/>
                        <div className={errorField.nickname ? 'form-text d-none' : 'form-text'}>
                            Must be 2 to 8 characters without special characters.
                        </div>
                        <div className={errorField.nickname ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                            {errorField.nickname}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Register</button>
                </form>
            </div>
        </div>
    )
}