const addToCollection = async (email, password) => {
  const body = { email, password };
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/auth/addToCollection`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const token = await request.json();

  return token;
};

const getAllItems = async (token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

const getItemById = async (id, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

export { addToCollection, getAllItems, getItemById };
