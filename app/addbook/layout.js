import Footer from "@/components/footer";

export const metadata = {
  title: "Add Book",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="content_body flex-grow-1">{children}</div>
      <div className="content_footer">
        <Footer />
      </div>
    </>
  );
}
