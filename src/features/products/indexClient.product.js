import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Spinner from '../../components/Loader/Spinner';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ClientProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <Container sx={{ mt: 4, mb: 6, maxWidth: "lg" }}>
      <Typography variant="h4" gutterBottom>
        Nos Produits
      </Typography>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Typography color="error">Erreur : {error}</Typography>
      ) : (
        <>
<Grid container spacing={3} justifyContent="center">
  {products.slice(0, visibleCount).map((product) => (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {product.name?.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="options">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.name}
          subheader={`Prix: ${product.prix} DH`}
        />
        <CardMedia
          component="img"
          height="130"
          image={product.image || '/default-image.jpg'}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {product.description?.substring(0, 100)}...
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="favori">
            <FavoriteIcon />
          </IconButton>
          <Button variant="contained" size="small" sx={{ ml: 'auto' }}>
            Ajouter au panier
          </Button>
          <ExpandMore
            expand={expandedId === product.id}
            onClick={() => handleExpandClick(product.id)}
            aria-expanded={expandedId === product.id}
            aria-label="voir plus"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedId === product.id} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="subtitle1">Détails :</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  ))}
</Grid>


          {visibleCount < products.length && (
            <Button
            variant="contained" 
            disableElevation
              onClick={handleShowMore}
              sx={{
                mt: 4,
                display: 'block',
                mx: 'auto',
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Voir plus
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default ClientProductPage;
