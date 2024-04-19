// import Footer from "@/components/footer";
// import Header from "@/components/header";
// import SideNav from "@/components/sidenav";

/**
 * metadata 는 클라이언트 컴포넌트에서 사용하지 못하므로 
 * 서버 컴포넌트를 하나 만들고, 기존 클라이언트 컴포넌트를 불러와 렌더링하는 방식으로 변경
 */
export const metadata = {
    title: "Login"
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