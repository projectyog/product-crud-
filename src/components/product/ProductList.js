import { Typography, Box, makeStyles, TableContainer,Table, TableBody, TableCell, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 UserListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  marginRight:1,
  marginLeft:1,
 },
})



const ProductList = () => {
 const classes = useStyles();
 const [product, setProduct] = useState([]);

 useEffect(() => {
  async function getAllProduct() {
   try {
    const product = await axios.get(`https://fakestoreapi.com/products`)
    // console.log(product.data);
    setProduct(product.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllProduct();
 }, [])

 const handleDelete = async id => {
  await axios.delete(`https://fakestoreapi.com/products/${id}`);
  var newproduct = product.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setProduct(newproduct);
 }


 return (
  <>
  
   <Box textAlign="center" m={1} className={classes.UserListColor}>
    <Typography variant="h6">Product List</Typography>
   </Box>
   <TableContainer component={Paper} style={{boxSizing:"borderBox"}}>
    <Table>
     <TableBody>
      {
       product.map((product, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center"><img style={{objectFit:"cover",backgroundColor:"gray", borderRadius:"10%",width:"100%",height:"auto"}} 
          src = {product.image} alt="NoImage"/></TableCell>
          <TableCell align="center"><Typography variant="h4">{product.title}</Typography></TableCell>
          <TableCell align="center"><Typography variant="h4">$:{product.price}</Typography></TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${product.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/update/${product.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(product.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
   
  </>
 )
}

export default ProductList
