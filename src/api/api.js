import axios from "axios";

const BASE_URL = "http://dev.opensource-technology.com:3000/api";

export const getPost = async (payload) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts?page=${payload.page}&limit=${payload?.limit}&term=${payload.term}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getPostDraft = async (payload) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts/draft?page=${payload.page}&limit=${payload?.limit}&term=${payload.term}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const createPost = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/posts`, payload);
    return data;
  } catch (error) {
    return error;
  }
};
export const updatePost = async (payload) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/posts/${payload.id}`,
      payload.body
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const deletePost = async (payload) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${payload.id}`, {});
    return response;
  } catch (error) {
    return error;
  }
};
export const getPostById = async (payload) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${payload.id}`, {});
    return response;
  } catch (error) {
    return error;
  }
};
