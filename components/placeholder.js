
export default function PlaceHolder() {
    return (
        <div className="card" style={{width: '20rem'}}>
            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" 
                preserveAspectRatio="xMidYMid slice" focusable="false" style={{height:'20rem'}}>
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
                <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
            </svg>
            <div className="card-body">
            <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
            </p>
            <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
            </div>
        </div>
    )
}