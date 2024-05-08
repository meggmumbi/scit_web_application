import React, { useMemo, useRef, useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ToastContainer, toast } from "react-toastify";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent, Divider,
  Paper as MuiPaper,
  IconButton,
  Grid,
  Typography,
  useTheme
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDepartments, deleteDepartment } from "../../common/apis/department";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  MaterialReactTable

} from 'material-react-table';
import { setLocalStorage,removeItem } from '../../common/utils/LocalStorage';
import useMediaQuery from "@mui/material/useMediaQuery";
import GridViewIcon from '@mui/icons-material/GridView';

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Button = styled(MuiButton)(spacing);
const Paper = styled(MuiPaper)(spacing);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  minHeight: "130px",
  color: theme.palette.text.secondary,
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important",
}));

const themeCustom = createTheme({
  palette: {
    custom_black: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
  },
});

const Department = () => {
  const tableInstanceRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [rowSelection, setRowSelection] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setData] = useState([]);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [isDeleteModalOpen, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const handleClick = (event, params) => {

    setAnchorEl(event.currentTarget);
    setSelectedRow(params);
  };


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: 'getDepartments',
    queryFn: getDepartments,

  });

  useEffect(() => {
    refetch();
    if (data?.data) {
      setData(data.data);
      setRowCount(data?.data?.totalRecords);
    }

  }, [data]);


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setLocalStorage("row-data", selectedRow);
    navigate(`/scit/newDepartment`);
  };
  const handleToastClose = () => {
    navigate(-1)
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment(selectedRow.id);
      await refetch();
      setOpenDeleteModal(false);

      toast.success(`Successfully deleted The Department ${selectedRow.name}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // onClose: handleToastClose,
      });

    } catch (error) {
      console.error('Error deleting department Record', error);
    }
  };

  function handleOpenDeleteModal(id) {
    setId(id);
    setOpenDeleteModal(true);
    handleClose();
  }

  function handleCloseModal() {
    setOpenDeleteModal(false);
  }


  const columns = useMemo(
    () => [

      {
        accessorKey: 'name',
        header: 'Department Name'
      },
      {
        accessorKey: 'description',
        header: 'Description'
      }

    ],
    [],
  );
  const tableTheme = useMemo(

    () =>

      createTheme({

        palette: {
          background: {
            default: '#fff'
          }
        }
      })
  );

  return (
    <Grid container alignItems="stretch">
<ToastContainer/>
      <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
        <Paper
          square={true}
          sx={{
            borderTop: 5,
            borderColor: "#4ab7e0",
            width: "100%",
            px: 3,
            py: 5,
          }}
          elevation={8}
        >
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            sx={{ padding: "10px", textAlign: "left" }}
          >
            <Typography
              gutterBottom
              sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Departments
            </Typography>
          </Grid>


          <ThemeProvider theme={tableTheme}>
            <MaterialReactTable
              columns={columns}
              data={tableData}
              enableColumnActions={false}
              onRowSelectionChange={setRowSelection} 
              state={{ rowSelection }} 
              tableInstanceRef={tableInstanceRef} 
              muiTableHeadCellProps={{
                sx: {
                  '& .Mui-TableHeadCell-Content': {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 'bold'
                  },
                },
              }}
              muiTableHeadCellFilterTextFieldProps={{
                sx: {
                  m: '1rem 0', width: '100%', fontSize: '12px',
                  '& .MuiInputBase-root': {
                    color: '#0E6073',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    opacity: 0.9
                  },
                  '& .MuiBox-root': {
                    color: '#0E6073',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    opacity: 0.9
                  },
                  input: {
                    color: '#667085',
                    "&::placeholder": {    // <----- Add this.
                      opacity: 0.9,
                      color: '#0E6073',
                    }
                  }
                },
                variant: 'outlined'
              }}
              enableRowActions
              positionActionsColumn="last"
              renderRowActions={({ row, table }) => {
                return (
                  <>
                    <Button
                      startIcon={<MoreVertIcon />}
                      size="small"
                      onClick={(event) => handleClick(event, row.original)}
                    ></Button>
                    <Menu
                      id={`demo-customized-menu-${row.original.appId}`}
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={handleEdit}
                        disableRipple
                      >
                        <EditIcon />
                        Edit
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        onClick={() => handleOpenDeleteModal(row.original.id)}
                        disableRipple
                      >
                        <DeleteIcon />
                        Delete
                      </MenuItem>

                    </Menu>
                  </>
                )
              }}
              initialState={{
                pagination: {
                  pageSize: 10,
                  pageIndex: 0
                },
                columnVisibility: { id: false }
              }} muiTablePaginationProps={{
                rowsPerPageOptions: [5, 10, 20],
                showFirstButton: false,
                showLastButton: false,
                SelectProps: {
                  native: true
                },
                labelRowsPerPage: 'Number of rows visible'
              }}
              //add custom action buttons to top-left of top toolbar
              renderTopToolbarCustomActions={({ table }) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    p: "4px",
                    right: "15px",
                    position: "absolute",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                      removeItem('row-data'); 
                      navigate("/scit/newDepartment");
                    }}
                    sx={{
                      fontWeight: "bolder",
                      background: "Black",
                      "&:hover": {
                        background: "Black",
                        color: "white",
                      },
                    }}
                  >
                    New Department
                  </Button>

                </Box>
              )}
            />
          </ThemeProvider>
          <Dialog
            open={isDeleteModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Delete Department
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete The Department?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDelete}
                color="primary"
              >
                Yes
              </Button>
              <Button onClick={handleCloseModal} color="error" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default Department;
