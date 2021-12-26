import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
 UserListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});
const View = () => {
 const classes = useStyles();
 const { id } = useParams();
 const [product, setProduct] = useState([]);
 const navigate = useNavigate();
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
 }, [id])

 function handleClick() {
  navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.UserListColor}>
    <Typography variant="h4">Product Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableBody>
      <TableRow>
      <TableCell  align="center"><img style={{objectFit:"cover",backgroundColor:"gray", borderRadius:"10%",maxWidth:"170px",maxHeight:"175px"}} src = {product.image} alt="NoImage"/></TableCell>
      <TableCell align="center"><Typography variant="h5">{product.title}</Typography></TableCell>
       <TableCell align="center"><Typography variant="h5">{product.price}</Typography></TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
  </>
 )
}

export default View