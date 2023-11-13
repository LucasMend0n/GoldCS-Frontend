import { useEffect, useState } from 'react';
import './ListProducts.css'
import { Form, Modal, Spinner } from 'react-bootstrap'
import apiGold from '../../../../Services/api';
import { AiFillEye } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill } from 'react-icons/bs'

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setIsloading] = useState(null);

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
    reset({
      product_id: product.productID,
      product_name: product.name,
      product_version: product.version,
      product_categoryName: product.categoryName,
      product_qtd: product.quantity,
      product_price: product.price
    });
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const productForm = useForm({});

  const { register, reset, getValues, setValue } = productForm;


  const editForm = e => {
    e.preventDefault();
    setIsDisable(!isDisable)
    if (isDisable === true) {
      setValue("product_name", "")
      setValue("product_version", "")
      setValue("product_categoryName", "")
      setValue("product_qtd", "")
      setValue("product_price", "")
    } else {
      setValue("product_id", selectedProduct.productID)
      setValue("product_name", selectedProduct.name)
      setValue("product_version", selectedProduct.version)
      setValue("product_categoryName", selectedProduct.categoryName)
      setValue("product_qtd", selectedProduct.quantity)
      setValue("product_price", selectedProduct.price)
    }
    setIsDisable(!isDisable);
  }

  const openDeleteConfirmation = () => {
      setShowModalDelete(true)
  }
  const closeDeleteConfirmation = () => {
      setShowModalDelete(false)
  }

  const deleteProduct = () => {

  }

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

      {/*Inicio do modal de editar e excluir*/}
      <Modal
        centered
        show={showModal}
        onHide={closeModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Dados do Produto</Modal.Title>
          <button onClick={openDeleteConfirmation} className='deleteButton'><BsFillTrashFill /></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className='line d-flex'>
              <Form.Group className="d-flex flex-column px-2 mb-2 w-25">
                <label>Id</label>
                <Form.Control
                  {...register("product_id")}
                  type='text'
                  disabled
                />
              </Form.Group>

              <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                <label>Nome</label>
                <Form.Control
                  {...register("product_name")}
                  type='text'
                  disabled={isDisable}
                />
              </Form.Group>
              <Form.Group className="d-flex flex-column px-2 mb-2 w-50">
                <label>Versao</label>
                <Form.Control
                  {...register("product_version")}
                  type='text'
                  disabled={isDisable}

                />
              </Form.Group>
            </div>
            <div className='line d-flex'>
              <Form.Group className="d-flex flex-column px-2 mb-2 w-50">
                <label>Categoria</label>
                <Form.Control
                  {...register("product_categoryName")}
                  type='text'
                  disabled={isDisable}

                />
              </Form.Group>
              <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                <label>Quantidade</label>
                <Form.Control
                  {...register("product_qtd")}
                  type='text'
                  disabled={isDisable}

                />
              </Form.Group>
              <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                <label>Preço</label>
                <Form.Control
                  {...register("product_price")}
                  type='text'
                  disabled={isDisable}

                />
              </Form.Group>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <button className={` btn btn-profile w-25 ${isDisable ? 'btn-outline-primary' : ' btn-outline-danger'}`} onClick={editForm}>
            {isDisable ? 'Editar' : 'Cancelar'}
          </button>
          <button className="btn-global btn-profile w-25 mx-3" disabled={isDisable}>
            {loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <>Salvar</>}
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
      onShow={showModalDelete}
      onHide={closeDeleteConfirmation}
      >
        <p>Deseja realmente excluir o produto?</p>
        <button className={`btn btn-profile w-25 btn-danger`}>
          Sim
        </button>
        <button className="btn-global btn-profile btn-outline-danger w-25 mx-3" >
         Cancelar
        </button>
      </Modal>
    </section>
  );
}

export default ListProducts;
