export { default } from "next-auth/middleware"

export const config = {
    // An empty array or a path that doesn't exist
    matcher: ["/admin-panel-hidden/:path*"] 
}