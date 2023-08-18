import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './productsAPI'

const initialState = {
  products: [],
  status: 'idle'
}

export const fetchAsync = createAsyncThunk(
  'products/fetchProduct',
  async (thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'GET'
      })
      let data = await response.json()
      console.log(data)
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, 'err')
        return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchAsync.pending, state => {
        state.status = 'loading'
      })
      builder
      .addCase(fetchAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.status = 'idle'
        state.products = action.payload;
        
      })
  }
})

// export const {  } = productsSlice.actions;

export default productsSlice.reducer
