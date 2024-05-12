"use client";

// import Loading from "@/components/loading";
import getUserData from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import addForm from "./actions";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState({});
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    console.log("AddBook 렌더링");
    async function fetchUser() {
      const data = await getUserData();
      if (!data.success) {
        alert(
          "You do not have permission to access this page. Please log in and try again."
        );
        setUser({});
        router.push("/", { scroll: false });
      } else {
        setLoading(false);
      }
    }

    // if (Object.keys(user).length === 0) {
    //   fetchUser();
    // }
    fetchUser();
  }, []);

  async function onSubmitHandler(e) {
    e.preventDefault();

    const book = {
      title,
      description,
      imageUrl,
      price,
    };

    const response = await fetch("/api/books", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const result = await response.json();

    if (!result.success) {
      let error = result.data.error;
      setIsError(true);
      setMessage(error.errorMessage);
      setErrorField(error.errorField);
    } else {
      let bookId = result.data.book.bookId;
      await addForm(bookId);
      router.push("/book/" + bookId, { scroll: false });
    }
  }

  const handleHideAlert = () => {
    setIsError(false);
  };

  if (loading) {
    return <div className="container"></div>;
    // return <Loading />;
  } else {
    return (
      <>
        <div className="container">
          {isError && (
            <div className="container">
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <h4>An error occurred while processing your request.</h4>
                <h6>error message: {message}</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleHideAlert}
                ></button>
              </div>
            </div>
          )}
          <h3 className="text-center mt-5">Add Book</h3>
          <div className="mt-5">
            <form
              onSubmit={(e) => {
                onSubmitHandler(e);
              }}
            >
              <div className="mb-3">
                <label htmlFor="bookTitle" className="form-label">
                  Book Title
                </label>
                <input
                  type="text"
                  className={
                    isError && errorField.title
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="bookTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div
                  className={
                    errorField.title
                      ? "invalid-feedback d-block"
                      : "invalid-feedback"
                  }
                >
                  {errorField.title}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className={
                    isError && errorField.description
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div
                  className={
                    errorField.description
                      ? "invalid-feedback d-block"
                      : "invalid-feedback"
                  }
                >
                  {errorField.description}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="bookImageUrl" className="form-label">
                  Book Image URL
                </label>
                <input
                  type="text"
                  className={
                    isError && errorField.imageUrl
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="bookImageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <div
                  className={
                    errorField.imageUrl
                      ? "invalid-feedback d-block"
                      : "invalid-feedback"
                  }
                >
                  {errorField.imageUrl}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="bookPrice" className="form-label">
                  Book Price
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className={
                      isError && errorField.price
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="bookPrice"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
                <div
                  className={
                    errorField.price
                      ? "invalid-feedback d-block"
                      : "invalid-feedback"
                  }
                >
                  {errorField.price}
                </div>
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
