import { useEffect, useState } from 'react';
import './ListProducts.css'
import { Button, Form, Modal } from 'react-bootstrap'
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import apiGold from '../../../../Services/api';
import { AiFillEye } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { NumericFormat } from 'react-number-format';
import { useForm } from 'react-hook-form';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para controlar o produto selecionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

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

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const form = useForm();
  const { register, reset, getValues } = form;

  return (
    <section className='searchProductPage d-flex flex-column justify-content-start align-items-center'>
      <div className="display-user">
        <h1>Lista de Produtos</h1>
      </div>
      <div className='searchProduct w-50 d-flex justify-content-center' >
        <Form.Control
          type="text"
          placeholder='Buscar produto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='display_products w-50 d-flex justify-content-center align-items-center'>
        <table className='productsTable table table-striped text-center'>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productID}>
                <td>{product.name}</td>
                <td>{product.version}</td>
                <td>{product.categoryName}</td>
                <td>{product.quantity}</td>
                <td>
                  <NumericFormat value={product.price} allowNegative={false} fixedDecimalScale decimalScale={2} displayType={'text'} prefix={'R$ '} />
                </td>
                <td>
                  <button className="btn-global btn-profile btn-hv" onClick={() => openModal(product)} >
                    <AiFillEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        centered
        show={showModal}
        onHide={closeModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <div className='line d-flex'>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-25">
                  <label htmlFor="product_name">Id</label>
                  <Form.Control
                    value={selectedProduct.productID}
                    type='text'
                    disabled
                  />
                </Form.Group>

                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label htmlFor="product_name">Nome</label>
                  <Form.Control
                    value={selectedProduct.name}
                    type='text'
                    disabled
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-50">
                  <label htmlFor="product_name">Versao</label>
                  <Form.Control
                    value={selectedProduct.version}
                    type='text'
                    disabled
                  />
                </Form.Group>
              </div>
              <div className='line d-flex'>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-50">
                  <label htmlFor="product_name">Categoria</label>
                  <Form.Control
                    value={selectedProduct.categoryName}
                    type='text'
                    disabled
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label htmlFor="product_name">Quantidade</label>
                  <Form.Control
                    value={selectedProduct.quantity}
                    type='text'
                    disabled
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label htmlFor="product_name">Preço</label>
                  <Form.Control
                    value={selectedProduct.price}
                    type='text'
                    disabled
                  />
                </Form.Group>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ListProducts;
