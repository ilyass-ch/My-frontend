import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const columns = [
  { id: 'name', label: 'Nom', minWidth: 170, sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
  { id: 'description', label: 'Description', minWidth: 170, sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
  { id: 'prix', label: 'Prix (dh)', minWidth: 100, align: 'right', sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
  { id: 'categorieName', label: 'Catégorie', minWidth: 130, sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
  { id: 'quantiteStock', label: 'Stock', minWidth: 100, align: 'right', sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
  { id: 'actions', label: 'Actions', minWidth: 100, sx: { fontWeight: 'bold', fontSize: '1.3rem' } },
];


const ProductTable = ({ products, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="product table"   sx={{
    '& td': { fontSize: '1.2rem' },
    '& th': { fontSize: '1.3rem', fontWeight: 'bold' 
      
    }
  }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                // sx={{ fontSize: '1.2rem' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={column.sx}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product.id} >
                  {columns.map((column) => {
                    const value = product[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ fontSize: '2rem' }}>
                        {column.id === 'actions' ? (
                          <div>
                            <Button  color="primary" onClick={() => onEdit(product)}>
                              Modifier
                            </Button>
                            <Button  color="error" onClick={() => onDelete(product.id)}>
                              Supprimer
                            </Button>
                          </div>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
