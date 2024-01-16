const createWishlist = async () => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/wishlist/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await request.json();
  return response;
};

const getWishlistById = async (token, id) => {
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/wishlist/${id}`,
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

const updateWishlistById = async (token, id, item_id) => {
  const request = await fetch(
    `${import.meta.env.VITE_APP_URL}/wishlist/${id}`,
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

export { createWishlist, getWishlistById, updateWishlistById };
