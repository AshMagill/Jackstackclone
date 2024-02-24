import React, { useEffect, useState, useContext } from "react";
import Product from "./Product";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Box,
  Grid,
} from "@mui/material";
import CreateProductModal from "./modals/CreateProductModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // Initialized with 'all' to fetch all products by default
  const [filters, setFilters] = useState(["all"]);
  const [pageSize, setPageSize] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchData() {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/products?page=${currentPage}&search=${searchQuery}&filters=${
          filters.includes("all") ? "" : JSON.stringify(filters)
        }`
      );
      const data = await response.json();
      setProducts(data.products || []); // Ensure products is an array
      setPageSize(data.pageSize);
      setTotalPages(Math.ceil(data.totalProducts / data.pageSize));
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // model handlers

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    setFilters([event.target.value]);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  function Pagination({ currentPage, totalPages, onPageChange }) {
    const maxPageButtons = 7;
    const sideButtons = Math.floor(maxPageButtons / 2); // Buttons on each side of the current page

    const generatePageNumbers = () => {
      let pages = [];

      if (totalPages <= maxPageButtons) {
        // If total pages is less than max buttons, show all pages
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        // Calculate range of pages to display
        const startPage = Math.max(currentPage - sideButtons, 1);
        let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        if (currentPage + sideButtons > totalPages) {
          endPage = totalPages;
          pages = Array.from(
            { length: maxPageButtons },
            (_, i) => totalPages - i
          ).reverse();
        } else {
          pages = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          );
        }

        // Adjust if startPage is not 1
        if (startPage > 1) {
          pages = [1, "...", ...pages.slice(2)];
        }
        // Adjust if endPage is not totalPages
        if (endPage < totalPages) {
          pages = [...pages.slice(0, -2), "...", totalPages];
        }
      }

      return pages;
    };

    const pages = generatePageNumbers();

    return (
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <CreateProductModal open={open} handleClose={handleClose} />
        <Button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "contained" : "text"}
            >
              {page}
            </Button>
          )
        )}
        <Button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        paddingTop: "4vh",
        display: "flex",
        flexDirection: "column",
        height: "85vh",
      }}
    >
      <Box sx={{ padding: "16px", paddingBottom: "32px" }}>
        {" "}
        {/* Added bottom padding */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filters[0]}
                onChange={handleFilterChange}
                displayEmpty
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="lucky">Lucky</MenuItem>
                <MenuItem value="clover">Clover</MenuItem>
                <MenuItem value="charm">Charm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px" }} // Explicit height to match TextField and Select height
              onClick={handleOpen}
            >
              Create new Charm
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Product products={products} />
      <Box sx={{ mt: 6 }}>
        {/* Increased top margin for the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default Products;
