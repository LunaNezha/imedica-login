export const passwordPattern = new RegExp(
  /^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{12,30}$/,
);

export const nullablePasswordPattern = new RegExp(
  /^(?:$|(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{12,30})$/,
);
