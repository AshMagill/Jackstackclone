import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  DialogActions,
  FormHelperText,
} from "@mui/material";

const CreateProductModal = ({ open, handleClose }) => {
  const [productData, setProductData] = useState({
    itemName: "",
    itemDescription: "",
    price: "",
    deliveryPrice: "",
    stockQuantity: "",
    archiveIfNoStock: false,
    isArchived: false,
    image: null,
    imageName: "",
    tags: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.itemName = productData.itemName ? "" : "This field is required.";
    tempErrors.itemDescription = productData.itemDescription
      ? ""
      : "This field is required.";
    tempErrors.price =
      productData.price && !isNaN(productData.price)
        ? ""
        : "Enter a valid price in NZD.";
    tempErrors.deliveryPrice =
      productData.deliveryPrice && !isNaN(productData.deliveryPrice)
        ? ""
        : "Enter a valid delivery price in NZD.";
    tempErrors.stockQuantity =
      productData.stockQuantity && !isNaN(productData.stockQuantity)
        ? ""
        : "Enter a valid stock quantity.";
    tempErrors.image = productData.image ? "" : "Image is required.";
    tempErrors.tags = productData.tags ? "" : "At least one tag is required.";
    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
      imageName: e.target.files[0] ? e.target.files[0].name : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Here, you can assemble the data and make a fetch request to your server
    console.log("Form Data for Submission", productData);
    handleClose(); // Close the modal after form submission
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            margin="dense"
            id="itemName"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={productData.itemName}
            onChange={handleChange}
            error={!!errors.itemName}
            helperText={errors.itemName}
          />
          <TextField
            margin="dense"
            id="itemDescription"
            name="itemDescription"
            label="Item Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={productData.itemDescription}
            onChange={handleChange}
            error={!!errors.itemDescription}
            helperText={errors.itemDescription}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price (NZD)"
            type="text"
            fullWidth
            variant="outlined"
            value={productData.price}
            onChange={handleChange}
            InputProps={{
              endAdornment: <p>NZD</p>,
            }}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            margin="dense"
            id="deliveryPrice"
            name="deliveryPrice"
            label="Delivery Price (NZD)"
            type="text"
            fullWidth
            variant="outlined"
            value={productData.deliveryPrice}
            onChange={handleChange}
            InputProps={{
              endAdornment: <p>NZD</p>,
            }}
            error={!!errors.deliveryPrice}
            helperText={errors.deliveryPrice}
          />
          <TextField
            margin="dense"
            id="stockQuantity"
            name="stockQuantity"
            label="Stock Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={productData.stockQuantity}
            onChange={handleChange}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity}
          />
          <FormControlLabel
            control={
              <Switch
                checked={productData.archiveIfNoStock}
                onChange={handleChange}
                name="archiveIfNoStock"
              />
            }
            label="Archive if no stock"
          />
          <FormControlLabel
            control={
              <Switch
                checked={productData.isArchived}
                onChange={handleChange}
                name="isArchived"
              />
            }
            label="Is Archived"
          />
          <div style={{ marginTop: "20px", marginBottom: "10px" }}>
            <Button
              variant="contained"
              component="label"
              sx={{ marginRight: "10px" }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {productData.imageName && <span>{productData.imageName}</span>}
            {errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </div>
          <TextField
            margin="dense"
            id="tags"
            name="tags"
            label="Tags (comma separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={productData.tags}
            onChange={handleChange}
            error={!!errors.tags}
            helperText={errors.tags || "Enter tags separated by commas."}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
