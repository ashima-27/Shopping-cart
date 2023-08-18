import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchItems, addItem,updateItem,deleteItem} from './cartAPI'

const initialState = {
  items: [],
  status: 'idle'
}

export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async (thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/cart', {
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

export const addAsync =createAsyncThunk(
  'cart/addItem',
  async(item,thunkAPI)=>{
    const {id,title,brand,thumbnail,price}=item
    const response = await addItem({id,title,brand,thumbnail,price,quantity:1});
    return response.data;
  }
)

export const delAsync= createAsyncThunk(
  'cart/delItem',
  async(id,thunkAPI)=>{
    await deleteItem(id);
    return id;
  }
)

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async(id,change,thunkAPI)=>{
    console.log("id:",id ,"chng:",change)
   const response= await updateItem(id.id,id.change);
    console.log('res:',response)
    return response.data;
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchAsync.pending, state => {
        state.status = 'loading'
      })
      builder
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload;
        
      })

      builder
      .addCase(addAsync.pending, state => {
        state.status = 'loading'
      })
      builder
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items.push( action.payload);
        
      })

      builder
      .addCase(delAsync.pending, state => {
        state.status = 'loading'
      })
      builder
      .addCase(delAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id=== action.payload)
        state.items.splice(index,1);
        
      })

      builder
      .addCase(updateAsync.pending, state => {
        state.status = 'loading'
      })
      builder
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        const index = state.items.findIndex(item=>item.id=== action.payload.id)
        console.log(action.payload ,index)
        state.items.splice(index,1,action.payload);
        
      })
  }
})

// export const {  } = cartSlice.actions;

export default cartSlice.reducer
