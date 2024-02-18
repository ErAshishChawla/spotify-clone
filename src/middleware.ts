import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { paths } from "@/paths";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const nextUrl = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  let isLoggedIn: boolean;
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  const isSupabaseAuthRoute = nextUrl.pathname.startsWith(
    paths.supabaseAuthPrefix()
  );
  const isAuthRoute = paths.auth().includes(nextUrl.pathname);
  const isPublicRoute = paths.public().includes(nextUrl.pathname);

  if (isSupabaseAuthRoute) {
    return response;
  }

  if (isPublicRoute) {
    return response;
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(paths.home(), nextUrl));
  }

  if (!isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(paths.defaultInvalidUserRedirect(), nextUrl)
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
