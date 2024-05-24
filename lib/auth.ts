import db from "@/db"
import { cookies } from "next/headers";
import cookieCutter from "cookie-cutter"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";



const getCookies = () => {
    return cookies();
};
  
export const isAuthenticated = async (): Promise<boolean> => {
    const isLoggedIn = await db.isAuthenticated(getCookies())
    return isLoggedIn
}

export const getToken = () : string | undefined => {
    return cookieCutter.get("pb_auth") as string;
}

export const getCookieServerSide = () : string  => {
    const cookieHeaders = cookies();
    const pbAuthCookie = cookieHeaders.get("pb_auth");
    if (!pbAuthCookie)
        throw Error("The User is not logged in");
    const value = pbAuthCookie?.value
    return value;
}

