import { NextResponse, type NextRequest } from "next/server";

export const UTM_PARAMS = 'utm_p';
export function middleware(request: NextRequest) {
  

  // get cookie UTM_PARAMS from request
  const utmParamsCookie = request.cookies.get(UTM_PARAMS);

  // get search query params from nextUrl
  const { search } = request.nextUrl;

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
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};