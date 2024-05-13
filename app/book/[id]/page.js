import BookDetail from "./BookDetail";

async function fetchBook(id) {
  const response = await fetch(`${process.env.API_URL}/api/books/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: [`book-${id}`] },
  }).then((res) => res.json());

  return response;
}

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;
  // fetch data
  const response = await fetchBook(id);

  if (response.success) {
    return {
      title: response.data.book.title,
    };
  }
}

export default async function Book({ params }) {
  const response = await fetchBook(params.id);
  return <BookDetail data={response} />;
}
