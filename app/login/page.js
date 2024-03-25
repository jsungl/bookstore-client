"use client"

export default function Login() {

    function onSubmitButtonClickHandler() {
        alert("Service not yet!");
    }

    return (
        <div className="container" style={{ height: '800px'}}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div style={{ width: '35rem' }}>
                    <form onSubmit={()=>onSubmitButtonClickHandler()}>
                        <img className="footer_logo mb-4" src="/bookstore-logo.png" alt="logo" width="57" height="57"></img>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
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