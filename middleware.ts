// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(req: NextRequest) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUH_SECRET });
	
      console.log({session})
      if (!session) {
		const requestdPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = `/auth/login`;
		url.search = `p=${requestdPage}`;
		return NextResponse.redirect(url);
	}
    

}

// See "Matching Paths" below to learn more

export const config = {
	matcher: ['/presidente/:path*',"/quejas",],
};