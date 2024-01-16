const getUserData = async (token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

export { getUserData };
