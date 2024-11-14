export const getHeader = (withtoken = true) => {
  const headers: any = {};
  if (withtoken) {
    const token = localStorage.getItem("token");
    headers["authorization"] = `Bearer ${token}`;
  }
  return headers;
};
