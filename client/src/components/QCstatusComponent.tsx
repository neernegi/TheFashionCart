import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/features/productSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../pages/context/useAuth";

export interface Product {
  _id: string;
  name: string;
  brand: string;
  createdAt: string;
  qcStatus: string;
  marketplace: string;
}

const columns = [
  { id: "name", label: "Product Name" },
  { id: "brand", label: "Brand" },
  { id: "marketPlace", label: "MarketPlace" },
  { id: "createdOn", label: "Created On" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

interface StickyHeadTableProps {
  products: Product[];
}

interface ProductQCStatus {
  [key: string]: string;
}
const qcStatusList = ["Progress", "Passed", "Cancel"];

const StickyHeadTable: React.FC<StickyHeadTableProps> = ({ products }) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [qcStatusUpdateMessage, setQcStatusUpdateMessage] =
    useState<string>("");

  const adminGetProduct = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Create a state to store individual qcStatus values for each product
  const [productQcStatus, setProductQcStatus] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const productIds = adminGetProduct
      .filter((product) => product?.qcStatus === "Progress")
      .map((product) => product._id);
    setSelectedProductIds(productIds);

    // Initialize the qcStatus for each product
    const initialProductQcStatus: ProductQCStatus = {};
    for (const productId of productIds) {
      initialProductQcStatus[productId] = "Progress";
    }
    setProductQcStatus(initialProductQcStatus);
  }, [adminGetProduct]);
  const qcUpdateHandler = async (productId: string) => {
    // Get the selected QC status from the qcStatusList
    const selectedQcStatus = productQcStatus[productId] || "Progress";
  
    console.log("Selected QC Status:", selectedQcStatus);
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/product/updateProduct/${productId}`,
        { qcStatus: selectedQcStatus }, // Send qcStatus in the request body
        {
          headers: {
            "Content-Type": "application/json", // Use JSON content type
          },
        }
      );
      console.log(
        `QC status updated successfully for product with ID: ${productId}`
      );
      console.log(response.data);
  
      // Update the product QC status in the state with the selected QC status
      setProductQcStatus({
        ...productQcStatus,
        [productId]: selectedQcStatus,
      });

    } catch (error) {
      console.error(
        `Failed to update QC status for product with ID: ${productId}`,
        error
      );
      // Handle errors here
    }
  };
  

  return (
    <Paper>
      <TableContainer style={{ marginTop: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  style={{ fontSize: "3rem", fontWeight: "bold" }}
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {auth?.user?.role === "admin" ? (
              <>
                {adminGetProduct
                 
                  .map((product) => (
                    <TableRow key={product._id}>
                      <TableCell style={{ fontSize: "2rem" }}>
                        {product?.name}
                      </TableCell>
                      <TableCell style={{ fontSize: "2rem" }}>
                        {product?.brand}
                      </TableCell>
                      <TableCell style={{ fontSize: "2rem" }}>
                        {product?.marketplace}
                      </TableCell>
                      <TableCell style={{ fontSize: "2rem" }}>
                        {product?.createdAt}
                      </TableCell>
                      <TableCell>
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            qcUpdateHandler(product?._id);
                          }}
                        >
                          <Autocomplete
                            options={qcStatusList}
                            getOptionLabel={(option) => option}
                            value={productQcStatus[product._id] || "Progress"}
                            onChange={(_, newValue) => {
                              setProductQcStatus({
                                ...productQcStatus,
                                [product._id]: newValue || "Progress",
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="QC Status"
                                variant="outlined"
                              />
                            )}
                          />
                          <Button type="submit" style={{ margin: "0.7rem" }}>
                            Update QC Status
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ) : (
              <>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell style={{ fontSize: "2rem" }}>
                      {product?.name}
                    </TableCell>
                    <TableCell style={{ fontSize: "2rem" }}>
                      {product?.brand}
                    </TableCell>
                    <TableCell style={{ fontSize: "2rem" }}>
                      {product?.marketplace}
                    </TableCell>
                    <TableCell style={{ fontSize: "2rem" }}>
                      {product?.createdAt}
                    </TableCell>
                    <TableCell style={{ color: "green", fontSize: "2rem" }}>
                      {product?.qcStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StickyHeadTable;
