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
  postActivity,updateActivity
} from "../../common/apis/activities";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.min.css";
import UploadIcon from "@mui/icons-material/Upload";
import ReplyIcon from "@mui/icons-material/Reply";
import { getFromLocalStorage } from '../../common/utils/LocalStorage';


const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const  NewActivity = () => {
  const row = getFromLocalStorage("row-data") || {}
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [image, setImageData] = useState(null);
  const [showMissionAndVision, setShowMissionAndVision] = useState(false);

  const handleActivityTypeChange = (event) => {
    const selectedActivityType = event.target.value;
    setShowMissionAndVision(selectedActivityType === 'About');
  };


  const postMutation = useMutation({ mutationFn: postActivity });
  const updateMutation = useMutation({ mutationFn: updateActivity });



  const formik = useFormik({

    initialValues: {
      activityName: row?.activityName || "",    
      description: row?.description || "",    
      startDate: row?.startDate || "",    
      endDate: row?.endDate || "",    
      activityType: row?.activityType || "",    
      status: row?.status || "", 
      vision: row?.vision || "",
      mission: row?.mission || "",


    },
    validationSchema: Yup.object().shape({
      activityName: Yup.string().required("Required"),       
        description: Yup.string().required("Required"),  
        startDate: Yup.string().required("Required"),  
        endDate: Yup.string().required("Required"),  
        activityType: Yup.string().required("Required"),  
        status: Yup.string().required("Required"),  
        // image: Yup.mixed().test("fileSize", "Image size too large", (value) => {
        //   if (value) {
        //     return value.size <= 5000000; // Adjust the maximum file size as needed
        //   }
        //   return true;
        // }),
     
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      
      try {

        if (row?.id) {
          values.id = row.id;
          if (image) {
            values.image = image;
          }
          await updateMutation.mutateAsync(values);

        } else {
          if (image) {
            values.image = image;
          }
          
          await postMutation.mutateAsync(values);
         

        }
        toast.success("Successfully Added a new Activity", {
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
    navigate("/scit/activities");
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = btoa(
            new Uint8Array(reader.result)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        setImageData(base64String);
    };

    if (file) {
        reader.readAsArrayBuffer(file);
    }
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
                Activities
              </Typography>
              <Typography gutterBottom>Add New Activity details below</Typography>
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
                              >Activity Name</FormLabel>
                              <TextField
                                name="activityName"
                                label="Activity Name"
                                value={formik.values.activityName}
                                error={Boolean(
                                  formik.touched.activityName && formik.errors.activityName
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.activityName && formik.errors.activityName
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
                              >Start Date</FormLabel>
                              <TextField
                                name="startDate"
                                type="date"
                                value={formik.values.startDate}
                                error={Boolean(
                                  formik.touched.startDate && formik.errors.startDate
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.startDate && formik.errors.startDate
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
                              >End Date</FormLabel>
                              <TextField
                                name="endDate"
                                type="date"
                                value={formik.values.endDate}
                                error={Boolean(
                                  formik.touched.endDate && formik.errors.endDate
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.endDate && formik.errors.endDate
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
                                Activity Type
                              </FormLabel>                             
                              <Select
                                name="activityType"
                                label="Activity Type"
                                value={formik.values.activityType}
                                error={Boolean(formik.touched.activityType && formik.errors.activityType)}
                                fullWidth
                                onChange={(event) => {
                                  formik.handleChange(event);
                                  handleActivityTypeChange(event);
                                }}
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
                                <MenuItem value="message">Directors Message</MenuItem>
                                <MenuItem value="announcemnets">Announcements</MenuItem>
                                <MenuItem value="Events">Events</MenuItem>
                                <MenuItem value="Academic">Academic</MenuItem>
                                <MenuItem value="About">About</MenuItem>
                              </Select>
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
                                Status
                              </FormLabel>                             
                              <Select
                                name="status"
                                label="Status"
                                value={formik.values.status}
                                error={Boolean(formik.touched.status && formik.errors.status)}
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
                                <MenuItem value="Upcoming">Upcoming</MenuItem>
                                <MenuItem value="Ongoing">Ongoing</MenuItem>
                                <MenuItem value="Past">Past</MenuItem>
                                
                              </Select>
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
                                Activity Image
                              </FormLabel>
                             
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                   
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
                              >Description</FormLabel>
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
                                  borderRadius:10,
                                  marginTop: 2,
                                  '& legend': { display: 'none' },
                                  '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                                }}
                                rows={5}
                                my={2}
                              />
                            </FormControl>
                          </Grid>  
                          {showMissionAndVision && (
                            <>
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
                              >Mission</FormLabel>
                              <TextField
                                name="mission"
                                label="Mission Name"
                                value={formik.values.mission}
                                error={Boolean(
                                  formik.touched.mission && formik.errors.mission
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.mission && formik.errors.mission
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
                              >Vision</FormLabel>
                              <TextField
                                name="vision"
                                label="Vision"
                                value={formik.values.vision}
                                error={Boolean(
                                  formik.touched.vision && formik.errors.vision
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.vision && formik.errors.vision
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
                          </>
                          )}
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
export default NewActivity;
