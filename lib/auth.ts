// Talks to ElectroCar_Backend (Express, port 46329).
//
// Endpoints used (routes/router.js in the backend):
//   POST /users/login   { identifier, password }                  -> sets the httpOnly "user_token" cookie
//   POST /otp/send      { destination, type, purpose }            -> stores a hashed 6-digit code (valid 2 min)
//   POST /otp/verify    { destination, code, purpose, type }      -> creates the user when purpose is "register", sets the cookie
//   PUT  /users/me      { first_name, last_name, password }       -> needs the cookie
//
// The token lives in an httpOnly cookie, so every request must use `credentials: "include"`
// (and the backend must enable CORS with credentials, see the notes in the reply).

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:46329";

export type OtpType = "mobile" | "email";
export type OtpPurpose = "register" | "login";

export type ApiResult = {
  ok: boolean;
  /** HTTP status, or 0 when the server could not be reached */
  status: number;
  /** The server's message (Persian), or "" */
  message: string;
};

async function request(
  path: string,
  method: "POST" | "PUT",
  body: Record<string, unknown>
): Promise<ApiResult> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    let message = "";

    try {
      const data = await response.json();
      message = typeof data?.message === "string" ? data.message : "";
    } catch {
      // response had no JSON body
    }

    return { ok: response.ok, status: response.status, message };
  } catch {
    return { ok: false, status: 0, message: "" };
  }
}

export const loginWithPassword = (identifier: string, password: string) =>
  request("/users/login", "POST", { identifier, password });

export const sendOtp = (
  destination: string,
  type: OtpType,
  purpose: OtpPurpose
) => request("/otp/send", "POST", { destination, type, purpose });

export const verifyOtp = (
  destination: string,
  code: string,
  purpose: OtpPurpose,
  type: OtpType
) => request("/otp/verify", "POST", { destination, code, purpose, type });

export const updateMyProfile = (data: {
  first_name: string;
  last_name: string;
  password: string;
}) => request("/users/me", "PUT", data);

/** Persian / Arabic digits -> English digits (so "۰۹۱۲..." works) */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}
