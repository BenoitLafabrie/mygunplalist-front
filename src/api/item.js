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

const addItem = async (item, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  const response = await request.json();
  return response.item_id;
};

const addItemProps = async (item_id, itemProps, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits-props`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...itemProps, item_id }),
  });
  const response = await request.json();
  return response;
};

const addItemImages = async (item_id, itemImages, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits-images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...itemImages, item_id }),
  });
  const response = await request.json();
  return response;
};

const updateItems = async (items, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(items),
  });
  const response = await request.json();
  return response;
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

const getLatestItems = async () => {
  try {
    const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits/latest`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching latest items:", error);
  }
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

const deleteItems = async (ids, token) => {
  const request = await fetch(`${import.meta.env.VITE_APP_URL}/kits`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_ids: ids }),
  });
  if (request.headers.get("Content-Type").includes("application/json")) {
    const response = await request.json();
    return response;
  } else {
    const response = await request.text();
    return response;
  }
};

const deleteGunplalistItems = async (ids, token, mygunplalist_id) => {
  const request = await fetch(
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
  const response = await request.json();
  return response;
};

const deleteWishlistItems = async (ids, token, wishlist_id) => {
  const request = await fetch(
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
  const response = await request.json();
  return response;
};

export {
  addItem,
  addItemImages,
  addItemProps,
  addToCollection,
  deleteGunplalistItems,
  deleteItems,
  deleteWishlistItems,
  getAllItems,
  getItemById,
  getLatestItems,
  updateItems,
};
