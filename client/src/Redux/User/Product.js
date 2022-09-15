import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  ProductId: '',
};

export const Product = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProductId: (state, action) => {
      console.log(action.payload,'asasa');
      state.ProductId = action.payload
    },
  },
});

export default Product.reducer;
export const { setProductId } = Product.actions;
 