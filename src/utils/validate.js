export const isEmail = (v) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test((v || "").trim());

// Pakistani mobile: 03001234567 or +923001234567
export const isPhone = (v) => /^(\+92|0092|92|0)?3\d{9}$/.test((v || "").replace(/[\s-]/g, ""));

export const isName = (v) => /^[A-Za-z][A-Za-z .'-]{2,}$/.test((v || "").trim());

// at least 6 characters, with a letter and a number
export const isPassword = (v) => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(v || "");