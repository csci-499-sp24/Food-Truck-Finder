import { SignJWT, jwtVerify } from "jose";
import { getCookie, setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";


const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 weeks from now")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function storeSession(formData) {
  // Verify credentials && get the user

  const user = formData;

  // Create the session
  const expires = new Date(Date.now() + (6.048e+8 * 10));
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  setCookie("session", session, { expires });
  console.log("session");
  setCookie("name", formData.name);
}

export async function logout() {
  // Destroy the session
  setCookie("session", "", { expires: new Date(0) });
  setCookie("name", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = getCookie("session");
  console.log(session);
  // const name = getCookie("name");
  // console.log(session);
  if (!session) return null;
  return await decrypt(session);
}

// export async function updateSession(request) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }