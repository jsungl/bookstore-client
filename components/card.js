"use client";

import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Card(props) {
  const {
    bookId,
    bookTitle,
    bookImageUrl,
    bookPrice,
    bookSeller,
    isRefreshRequired,
  } = props;
  const router = useRouter();
  const { user } = useGlobalContext();

  function onUpdateButtonClickHandler() {
    router.push(`/book/${bookId}/edit`, { scroll: false });
  }

  async function onDeleteButtonClickHandler() {
    if (confirm("Do you want to delete book?")) {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        isRefreshRequired();
      } else {
        alert(
          "An error occurred while processing your request. Please try again."
        );
      }
    }
  }

  const replaceImg = (e) => {
    e.target.onerror = null;
    e.target.src = "/not_exist_default.jpg";
  };

  return (
    <>
      <div className="card">
        <div
          className="d-flex justify-content-center"
          style={{ background: "#eee" }}
        >
          <Link href={`/book/${bookId}`} scroll={false}>
            <img
              src={bookImageUrl}
              className="bd-img card-img-top p-3"
              alt="book image"
              onError={replaceImg}
            />
          </Link>
        </div>
        <div className="card-body">
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "190px" }}
          >
            <div>
              <Link
                href={`/book/${bookId}`}
                className="text-decoration-none link-dark"
                scroll={false}
              >
                <h5 className="card-title">{bookTitle}</h5>
              </Link>

              <p className="card-text">${bookPrice}</p>
            </div>
            {Object.keys(user).length !== 0 ? (
              (user.id === bookSeller || user.role === "ADMIN") && (
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-light me-2"
                    style={{ borderColor: "#adb5bd" }}
                    onClick={() => onUpdateButtonClickHandler()}
                  >
                    update
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#modalId-${bookId}`}
                  >
                    delete
                  </button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id={`modalId-${bookId}`}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Book
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete{" "}
              <span className="fw-bold">{bookTitle}?</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                onClick={() => onDeleteButtonClickHandler()}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
