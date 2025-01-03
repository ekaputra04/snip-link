import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user) {
      response.headers.set("x-user-id", user.id);
    }

    const pathname = request.nextUrl.pathname;

    if (!user) {
      if (pathname === "/" || pathname.startsWith("/public")) {
        return response;
      }

      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    if (user) {
      if (pathname === "/sign-in" || pathname === "/sign-up") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      response.headers.set("x-user-id", user.id);
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
};
