// import Footer from "@/components/footer";
// import Header from "@/components/header";
// import SideNav from "@/components/sidenav";

export const metadata = {
    title: "Search Result"
};

export default function Layout({children}) {

    return (
        <>
          {children}
            {/* <SideNav/>
            <div className="content_main d-flex flex-column">
              <div className="content_header d-flex align-items-center">
                <Header/>
              </div>
              <div className="content_body flex-grow-1">
                {children}
              </div>
              <div className="content_footer">
                <Footer/>
              </div>
            </div> */}
        </>
    )
}