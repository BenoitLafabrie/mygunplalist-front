const createCollection = async () => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/mygunplalist/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await request.json();
  return response;
};

const getMygunplalistById = async (token, id) => {
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/mygunplalist/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await request.json();
  return response;
};

const updateMygunplalistById = async (token, id, item_id) => {
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/mygunplalist/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_id }),
    }
  );
  const response = await request.json();
  return response;
};

export { createCollection, getMygunplalistById, updateMygunplalistById };
