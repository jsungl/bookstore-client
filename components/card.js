import Link from "next/link";

export default function Card(props) {
    const {bookTitle, bookImageUrl, bookDesc, bookPrice} = props;

    return (
        <div className="card">
            <div className="d-flex justify-content-center" style={{ background: '#eee' }}>
                <Link href="#">
                    <img src={bookImageUrl} className="bd-img card-img-top p-3" alt="book image"/>
                </Link>
            </div>
            <div className="card-body">
                <div className="d-flex flex-column justify-content-between" style={{ height:'190px'}}>
                    <div>
                        <Link href="#" className="text-decoration-none link-dark">
                            <h5 className="card-title">
                                {bookTitle}
                            </h5>
                        </Link>
                        
                        <p className="card-text">
                            ${bookPrice}
                        </p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link href="#" className="btn btn-sm btn-light me-2" style={{ borderColor:'#adb5bd' }}>update</Link>
                        <Link href="#" className="btn btn-sm btn-danger">delete</Link>
                    </div>
                </div>
            </div>
                
        </div>
    )
}