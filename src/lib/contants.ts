const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiConstants = {
  getCategories: `${apiUrl}/categories`,
  getExpenses: `${apiUrl}/expenses`,
  addExpense: `${apiUrl}/expenses`,

  userSignup: `${apiUrl}/auth/signup`,
  userLogin: `${apiUrl}/auth/login`,
  userOtpVerification: `${apiUrl}/auth/verify-otp`,
  getCurrentUser: `${apiUrl}/user/current-user`
};
