import React, { useEffect, useContext, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CircularProgress,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  useTheme,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getDepartments
} from "../../common/apis/department";
import {
  postProgramme,updateProgramme
} from "../../common/apis/scit";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.min.css";
import UploadIcon from "@mui/icons-material/Upload";
import ReplyIcon from "@mui/icons-material/Reply";
import { getFromLocalStorage } from '../../common/utils/LocalStorage';


const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const  NewProgramme = () => {
  const row = getFromLocalStorage("programme-detail-row") || {}
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const postMutation = useMutation({ mutationFn: postProgramme });
  const updateMutation = useMutation({ mutationFn: updateProgramme });


  const { data: departmentsData, isLoading, error } = useQuery({
    queryKey: 'getDepartments',
    queryFn: getDepartments,

  });
  const formik = useFormik({

    initialValues: {
      name: row?.name || "",
      programmeType: row?.programmeType || "",
      description: row?.description || "",
      departmentId: row?.departmentId || "", 

    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        programmeType: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        departmentId: Yup.string().required("Required"),
      
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);
      try {

        if (row?.id) {
          values.id = row.id;

          await updateMutation.mutateAsync(values);

        } else {

          await postMutation.mutateAsync(values);

        }
        toast.success("Successfully Added a new Programme", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: handleToastClose,
        });
      } catch (error) {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  const handleToastClose = () => {
    navigate("/scit/Programmes");
    
  };


  return (
    <React.Fragment>
      <ToastContainer />
      <Grid container spacing={3} alignItems="stretch" >
        <Grid item md={12} style={{ display: "flex", width: "100%" }}>
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
                Programme
              </Typography>
              <Typography gutterBottom>Add New Programme details below</Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Card mb={12}>
                <CardContent>
                  {formik.isSubmitting ? (
                    <Box display="flex" justifyContent="center" my={6}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <Box>
                        <Grid
                          container
                          spacing={5}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid item sm={6}>
                            <FormControl
                              sx={{ m: 1, width: "100%", marginBottom: "5px" }}
                              size="medium"
                            >
                              <FormLabel
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                  fontWeight: "bold",
                                }}
                              >Programme Name</FormLabel>
                              <TextField
                                name="name"
                                label="name"
                                value={formik.values.name}
                                error={Boolean(
                                  formik.touched.name && formik.errors.name
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.name && formik.errors.name
                                }
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                variant="outlined"
                                disabled={id != undefined}
                                sx={{
                                  marginTop: 2,
                                  '& legend': { display: 'none' },
                                  '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                                }}
                                my={2}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item sm={6}>
                            <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                              <FormLabel
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                  fontWeight: "bold",
                                }}
                              >
                                Programme Type
                              </FormLabel>                             
                              <Select
                                name="programmeType"
                                label="Programme Type"
                                value={formik.values.programmeType}
                                error={Boolean(formik.touched.programmeType && formik.errors.programmeType)}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                sx={{
                                  marginTop: 2,
                                  '& legend': { display: 'none' },
                                  '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                                }}
                                my={2}
                              >
                                <MenuItem value="">--select--</MenuItem>
                                <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                                <MenuItem value="Diploma">Diploma</MenuItem>
                                <MenuItem value="Certifications">Certifications</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item sm={6}>
                            <FormControl
                              sx={{ m: 1, width: "100%", marginBottom: "5px" }}
                              size="medium"
                            >
                              <FormLabel
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                  fontWeight: "bold",
                                }}
                              >Programme Requirements</FormLabel>
                              <TextField
                                name="description"
                                label="Description"
                                value={formik.values.description}
                                error={Boolean(
                                  formik.touched.description &&
                                  formik.errors.description
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.description &&
                                  formik.errors.description
                                }
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                multiline
                                variant="outlined"
                                sx={{
                                  marginTop: 2,
                                  '& legend': { display: 'none' },
                                  '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                                }}
                                rows={5}
                                my={2}
                              />
                            </FormControl>
                          </Grid>                        
                          <Grid item sm={6}>
                            <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                              <FormLabel style={{ fontSize: "16px", color: "#000", fontWeight: "bold" }}>Department</FormLabel>
                              <RadioGroup
                                name="departmentId"
                                value={formik.values.departmentId}
                                onChange={formik.handleChange}
                              >
                                {departmentsData?.data?.map((department) => (
                                  <FormControlLabel
                                    key={department.id}
                                    value={department.id}
                                    control={<Radio />}
                                    label={department.name} // Assuming 'name' is the property for department name
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                         
                        </Grid>
                        <Grid item xl={12} xs={12} md={12}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: '14px',
                                fontWeight: 'bolder',
                                backgroundColor: '#333333',
                              }}
                              startIcon={<ReplyIcon />}
                              onClick={() => navigate(-1)}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: "14px",
                                fontWeight: "bolder",
                                backgroundColor: "#333333",
                                "&:hover": {
                                  background: "#E19133",
                                  color: "white",
                                },
                              }}
                              startIcon={<UploadIcon />}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default NewProgramme;
