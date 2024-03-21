import { deleteRequest } from "@/services/bookservice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Card(props) {
    const {bookId, bookTitle, bookImageUrl, bookDesc, bookPrice, isRefreshRequired} = props;
    const router = useRouter();

    function onUpdateButtonClickHandler() {
        router.push("/update?bookId=" + bookId);
    }

    async function onDeleteButtonClickHandler() {
        await deleteRequest("/deleteBook/" + bookId);
        isRefreshRequired();
    }

    return (
        <>
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
                            <button type="button" className="btn btn-sm btn-light me-2" style={{ borderColor:'#adb5bd' }} onClick={()=>onUpdateButtonClickHandler()}>update</button>
                            <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#modalId-${bookId}`}>delete</button>
                        </div>
                    </div>
                </div>
                    
            </div>

            {/* Modal */}
            <div className="modal fade" id={`modalId-${bookId}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Book</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Are you sure you want to delete <span className="fw-bold">{bookTitle}?</span>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>onDeleteButtonClickHandler()}>Yes</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                </div>
            </div>
            </div>
        </div>
      </>
    )
}