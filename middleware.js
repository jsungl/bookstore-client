import { NextResponse } from "next/server"


export function middleware(request) {

    let hasToken = request.cookies.has('accessToken');
    let token = request.cookies.get('accessToken');


    //인증이 필요한 페이지 접근
    if (request.nextUrl.pathname.startsWith('/addbook') || 
        (request.nextUrl.pathname.startsWith('/book') && request.nextUrl.pathname.endsWith('edit'))|| 
        request.nextUrl.pathname.startsWith('/mypage')) {
        
        if(!hasToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            if(!token) {
                request.cookies.delete('accessToken');
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

    }

    //로그인 or 회원가입 페이지 접근
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
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
        '/addbook',
        '/mypage',
        '/book/:path*', 
        '/book/:path*/edit'
    ],
}