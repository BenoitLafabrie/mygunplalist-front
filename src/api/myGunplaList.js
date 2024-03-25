const createCollection = async () => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/mygunplalist/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(request);

  const response = await request.json();
  console.log(response);
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

const updateItemStatus = async (token, id, status) => {
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/item-status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const response = await request.json();
  return response;
};

export {
  createCollection,
  getMygunplalistById,
  updateMygunplalistById,
  updateItemStatus,
};
