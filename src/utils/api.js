import axios from 'axios';

export const baseUrl = 'https://gourmetfood-api.herokuapp.com';
// export const baseUrl = 'http://localhost:4000';

/**
 * @description Returns the api response
 * @param {number} status Status code
 * @param {object} data Data object
 * @param {string} error Error message
 * @returns {object} Object containing status and data or status and error
 */
const apiResponse = (status, data, error) => {
  if (status && data) {
    return { status, data };
  } if (error && error.response) {
    const newStatus = error.response.status;
    const errorMessage = error.response.data.error;
    return { status: newStatus, data: null, error: errorMessage };
  }
  return { status: 503, data: null, error: error.message };
};

/**
 * @description Gets auth from storage and returns token
 * @returns {string} Token string
 */
const getToken = async () => {
  const token = await JSON.parse(sessionStorage.getItem('token'));
  return token;
};

export const postService = async (url, payload) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}${url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
      data: payload,
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const getService = async (url) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}${url}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const updateService = async (url, payload) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}${url}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
      data: payload,
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};
