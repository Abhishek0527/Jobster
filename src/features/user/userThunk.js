import customFetch from "../../utils/axios"

export const  registerUserThunk = async (user,thunkAPI,url) => {
    try {
        const res = await customFetch.post(url, user)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const loginUserThunk = async (user,thunkAPI,url) => {
    try {
        const res = await customFetch.post(url, user)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const updateuserThunk = async (user,thunkAPI,url) => {
    try {
        const res = await customFetch.patch(url, user, {
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        });
        return res.data
    }
    catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}