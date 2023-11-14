import { Form, Spinner } from 'react-bootstrap'
import './NewProduct.css'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import apiGold from '../../../../Services/api';
const NewProduct = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await apiGold.get("/Category");
      setCategories(response.data.result);
    };
    getProducts();
  }, []);

  const form = useForm();
  const { register, reset, getValues } = form;

  const isEveryInputEmpty = () => {
    var inputs = document.querySelectorAll('input');
    for (const input of inputs)
      if (input.value !== '') return false;
    return true;
  }

  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage);
    setIsLoading(false)

  }

  const isPricePositive = () => {
    var price = getValues('product_price');
    if (price != '') {
      if (price > 0) {
        return true
      }
    }
    return false;
  }

  const handleClikSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var product = {
      name: getValues('product_name'),
      version: getValues('product_version'),
      price: parseFloat(getValues('product_price')),
      categoryID: getValues('product_category')
    }
    try {
      //validações para produto
      if (isEveryInputEmpty()) {
        showErrorToast("É necessário preencher todos os campos!");
        return
      } else {
        if (!isPricePositive()) {
          showErrorToast("O produto deve ter um preço válido!")
          return
        }
        if (getValues('product_name') === '') {
          showErrorToast('É necessário dar um nome ao produto');
          return
        }
        if (getValues('product_version') === '') {
          showErrorToast('É necessário dar uma especificação ao produto');
          return
        }
        if (getValues('product_price') === '') {
          showErrorToast('É necessário dar um preço para o produto');
          return
        }
        if (getValues('product_category') === '0') {
          showErrorToast('Selecione uma categoria para o produto');
          return
        }
      }

      //request para api
      const productPost = await apiGold.post('/Product', product);
      if (productPost.data.success === true) {
        toast.info("Produto adicionado!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

    } catch (error) {
      console.log(error)
    }
    //reset da pagina ao conseguir fazer o post
    finally {
      setIsLoading(false);
      reset();
    }

  }
  const handleClearForm = (e) => {
    e.preventDefault();
    reset();
  }

  return (
    <>
      <section className='NewProductPage d-flex flex-column justify-content-start align-items-center'>
        <div className='display-user'><h2>Produto</h2></div>

        <form onSubmit={handleClikSubmit} className="newProductForm d-flex flex-column justify-content-center my-5 p-5">
          <h1 className="mb-4">Novo Produto</h1>
          <div className="mb-4">
            <Form.Group className="d-flex flex-column px-2 mb-2">
              <label htmlFor="product_name">Nome</label>
              <Form.Control
                {...register("product_name")}
                type='text'
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2 mb-4">
              <label htmlFor="product_version">Especificação</label>
              <Form.Control
                {...register("product_version")}
                type='text'
                disabled={loading}
              />
            </Form.Group>
            <div className='className="form_line d-flex mb-4 '>
              <Form.Group className="d-flex flex-column px-2 w-25">
                <label htmlFor="product_price">Preço</label>
                <Form.Control
                  {...register("product_price")}
                  type='text'
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="d-flex flex-column w-75 px-2">
                <label htmlFor="product_category">Categoria</label>
                <Form.Select
                  {...register("product_category")}
                  type='text'
                  disabled={loading}
                >
                  <option value={"0"}>Selecione a categoria do produto...</option>
                  {categories.map((category) => (
                    <option key={category.categoryID} value={category.categoryID}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button id='search_order' className="w-25 btn-global btn-profile" onClick={handleClearForm} disabled={loading}>Limpar</button>
            <button type='sumbit' className="w-25 btn-global btn-profile mx-3" disabled={loading}>
              {loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <> Adicionar Produto </>}
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  )
}

export default NewProduct