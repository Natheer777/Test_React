import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, CreateProductData } from '../../types';

// Define the state structure
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 12,
};

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json() as Promise<Product[]>;
  }
);

// Wrap async thunks with toast notifications
export const createProductAsync = (data: CreateProductData) => async (dispatch: any) => {
  return toast.promise(
    dispatch(createProduct(data)).unwrap(),
    {
      pending: 'Creating product...',
      success: 'Product created successfully!',
      error: 'Failed to create product'
    }
  );
};

export const updateProductAsync = (id: number, data: Partial<Product>) => async (dispatch: any) => {
  return toast.promise(
    dispatch(updateProduct({ id, updateData: data })).unwrap(),
    {
      pending: 'Updating product...',
      success: 'Product updated successfully!',
      error: 'Failed to update product'
    }
  );
};

export const deleteProductAsync = (id: number) => async (dispatch: any) => {
  return toast.promise(
    dispatch(deleteProduct(id)).unwrap(),
    {
      pending: 'Deleting product...',
      success: 'Product deleted successfully!',
      error: 'Failed to delete product'
    }
  );
};

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: CreateProductData) => {
    const productWithUserId = { ...productData, userId: 1 };
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productWithUserId),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const newProduct = await response.json();
    return {
      ...newProduct,
      id: Date.now(), // Use timestamp as ID
      userId: 1,
    } as Product;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updateData }: { id: number; updateData: Partial<Product> }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return { id, updateData };
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, updateData } = action.payload;
        const index = state.products.findIndex(product => product.id === id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...updateData };
        }
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setCurrentPage, clearError } = productsSlice.actions;
export default productsSlice.reducer;
