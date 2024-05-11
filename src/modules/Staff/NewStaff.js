import React, { useEffect, useContext, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CircularProgress,
  Grid,
  Autocomplete,
  Checkbox,
  ListItemText,
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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getDepartments
} from "../../common/apis/department";
import {
  postStaff, updateStaff
} from "../../common/apis/staff";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.min.css";
import UploadIcon from "@mui/icons-material/Upload";
import ReplyIcon from "@mui/icons-material/Reply";
import { getFromLocalStorage } from '../../common/utils/LocalStorage';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const specializations = [
  { value: "Software engineering", label: "Software engineering" },
  { value: "Data Science", label: "Data Science" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Fuzzy Logic", label: "Fuzzy Logic" },
  { value: "Human Computer Interaction", label: "Human Computer Interaction" },
  { value: "Information visualization", label: "Information visualization" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Human‐Robot Interaction (HRI)", label: "Human‐Robot Interaction (HRI)" },
  { value: "Social Robotics", label: "Social Robotics" },
  { value: "Computer Science & ICT", label: "Computer Science & ICT" },
  { value: "Technical Staff", label: "Technical Staff" },
  { value: "Front Office Staff", label: "Front Office Staff" },
  { value: "Clerk", label: "Clerk" },
  { value: "Messenger/Cleaner", label: "Messenger/Cleaner" },
  { value: "Internship", label: "Internship" },
]

const NewStaff = () => {
  const row = getFromLocalStorage("staff-detail-row") || {}
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedItems, setSelectedItems] = useState([]);
  const [image, setImageData] = useState(null);

  const postMutation = useMutation({ mutationFn: postStaff });
  const updateMutation = useMutation({ mutationFn: updateStaff });


  const { data: departmentsData, isLoading, error } = useQuery({
    queryKey: 'getDepartments',
    queryFn: getDepartments,

  });
  const formik = useFormik({

    initialValues: {
      name: row?.name || "",
      dob: row?.dob || "",
      specializations: row?.specializations || "",
      departmentId: row?.departmentId || "",
      title: row?.title || "",
      designation: row?.designation || "",
      gender: row?.gender || "",
      staffType: row?.staffType || "",
      staffId: row?.staffId || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      specializations: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      staffType: Yup.string().required("Required"),
      staffId: Yup.string().required("Required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);
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
        toast.success("Successfully Added a new Staff", {
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
    navigate("/scit/staff");

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
                Staff
              </Typography>
              <Typography gutterBottom>Add New Staff details below</Typography>
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
                              >Staff Name</FormLabel>
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
                              >Staff ID</FormLabel>
                              <TextField
                                name="staffId"
                                label="Staff Id"
                                value={formik.values.staffId}
                                error={Boolean(
                                  formik.touched.staffId && formik.errors.staffId
                                )}
                                fullWidth
                                helperText={
                                  formik.touched.staffId && formik.errors.staffId
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
                            <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                              <FormLabel
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                  fontWeight: "bold",
                                }}
                              >
                                Specializations
                              </FormLabel>
                              <Autocomplete
                                fullWidth
                                multiple
                                id="checkboxes-tags-demo"
                                options={specializations}
                                disableCloseOnSelect
                                onChange={(event, newValue) => {
                                  setSelectedItems(newValue.map((item) => item.label));
                                  formik.setFieldValue('specializations', newValue.map((item) => item.label).join(',')); // Save selected labels as a comma-separated string
                                }}
                                value={selectedItems.map((id) => specializations.find((item) => item.label === id))}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option, { selected }) => (
                                  <li {...props}>
                                    <Checkbox
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.label}
                                  </li>
                                )}
                                style={{ width: "100%" }}
                                renderInput={(params) => (
                                  <TextField
                                    fullWidth
                                    sx={{
                                      marginTop: 2,
                                      '& legend': { display: 'none' },
                                      '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                                    }}
                                    my={2}
                                    variant="outlined"
                                    {...params} placeholder=" Search Specializations" />
                                )}
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
                                Designation
                              </FormLabel>
                              <Select
                                name="designation"
                                label="Designation"
                                value={formik.values.designation}
                                error={Boolean(formik.touched.designation && formik.errors.designation)}
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
                                <MenuItem value="Mr">Mr</MenuItem>
                                <MenuItem value="Ms">Ms</MenuItem>
                                <MenuItem value="Miss">Miss</MenuItem>
                                <MenuItem value="Mrs">Mrs</MenuItem>
                                <MenuItem value="Dr (Ph.D)">Dr (Ph.D)</MenuItem>
                                <MenuItem value="Prof">Prof</MenuItem>
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
                                Title
                              </FormLabel>
                              <Select
                                name="title"
                                label="title"
                                value={formik.values.title}
                                error={Boolean(formik.touched.title && formik.errors.title)}
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
                                <MenuItem value="Senior">Senior</MenuItem>
                                <MenuItem value="Chairman">ChairMan</MenuItem>
                                <MenuItem value="Chairwoman">Chairwoman</MenuItem>
                                <MenuItem value="Lecturer">Lecturer</MenuItem>
                                <MenuItem value="Director">Director</MenuItem>
                                <MenuItem value="Senior Lecturer">Senior Lecturer</MenuItem>
                                <MenuItem value="Associate Profesor">Associate Profesor</MenuItem>
                                <MenuItem value="Prof">Prof</MenuItem>
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
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>

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
                                Staff Type
                              </FormLabel>
                              <Select
                                name="staffType"
                                label="Staff Type"
                                value={formik.values.staffType}
                                error={Boolean(formik.touched.staffType && formik.errors.staffType)}
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
                                <MenuItem value="Administrative">Administrative</MenuItem>
                                <MenuItem value="Academic">Academic</MenuItem>

                              </Select>
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
                          <Grid item sm={6}>
                            <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                              <FormLabel
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                  fontWeight: "bold",
                                }}
                              >
                                Staff Image
                              </FormLabel>

                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
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
export default NewStaff;
