import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "./modals/DeleteProductModal";
import EditProductModal from "./modals/EditProductModal";

function Product({ products }) {
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleProductUpdate = (updatedProduct) => {
    // Update logic here, possibly involving a fetch request or state update
    console.log("Updated product:", updatedProduct);
    handleEditClose();
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "0 16px" }}>
      <DeleteConfirmationModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <EditProductModal
        open={editModalOpen}
        handleClose={handleEditClose}
        product={currentProduct}
        handleUpdate={handleProductUpdate}
      />
      {products.length > 0 ? (
        products.map((product) => (
          <Box
            key={product.id}
            sx={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.item_name}</Typography>
                <Typography>{product.item_description}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  {product.tags.map((tag, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid #ddd",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginLeft: "8px",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                //src={product.image}
                src="https://m.media-amazon.com/images/M/MV5BMjA4NDkyODA3M15BMl5BanBnXkFtZTgwMzUzMjYzNzM@._V1_.jpg"
                alt={product.item_name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <IconButton aria-label="delete" sx={{ color: "red" }}>
                  <DeleteIcon onClick={handleClickOpen} />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="edit"
                  sx={{ mb: 1, color: "blue" }}
                >
                  <EditIcon onClick={handleEditOpen} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          No products found.
        </Box>
      )}
    </Box>
  );
}

export default Product;
