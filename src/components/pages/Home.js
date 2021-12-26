import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import ProductList from "../product/ProductList";
import axios from "axios";
import { Formik, Form, useField } from 'formik';
import { useState } from "react";
import * as Yup from 'yup';

const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addUserColor: {
  backgroundColor: green[400],
  color: "white"
 },
 addform:{
   fontSize: "2",
   color: "black",
   width: "40",
   marginTop: "1",
 }
})

const TextField = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.title}>{label}</label>
       <input className="" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };

const Home = () => {
 const classes = useStyles();
 const [product, setProduct] = useState({
    image:"",
    title:"",
    price:""
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setProduct({
   ...product,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()

  try {
   await axios.post(`https://fakestoreapi.com/products`, product)
   setStatus(true);
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 if (status) {
  return <Home/>
 }
 return (
  <>
   <Box textAlign="center" className={classes.headingColor} p={1} mb={1}>
    <Typography variant="h3">Product</Typography>
   </Box>
   <Formik      
         initialValues={{
           image: '',
           title: '',
           price: ''
         }}
         validationSchema={Yup.object({
            image: Yup.string()
             .url('enter valid url')
             .required('Required'),
           title: Yup.string()
             .max(15, 'Must be 15 characters or less')
             .required('Required'),
           price: Yup.string()
             .max('enter valid price')
             .required('Required'),
         })}
         onSubmit={(values, { setSubmitting }) => {
           setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
             setSubmitting(false);
           }, 400);
         }}
       >
   <Grid container justifyContent="center">
    <Grid item md={12} xs={12}>
     <Box textAlign="center" p={1} className={classes.addUserColor} mb={1} ml={1} mr={1}>
      <Typography variant="h5">Add Product</Typography>
     
     <Form className={classes.addform}>
      <Grid container spacing={1} m={2}>
       <Grid item xs={12}>
        <TextField  autoComplete="productImage" name="productImage" variant="outlined"  id="productImage" label="ImageURL" onChange={e => onTextFieldChange(e)}
        />
        <TextField  autoComplete="productName" name="productName" variant="outlined"   id="productName" label="ProductName" onChange={e => onTextFieldChange(e)} />
        <TextField  autoComplete="productPrice" name="productPrice" variant="outlined" id="productPrice" label="ProductPrice" onChange={e => onTextFieldChange(e)} />

        <Box m={2}>
       <Button type="submit" variant="contained" color="primary" onClick={e => onFormSubmit(e)}>Add Product</Button>
      </Box>
       </Grid> 
      </Grid>
     </Form>
     </Box>
    </Grid> 

    <Grid item md={12} xs={12} mr={1} ml={1}>
     <ProductList />
    </Grid>
   </Grid>
   </Formik>
  </>
 )
}

export default Home