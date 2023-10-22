import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Product {
  _id: string;
  name: string;
  brand: string;
  createdAt: string;
  qcStatus: string;
  marketplace:string
  // Add other product properties as needed
}

interface StickyHeadTableProps {
  products: Product[];
}

const columns = [
  { id: 'name', label: 'Product Name' },
  { id: 'brand', label: 'Brand' },
  { id: 'marketPlace', label: 'MarketPlace' },
  { id: 'createdOn', label: 'Created On' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const StickyHeadTable: React.FC<StickyHeadTableProps> = ({ products }) => {
  return (
    <Paper>
      <TableContainer style={{marginTop:"2rem"}}>
        <Table >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell style={{fontSize:"3rem",fontWeight:"bold"}} key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} >
                <TableCell style={{fontSize:"2rem"}}>{product.name}</TableCell>
                <TableCell style={{fontSize:"2rem"}}>{product.brand}</TableCell>
                <TableCell style={{fontSize:"2rem"}}>{product.marketplace}</TableCell>
                <TableCell style={{fontSize:"2rem"}}>{product.createdAt}</TableCell>
                <TableCell style={{color:"green",fontSize:"2rem"}}>{product.qcStatus}</TableCell>
                <TableCell style={{fontSize:"2rem"}}>{/* Add logic for actions if needed */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StickyHeadTable;
