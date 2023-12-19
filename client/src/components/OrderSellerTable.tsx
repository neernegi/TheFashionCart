import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import { Order } from "../redux/features/orderSlice";
import { Box, Typography } from "@mui/material";

export interface Product {
  _id: string;
  name: string;
  brand: string;
  createdAt: string;
  qcStatus: string;
  marketplace: string;
}

const columns = [
  { id: "name", label: "Product" },
  { id: "orderId", label: "ProductId" },
  { id: "orderId", label: "OrderId" },
  { id: "status", label: "OrderStatus" },
];

interface StickyHeadTableProps {
  orders: Order[];
}

interface OrderStatusProps {
  [key: string]: string;
}

const qcStatusList = ["Processing", "Delivered", "Return", "Cancel"];

const OrderSellerTable: React.FC<StickyHeadTableProps> = ({ orders }) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatusProps>({});

  const orderStatusHandler = async (orderId: string, orderItemId: string) => {
    // Get the selected QC status from the qcStatusList
    const selectedOrderStatus = orderStatus[orderItemId] || "Processing";

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/order/seller-orders/${orderId}/order-items/${orderItemId}`,
        { status: selectedOrderStatus }, // Send the order status in the request body
        {
          headers: {
            "Content-Type": "application/json", // Use JSON content type
          },
        }
      );
      console.log(
        `Order item status updated successfully for product with ID: ${orderItemId}`
      );
      console.log(response.data);

      // Update the order item status in the state with the selected status
      setOrderStatus({
        ...orderStatus,
        [orderItemId]: selectedOrderStatus,
      });
    } catch (error) {
      console.error(
        `Failed to update order item status for product with ID: ${orderItemId}`,
        error
      );
      // Handle errors here
    }
  };

  useEffect(() => {
    // Initialize the order item status for each order item
    const initialOrderStatus: OrderStatusProps = {};
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        initialOrderStatus[orderItem._id!] = orderItem!.orderStatus!;
      });
    });
    setOrderStatus(initialOrderStatus);
  }, [orders]);
  
  return (
    <Paper style={{ marginLeft: "13%", marginTop: "2rem" }}>
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
            {orders.map((order) =>
              order.orderItems.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell style={{ fontSize: "2rem" }}>
                    <Box>
                      <img src={orderItem.image} alt={orderItem.name} />
                      <Typography>{orderItem?.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ fontSize: "2rem" }}>
                    {orderItem.productId}
                  </TableCell>
                  <TableCell style={{ fontSize: "2rem" }}>
                    {order._id}
                  </TableCell>
                  <TableCell style={{ color: "green", fontSize: "2rem" }}>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        orderStatusHandler(order._id ||"", orderItem._id||"");
                      }}
                    >
                      <Autocomplete
                        options={qcStatusList}
                        getOptionLabel={(option) => option}
                        value={
                          orderStatus[orderItem?._id || ""] || "Processing"
                        } // Provide a default value for orderItem?._id
                        onChange={(_, newValue) => {
                          setOrderStatus({
                            ...orderStatus,
                            [orderItem?._id || ""]: newValue || "Processing", // Provide a default value for orderItem?._id
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
                        Update Order Status
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderSellerTable;
