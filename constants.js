export const COOKIE_SETTINGS = {
  ACCESS_TOKEN: { httpOnly: true, maxAge: 18e5, sameSite: "strict" },
  REFRESH_TOKEN: { httpOnly: true, maxAge: 6048e5, sameSite: "strict" },
};
