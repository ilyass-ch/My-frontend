import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from './productSlice';
import { TextField, Button, DialogActions, DialogTitle, DialogContent, Dialog } from '@mui/material';

const ProductEditForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prix: '',
    categorieName: '',
    quantiteStock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      dispatch(updateProduct({ id: product.id, product: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    setFormData({ name: '', description: '', prix: '', categorieName: '', quantiteStock: '' });
    onClose();
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product ? "Modifier Produit" : "Ajouter Produit"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
        <TextField
        label="Nom"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none', // Enlève la bordure autour du champ
            },
            },
        }}
        required
        />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Prix"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            required
          />
          <TextField
            label="Catégorie"
            name="categorieName"
            value={formData.categorieName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Quantité en Stock"
            name="quantiteStock"
            value={formData.quantiteStock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Annuler
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {product ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditForm;
