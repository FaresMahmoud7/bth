"use server";

import { cookies } from "next/headers";

export async function setLocaleCookie(locale: string) {
  (await cookies()).set("locale", locale, { path: "/" });
}
