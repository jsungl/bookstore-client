"use client";

// import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Book() {
  const params = useParams();
  const [book, setBook] = useState({});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);

  async function fetchBook() {
    const res = await fetch(`/api/books/${params.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (!result.success) {
      setIsError(true);
      setMessage(result.data.error.errorMessage);
    } else {
      setBook(result.data.book);
    }
    setIsFetch(true);
  }

  useEffect(() => {
    fetchBook();
    setLoading(false);
  }, []);

  function onAddCartButtonClickHandler() {
    alert("Service not yet!");
  }

  function onBuyButtonClickHandler() {
    alert("Service not yet!");
  }

  const replaceImg = (e) => {
    e.target.onerror = null;
    e.target.src = "/not_exist_default.jpg";
  };

  if (loading) {
    // return <Loading />;
    return <div className="container"></div>;
  } else {
    return (
      <>
        {isError ? (
          <div className="container">
            <div className="alert alert-danger" role="alert">
              <h4>An error occurred while processing your request.</h4>
              <h6>error message: {message}</h6>
            </div>
          </div>
        ) : (
          isFetch && (
            <div className="container">
              <h3 className="text-center my-5">Book Information</h3>
              <div className="d-flex flex-column mb-3">
                <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1">
                  <div className="col-lg-4 col-md-12">
                    <div className="d-flex justify-content-center">
                      <img
                        src={book.imageUrl}
                        className="bd-img"
                        alt="book image"
                        onError={replaceImg}
                        style={{ maxWidth: "400px" }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="p-1 fs-4 border-bottom">
                      <p>{book.title}</p>
                    </div>
                    <div className="p-1">
                      <p>{book.description}</p>
                    </div>
                    <div
                      className="d-flex flex-column mt-5 p-1"
                      style={{ width: "15rem" }}
                    >
                      <div>
                        <h5>Total: ${book.price}</h5>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue={0}
                      >
                        <option value={0}>Quantity</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                      <div className="mt-2">
                        <button
                          type="button"
                          className="btn btn-primary me-3"
                          style={{
                            background: "#FFD814",
                            borderColor: "#FCD200",
                          }}
                          onClick={() => onAddCartButtonClickHandler()}
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            background: "#FFA41C",
                            borderColor: "#FF8F00",
                          }}
                          onClick={() => onBuyButtonClickHandler()}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-5" />
                {/* <div className="container empty"> */}
                <div className="container">
                  <div>
                    <h5>Description</h5>
                    <div>{book.description}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </>
    );
  }
}
