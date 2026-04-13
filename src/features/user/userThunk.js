import customFetch from '../../utils/axios';

export const registerUserRequest = async (user) => {
  const response = await customFetch.post('/auth/register', user);
  return response.data;
};

export const loginUserRequest = async (user) => {
  const response = await customFetch.post('/auth/login', user);
  return response.data;
};

export const updateUserRequest = async (user, token) => {
  const response = await customFetch.patch('/auth/updateUser', user, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
