import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//API POST
export const fecthCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ANDPOINT}/character/?page=${page}`,)
    return res.data
})
export const fecthCharactersId = createAsyncThunk('characters/getCharactersId', async (id) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ANDPOINT}/character/${id}`,)
    return res.data
})

//Redux Slice
export const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        detail:[],
        status: "idle",
        page: 0,

    },
    reducers: {},
    extraReducers: {

        //data
        [fecthCharacters.pending]: (state, action) => {
            state.status = "loading"
        },
        [fecthCharacters.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = "succeded"
            state.page += 1
        },
        [fecthCharacters.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },

        //detail
        [fecthCharactersId.pending]: (state, action) => {
            state.status = "loading"
        },
        [fecthCharactersId.fulfilled]: (state, action) => {
            state.detail = action.payload
            state.status = "succeded"
        },
        [fecthCharactersId.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }
    }
})

// Select Aldığımız stateler
export const selectData = (state) => state.characters.items
export const selectDataDetail = (state) => state.characters.detail
export const selectStatus = (state) => state.characters.status
export const selectError = (state) => state.characters.error
export const selectPage = (state) => state.characters.page

export default characterSlice.reducer