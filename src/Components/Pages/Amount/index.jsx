import "./Amount.css";
import { useState, useEffect } from "react";
import apiGold from "../../../Services/api.js";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

const Amount = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const response = await apiGold.get("/Product/WithoutPagination");     
      setProducts(response.data.result);
    };
    getProducts();
  }, []);

  products.map((product) => {
    if (product.version === "-") {
      product.version = "";
    }
  });

  function submit(e) {
    e.preventDefault();

    const qtde = e.target.qtd.value;
    if (selectedProduct === "") {
      toast.error("Selecione um produto válido!");
      setSelectedProduct("");
      return;
    }
    if (qtde <= 0) {
      toast.error("Quantidade inválida!");
      e.target.qtd.value = "";
      setSelectedProduct("");
      return;
    }

    var json = JSON.stringify({
      productID: e.target.product.value,
      quantity: e.target.qtd.value,
    });
    const postAmount = async () => {
      const response = await apiGold.post("/Product/insertAmount", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        toast.info("Estoque inserido com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        e.target.qtd.value = "";
        setSelectedProduct("");
      }
    };

    postAmount();
  }

  return (
    <section className="AmountPage d-flex flex-column mb-3 justify-content-start align-items-center">
      <div className='display-user'><h2>Estoque</h2></div>

      <form onSubmit={submit} className="d-flex flex-column my-3 justify-content-start p-5 w-50">
        <div className="form_header d-flex flex-column mt-5 mb-3 justify-content-start align-items-center">
          <h3>INSERIR ESTOQUE</h3>
        </div>
        <div className="formContent d-flex flex-column justify-content-center align-items-center">
          <div className="formSelect w-75">
            <Form.Select
              size="lg"
              name="product"
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value={""}>Produto...</option>
              {products.map((product) => (
                <option key={product.productID} value={product.productID}>
                  {product.name} - {product.version}
                </option>
              ))}
              ;
            </Form.Select>
          </div>
          <div className="form_submit  w-75 d-flex ">

            <Form.Control
              id="qtd"
              placeholder="Quantidade..."
              type="number"
              name="qtd"
            />
            <button className="btn-global btn-amount w-50 mx-3">ADICIONAR</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </section >
  );
};

export default Amount;
