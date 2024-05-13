"use client";

import { useGlobalContext } from "@/app/context/store";
import getUserData from "@/utils/getUserData";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import editForm from "../actions";

export default function Edit() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const { setUser } = useGlobalContext();

  async function fetchBook(id) {
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
      let author = result.data.book.sellerId;
      if (author !== id) {
        alert("You do not have permission to access this content.");
        router.replace("/", { scroll: false });
      } else {
        setTitle(result.data.book.title);
        setDescription(result.data.book.description);
        setImageUrl(result.data.book.imageUrl);
        setPrice(result.data.book.price);
        setIsFetch(true);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData();
      if (!data.success) {
        if (data.data.error.errorCode.startsWith("E401")) {
          alert(
            "You are not authorized to view this page. Please log in to continue."
          );
          setUser({});
          router.push("/", { scroll: false });
        } else {
          setIsError(true);
          setMessage(data.data.error.errorMessage);
        }
      } else {
        let userId = data.data.member.id;
        await fetchBook(userId);
      }
    }
    fetchUser();
  }, []);

  async function onSubmitHandler(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      imageUrl,
      price,
    };

    const response = await fetch(`/api/books/${params.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      let error = result.data.error;
      setIsError(true);
      setMessage(error.errorMessage);
      setErrorField(error.errorField);
    } else {
      await editForm(params.id);
      router.push("/book/" + params.id, { scroll: false });
    }
  }

  const handleHideAlert = () => {
    setIsError(false);
  };

  if (loading) {
    return <div className="container"></div>;
  } else {
    return (
      <div className="container">
        {isError && (
          <div>
            <div className="alert alert-danger alert-dismissible" role="alert">
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
        {isFetch && (
          <>
            <h3 className="text-center mt-5">Update Book</h3>
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
                  <label htmlFor="bookDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className={
                      isError && errorField.description
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="bookDescription"
                    rows="5"
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
                  Save
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }
}
