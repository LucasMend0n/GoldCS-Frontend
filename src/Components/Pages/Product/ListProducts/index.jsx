import { useEffect, useState } from 'react';
import './ListProducts.css'
import { Form } from 'react-bootstrap'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import apiGold from '../../../../Services/api';
import { AiFillEye } from 'react-icons/ai'
import { TablePagination } from '@mui/base';


const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const response = await apiGold.get("/Product/WithoutPagination");
      setProducts(response.data.result);
    };
    getProducts();
  }, []);


  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className='searchProductPage d-flex flex-column justify-content-start align-items-center'>
      <div className="display-user">
        <h1>Encontrar pedido</h1>
      </div>
      <div className='searchProduct w-25 d-flex justify-content-center' >
        <Form.Control
          type="text"
          placeholder='Buscar produto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='productsTable w-50'>
        <Table>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.productID}
              >
                <TableCell align='center' scope="product">{product.productID}</TableCell>
                <TableCell align='center' scope="product">{product.name}</TableCell>
                <TableCell align='center' scope='product'>{product.version}</TableCell>
                <TableCell align='center' scope='product'>{product.price}</TableCell>
                <TableCell align='center'><AiFillEye /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default ListProducts;
