import React, { useState, useEffect } from 'react';
import type { Product, CreateProductData } from '../../types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  fetchProducts,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
  setSearchTerm,
  setCurrentPage
} from '../../store/slices/productsSlice';
import './Products.css';

export default function Products() {
  const dispatch = useAppDispatch();

  // Redux state
  const {
    products,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage
  } = useAppSelector(state => state.products);

  // Local state for UI
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  // Form states
  const [formData, setFormData] = useState<CreateProductData>({
    title: '',
    body: ''
  });

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [searchTerm, dispatch]);

  // Form handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProductAsync(editingProduct.id, {
        title: formData.title,
        body: formData.body
      })(dispatch);
      setEditingProduct(null);
      setShowCreateModal(false);
      resetForm();
    } else {
      await createProductAsync(formData)(dispatch);
      setShowCreateModal(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', body: '' });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      body: product.body
    });
    setShowCreateModal(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowCreateModal(false);
    resetForm();
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProductAsync(id)(dispatch);
    setDeleteConfirm(null);
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Filter products by name only
  const filteredProducts = products.filter(product =>
    searchTerm === '' ||
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <div className="error-message">
          <h3>❌ Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchProducts())} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header p-4">
        <div className="header-content">
          <h1 className="page-title left">🛍️ Amazing Products</h1>
          <p className="page-subtitle left">Manage your product catalog with style</p>
        </div>
        <button
          className="btn-primary create-btn right"
          onClick={() => setShowCreateModal(true)}
        >
          ➕ Add Product
        </button>
      </div>

      {/* Simple Search by Name */}
      <div className="search-container hidden">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="🔍 Search by product name..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <div className="search-results">
          {searchTerm && (
            <span className="results-count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for "{searchTerm}"
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start by adding your first amazing product!"
              }
            </p>
            {!searchTerm && (
              <button
                className="btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create First Product
              </button>
            )}
          </div>
        ) : (
          paginatedProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="card-header">
                <h3 className="product-title">{product.title}</h3>
                <div className="card-actions">
                  <button
                    className="btn-icon edit-btn"
                    onClick={() => startEdit(product)}
                    aria-label="Edit product"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon delete-btn"
                    onClick={() => setDeleteConfirm(product)}
                    aria-label="Delete product"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="card-body">
                <p className="product-description">{product.body}</p>
                <div className="product-meta">
                  <span className="user-id">👤 User #{product.userId}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? '✏️ Edit Product' : '➕ Create New Product'}</h2>
              <button className="modal-close" onClick={cancelEdit}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="title">Product Title</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter product title..."
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Description</label>
                <textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Enter product description..."
                  required
                  rows={4}
                  className="form-textarea"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content delete-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🗑️ Delete Product</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="delete-confirmation">
              <div className="delete-icon">⚠️</div>
              <p>Are you sure you want to delete this product?</p>
              <div className="delete-product-info">
                <h4>{deleteConfirm.title}</h4>
                <p>{deleteConfirm.body.substring(0, 100)}...</p>
              </div>
              <div className="delete-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDeleteProduct(deleteConfirm.id)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
