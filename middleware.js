import { NextResponse } from "next/server"


export function middleware(request) {

    let hasToken = request.cookies.has('accessToken');
    let token = request.cookies.get('accessToken');
    // console.log(hasToken);

    if (request.nextUrl.pathname.startsWith('/addBook') || request.nextUrl.pathname.startsWith('/edit')) {
        //console.log("인증이 필요한 페이지 접근");
        if(!hasToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            if(!token) {
                request.cookies.delete('accessToken');
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

    }

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
        //console.log("로그인 or 회원가입 페이지 접근");
        if(hasToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
} 

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/search',
        '/addBook',
        '/book/:path*', 
        '/edit/:path*',
        
    ],
}