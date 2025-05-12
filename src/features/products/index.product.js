import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from './productSlice';
import ProductEditForm from './ProductEditForm';
import Spinner from '../../components/Loader/Spinner';
import { Button, Stack, Dialog, Pagination } from '@mui/material';
import ProductTable from './ProductTable'; // Importer le composant optimisé
import './product.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Appel à l'API pour récupérer les produits
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null); // Réinitialiser l'édition
    setOpenForm(true); // Ouvrir le formulaire d'ajout
  };

  const handleFormClose = () => {
    setOpenForm(false); // Fermer le formulaire
  };

  // const handleChangePage = (event, value) => {
  //   setPage(value); // Mettre à jour la page courante de la pagination
  // };

  return (
    <div className="product-page">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>Gestion des Produits</h1>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Ajouter Produit
        </Button>
      </Stack>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Erreur: {error}</p>
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={rowsPerPage}
            page={page}
          />

          {/* <Stack spacing={2} mt={2} alignItems="center">
          <Pagination 
            count={Math.ceil((products?.length || 0) / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />

          </Stack> */}
        </>
      )}

      <Dialog open={openForm} onClose={handleFormClose}>
        <ProductEditForm product={editingProduct} onClose={handleFormClose} />
      </Dialog>
    </div>
  );
};

export default ProductPage;
