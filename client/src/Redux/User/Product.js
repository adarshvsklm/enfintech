import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  ProductId: '63233b1ea45686c3d82478e3',
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
 