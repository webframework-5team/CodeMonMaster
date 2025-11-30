// src/utils/storage.js
// StoredUser = { userId: number, token?: string }

const STORAGE_KEYS = {
  USER_ID: "userId",
  TOKEN: "token",
};

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (!userId) return null;

  return {
    userId: Number(userId),
    token: token || undefined,
  };
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, String(user.userId));

    if (user.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, user.token);
    }
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
}
