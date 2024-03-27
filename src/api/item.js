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

const getLatestItems = async (token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits/latest`, {
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

const deleteGunplalistItems = async (ids, token, mygunplalist_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_URL}/kits/gunplalist/${mygunplalist_id}/items`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_ids: ids }),
    }
  );

  // Convert the response to JSON
  const jsonResponse = await response.json();

  return jsonResponse;
};

const deleteWishlistItems = async (ids, token, wishlist_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_URL}/kits/wishlist/${wishlist_id}/items`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_ids: ids }),
    }
  );

  // Convert the response to JSON
  const jsonResponse = await response.json();

  return jsonResponse;
};

export {
  addToCollection,
  getAllItems,
  getItemById,
  getLatestItems,
  deleteGunplalistItems,
  deleteWishlistItems,
};
