import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { paths } from "@/lib/paths";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isProtected = !request.nextUrl.pathname.startsWith(paths.login);

  if (!session && isProtected) {
    const loginUrl = new URL(paths.login, request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  if (session && request.nextUrl.pathname === paths.login) {
    return NextResponse.redirect(request.nextUrl.origin);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
