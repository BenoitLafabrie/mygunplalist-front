const login = async (email, password) => {
  const body = { email, password };
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const token = await request.json();

  return token;
};

export { login };
