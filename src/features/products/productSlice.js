import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productAPI from './productAPI';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productAPI.getAllProducts();
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  return await productAPI.createProduct(product);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
  return await productAPI.updateProduct(id, product);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  return await productAPI.deleteProduct(id);
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
