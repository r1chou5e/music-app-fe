import axios from "axios";

const baseUrl = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/users/get-all`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/song/get-all`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/artist/get-all`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/album/get-all`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changeUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseUrl}api/users/set-role/${userId}`, {
      role: role,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseUrl}api/users/delete/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/song/save`, { ...data });
    return (await res).data.savedSong;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/artist/save`, { ...data });
    return (await res).data.savedArtist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/album/save`, { ...data });
    return (await res).data.savedAlbum;
  } catch (error) {
    return null;
  }
};
