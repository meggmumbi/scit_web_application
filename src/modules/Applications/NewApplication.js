import clsx from 'clsx';
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CircularProgress,
  Grid,
  Select,
  withStyles,
  StepConnector,
  MenuItem,
  FormControl,
  Stepper, Step, StepLabel,
  FormLabel,
  useTheme,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { spacing } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getProgrammes
} from "../../common/apis/scit";
import {
  postApplication, updateApplication
} from "../../common/apis/applications";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.min.css";
import PeopleIcon from '@mui/icons-material/People';
import { Person, LocationOn, School, CheckCircle, ArrowBack,ArrowForward } from '@mui/icons-material';
import { getFromLocalStorage } from '../../common/utils/LocalStorage';


const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(95deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(95deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

// Icons for each step
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(136deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(136deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Person />,
    2: <LocationOn />,
    3: <School />,
    4: <CheckCircle />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
const steps = ['Personal Details', 'Address', 'Submit Application'];

const NewApplication = () => {
  const row = getFromLocalStorage("applications-detail-row") || {}
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const postMutation = useMutation({ mutationFn: postApplication });
  const updateMutation = useMutation({ mutationFn: updateApplication });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { data: programmesData, isLoading, error } = useQuery({
    queryKey: 'getProgrammes',
    queryFn: getProgrammes,

  });
  const formik = useFormik({

    initialValues: {
      fullName: row?.fullName || "",
      dob: row?.dob || "",
      idNumber: row?.idNumber || "",
      programmeId: row?.programmeId || "",
      gender: row?.gender || "",
      email: row?.email || "",
      phoneNumber: row?.phoneNumber || "",
      address: row?.address || "",

      religion: row?.religion || "",
      paymentMethod: row?.paymentMethod || "",
      qualifications: row?.qualifications || "",

    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      programmeId: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      idNumber: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      // city: Yup.string().required("Required"),
      // postalCode: Yup.string().required("Required"),
      // country: Yup.string().required("Required"),
      qualifications: Yup.string().required("Required"),
      paymentMethod: Yup.string().required("Required")
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
        toast.success("Successfully Added a new Application", {
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
    navigate("/scit/applications");

  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
                  >Full Name</FormLabel>
                  <TextField
                    name="fullName"
                    label="full Name"
                    value={formik.values.fullName}
                    error={Boolean(
                      formik.touched.fullName && formik.errors.fullName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
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
                    Gender
                  </FormLabel>
                  <Select
                    name="gender"
                    label="gender"
                    value={formik.values.gender}
                    error={Boolean(formik.touched.gender && formik.errors.gender)}
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
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
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
                  >Date of Birth</FormLabel>
                  <TextField
                    name="dob"
                    type="date"
                    value={formik.values.dob}
                    error={Boolean(
                      formik.touched.dob && formik.errors.dob
                    )}
                    fullWidth
                    helperText={
                      formik.touched.dob && formik.errors.dob
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
                  >Id / Passport Number</FormLabel>
                  <TextField
                    name="idNumber"
                    label="id Number"
                    value={formik.values.idNumber}
                    error={Boolean(
                      formik.touched.idNumber && formik.errors.idNumber
                    )}
                    fullWidth
                    helperText={
                      formik.touched.idNumber && formik.errors.idNumber
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
                  >Religion</FormLabel>
                  <TextField
                    name="religion"
                    label="religion"
                    value={formik.values.religion}
                    error={Boolean(
                      formik.touched.religion && formik.errors.religion
                    )}
                    fullWidth
                    helperText={
                      formik.touched.religion && formik.errors.religion
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
            </Grid>
          </Box>
        );
      case 1:
        return (
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
                  >Email</FormLabel>
                  <TextField
                    name="email"
                    label="email"
                    value={formik.values.email}
                    error={Boolean(
                      formik.touched.email && formik.errors.email
                    )}
                    fullWidth
                    helperText={
                      formik.touched.email && formik.errors.email
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
            </Grid>
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
                  >Phone Number</FormLabel>
                  <TextField
                    name="phoneNumber"
                    label="phoneNumber"
                    value={formik.values.phoneNumber}
                    error={Boolean(
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    )}
                    fullWidth
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
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
            </Grid>
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
                  >Address</FormLabel>
                  <TextField
                    name="address"
                    label="address"
                    value={formik.values.address}
                    error={Boolean(
                      formik.touched.address && formik.errors.address
                    )}
                    fullWidth
                    helperText={
                      formik.touched.address && formik.errors.address
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
            </Grid>
          </Box>
        );
      case 2:
        return (
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
                  >Qualifications</FormLabel>
                  <TextField
                    name="qualifications"
                    label="qualifications"
                    value={formik.values.qualifications}
                    error={Boolean(
                      formik.touched.qualifications && formik.errors.qualifications
                    )}
                    fullWidth
                    helperText={
                      formik.touched.qualifications && formik.errors.qualifications
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
            </Grid>
            <Grid
              container
              spacing={5}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                  <FormLabel style={{ fontSize: "16px", color: "#000", fontWeight: "bold" }}>Programme</FormLabel>
                  <Select
                    labelId="programmeId-label"
                    id="programmeId"
                    name="programmeId"
                    value={formik.values.programmeId}
                    onChange={formik.handleChange}
                  >
                    {programmesData?.data?.map((programme) => (
                      <MenuItem key={programme.id} value={programme.id}>
                        {programme.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>


            </Grid>
            <Grid
              container
              spacing={5}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
            <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Payment Method
                  </FormLabel>
                  <Select
                    name="paymentMethod"
                    label="Payment Method"
                    value={formik.values.paymentMethod}
                    error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
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
                    <MenuItem value="Direct To the University">Direct To the University</MenuItem>
                    <MenuItem value="M-Pesa">M-Pesa</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>
              </Grid>
          </Box>
        );
      default:
        return <div>Unknown Step</div>;
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
                Application
              </Typography>
              <Typography gutterBottom>Add New Application details below</Typography>
            </Grid>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={formik.handleSubmit}>
              <Card mb={12}>
                <CardContent>
                  {formik.isSubmitting ? (
                    <Box display="flex" justifyContent="center" my={6}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>

                      {renderStepContent(activeStep)}
                      <div>
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
                              startIcon={<ArrowBack />}
                              disabled={activeStep === 0} 
                              onClick={handleBack}
                              
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
                              startIcon={<ArrowForward />}
                              onClick={handleNext}
                              type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                            >
                             {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                          </Grid>
                        </Grid>
                      
                      
                      </div>
                      {/* <Box>                      
                         
                        
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
                      </Box> */}
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
export default NewApplication;
