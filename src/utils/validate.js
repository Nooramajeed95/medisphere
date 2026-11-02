export const isEmail = (v) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test((v || "").trim());

// Pakistani mobile number: exactly 11 digits, starting with 03
export const isPhone = (v) => /^03\d{9}$/.test((v || "").replace(/[\s-]/g, ""));

export const isName = (v) => /^[A-Za-z][A-Za-z .'-]{2,}$/.test((v || "").trim());

// at least 8 characters with a letter, a number and a special character
export const isPassword = (v) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(v || "");

export const isAddress = (v) => (v || "").trim().length >= 10;