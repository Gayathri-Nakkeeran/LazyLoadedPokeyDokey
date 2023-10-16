import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    posts: [],
    nextPosts: [],
    offset: 0,
    isLoading: true,
    error: '',
    fullInfo: [],

}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        getFirstPokemon:
            (state, action) => {
                state.posts = action.payload.posts

                state.isLoading = action.payload.isLoading
                state.offset = action.payload.offset + 20
            },
        loadMorePokemon: (state, action) => {
            state.posts.push(...action.payload.nextPosts)
            state.offset = action.payload.offset + 20

        },
        getPokemonDetail: (state, action) => {
            state.fullInfo = action.payload.fullInfo
        }
    }
})

export default slice.reducer;
export const { getFirstPokemon, loadMorePokemon, getPokemonDetail } = slice.actions;
export const getOffset = (initialState) => initialState.offset


