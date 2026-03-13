import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request) {
    if (!request.cookies.has("fitness-accessToken"))
        return NextResponse.redirect(new URL('/unauthorized', request.url))
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: [/* '/Classes/:path*', */ '/Profile/:path*'],
}