import { Typography, Box, makeStyles, TextField,Grid, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addUserColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Update = () => {
 const classes = useStyles();
 const { id } = useParams();
 const navigate = useNavigate();
 const [product, setProduct] = useState({
    image:" ",
    title:" ",
    price:" "
 });
 useEffect(() => {
  async function getProduct() {
   try {
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`)
    // console.log(product.data);
    setProduct(product.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getProduct();
 }, [id]);

 function onTextFieldChange(e) {
  setProduct({
   
   [e.target.name]: e.target.name
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`https://fakestoreapi.com/products/${id}`, product)
   navigate("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">Update Product</Typography>
   </Box>

   <Grid container justifyContent="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Update Product</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
      <TextField  autoComplete="productImage" name="productImage" variant="outlined"  required id="productImage" label="ImageURL" value={product.image} onChange={e => onTextFieldChange(e)}
        />
        <TextField  autoComplete="productName" name="productName" variant="outlined" required  id="productName" label="productName" value={product.title}  onChange={e => onTextFieldChange(e)} />
        <TextField  autoComplete="productPrice" name="productPrice" variant="outlined" required  id="productPrice" label="productPrice" value={product.price}  onChange={e => onTextFieldChange(e)} />
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid>
   
  </>
 )
}

export default Update