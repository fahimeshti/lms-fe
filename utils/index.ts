function isJWT(token: string) {
  const parts = token.split(".");

  // Check if there are exactly three parts
  if (parts.length === 3) {
    try {
      // Try to decode the header and payload
      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      // If decoding is successful, it's likely a JWT
      return true;
    } catch (error) {
      // Decoding failed, not a valid JWT
      return false;
    }
  }

  // Not a valid JWT if it doesn't have three parts
  return false;
}

export const parseJwt = (token: string) => {
  if (!isJWT(token)) {
    return "Invalid JWT token";
  }
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
