import { NextResponse, type NextRequest } from "next/server";

export const UTM_PARAMS = "utm_p";
export function middleware(request: NextRequest) {
  // get search query params from nextUrl
  const { pathname, search } = request.nextUrl;

  // Apply normalization only to /blog paths
  if (pathname.startsWith("/blog")) {
    // Normalize the pathname
    const normalizedPathname = pathname
      .toLowerCase() // Convert to lowercase
      .replace(/%20/g, "-") // Replace %20 with hyphens
      .replace(/ /g, "-"); // Replace spaces with hyphens

    // Redirect if the pathname is not normalized
    if (pathname !== normalizedPathname) {
      return NextResponse.redirect(
        new URL(normalizedPathname + search, request.url)
      );
    }
  }

  // get cookie UTM_PARAMS from request
  const utmParamsCookie = request.cookies.get(UTM_PARAMS);

  // If UTM_PARAMS cookie is not set or its value is blank, set the cookie to the search value
  if ((!utmParamsCookie || utmParamsCookie.value !== search) && search) {
    const response = NextResponse.next();
    response.cookies.set(UTM_PARAMS, search);
    return response;
  }

  return NextResponse.next();
}
// match evertything except below paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
