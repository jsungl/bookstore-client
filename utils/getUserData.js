const getUserData = async () => {
  const response = await fetch("/api/members/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
};

export default getUserData;
