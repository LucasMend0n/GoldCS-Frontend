import { useEffect, useState } from 'react';
import './ListProducts.css'
import { Form, Modal, Spinner } from 'react-bootstrap'
import apiGold from '../../../../Services/api';
import { AiFillEye } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'


const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setIsloading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getProducts = async () => {
    const response = await apiGold.get("/Product/WithoutPagination");
    setProducts(response.data.result);
  };
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiGold.get("/Category");
      setCategories(response.data.result);
    };
    getCategories();
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
    const selectedCategory = categories.find(category => category.name === product.categoryName);
    if (selectedCategory) {
      setValue("product_category", selectedCategory.categoryID);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setIsDisable(true);
  };
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const productForm = useForm({});

  const { register, reset, getValues, setValue } = productForm;


  const editForm = e => {
    e.preventDefault();
    setIsDisable(!isDisable)
    if (isDisable === true) {
      setValue("product_name", "")
      setValue("product_version", "")
      setValue("product_price", "")
    } else {
      setValue("product_id", selectedProduct.productID)
      setValue("product_name", selectedProduct.name)
      setValue("product_version", selectedProduct.version)
      setValue("product_price", selectedProduct.price)
    }
    setIsDisable(!isDisable);
  }
  //validaçoes
  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage);
    setIsloading(false)
  }
  const isPriceValid = (price) => {
    if (price != '') {
      if (price != 0) {
        if (price > 0) {
          return true
        }
      }
    }
    return false;
  }

  //tratamento para remover inputs não alterados do json de update produto
  function removeEmptyFields(json) {
    for (const key in json) {
      if (json[key] && typeof json[key] === 'object') {
        removeEmptyFields(json[key]);
        if (Object.keys(json[key]).length === 0) {
          delete json[key];
        }
      } else if (json[key] === '' || json[key] === null || json[key] === undefined || Number.isNaN(json[key])) {
        delete json[key];
      }
      if (selectedProduct && json.categoryID === selectedProduct.categoryID) {
        delete json.categoryID;
      }
    }
    return json;
  }
  function isObjectEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  //requests
  const handlePutProduct = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const newProductID = getValues("product_id");
    var newProduct = {
      name: getValues('product_name'),
      version: getValues('product_version'),
      price: parseFloat(getValues('product_price')),
      categoryID: getValues('product_category')
    }
    try {
      var formattedNewProduct = removeEmptyFields(newProduct);
      if (isObjectEmpty(formattedNewProduct)) {
        showErrorToast("É necessário atualizar ao menos um campo!");
        return
      } else if (formattedNewProduct.price && (!isPriceValid(formattedNewProduct.price))) {
        showErrorToast("O preço deve ser válido!");
        return
      }

      const putResonse = await apiGold.put(`/Product/${newProductID}`, newProduct);
      if (putResonse.data.success) {
        toast.info(
          `Produto com id: ${newProductID}, foi atualizado com sucesso com sucesso!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        getProducts();
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setIsloading(false);
      setShowDeleteModal(false);
      setShowModal(false);
      setSelectedProduct(null);
      setIsDisable(true);
    }
  }
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const deleteProductID = getValues("product_id");
      const deleteResponse = await apiGold.delete(`/Product/${deleteProductID}`);
      if (deleteResponse.data.success) {
        toast.info(
          ` Produto com id: ${deleteProductID}, foi deletado com sucesso`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        getProducts();
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false);
      setShowDeleteModal(false);
      setShowModal(false);
      setSelectedProduct(null);
      setIsDisable(true);
    }
  }


  return (
    <>
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
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Versão</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Detalhes</th>
              </tr>
            </thead>
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
          size="lg"
          centered
          show={showModal}
          onHide={closeModal}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Dados do Produto</Modal.Title>
            <button
              title='Deletar produto'
              onClick={openDeleteModal}
              id='deleteButton'
              className='btn btn-danger btn-hv '
              disabled={loading}
            >
              <BsFillTrashFill />
            </button>
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
                    disabled={isDisable || loading}
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-50">
                  <label>Versao</label>
                  <Form.Control
                    {...register("product_version")}
                    type='text'
                    disabled={isDisable || loading}

                  />
                </Form.Group>
              </div>
              <div className='line d-flex'>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label>Categoria</label>
                  <Form.Select
                    {...register("product_category")}
                    disabled={isDisable || loading}
                  >
                    <option value={"0"}>Selecione a categoria do produto...</option>
                    {categories.map((category) => (
                      <option key={category.categoryID} value={category.categoryID}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label>Quantidade</label>
                  <Form.Control
                    {...register("product_qtd")}
                    type='text'
                    disabled
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column px-2 mb-2 w-75">
                  <label>Preço</label>
                  <Form.Control
                    {...register("product_price")}
                    type='text'
                    disabled={isDisable || loading}

                  />
                </Form.Group>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <div className='form_buttons mx-auto d-flex justify-content-center mt-2'>
              <button disabled={loading} className={` btn btn-profile w-25 ${isDisable ? 'btn-outline-primary' : ' btn-outline-danger'}`} onClick={editForm}>
                {isDisable ? 'Editar' : 'Cancelar'}
              </button>
              <button className="btn-global btn-profile w-25 mx-3" disabled={isDisable || loading} onClick={handlePutProduct}>
                {loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <>Salvar</>}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
        <Modal size="sm" centered show={showDeleteModal} onHide={() => setShowDeleteModal(false)} backdrop="static">
          <Modal.Body>
            <p>Deseja realmente excluir este produto?</p>
            <div className='form_buttons mx-auto d-flex justify-content-center mt-2'>
              <button className="btn btn-outline-danger btn-hv w-50" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button onClick={handleDeleteProduct} className="btn btn-danger btn-hv mx-3 w-75">
                {loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <> Excluir</>}
              </button>
            </div>
          </Modal.Body>
        </Modal>

      </section>
      <ToastContainer />
    </>
  );
}

export default ListProducts;
