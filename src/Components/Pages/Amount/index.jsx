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
      const response = await apiGold.get("/Product");
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
    <section className="AmountPage">
      <form onSubmit={submit}>
        <h1>INSERIR ESTOQUE</h1>
        <div className="formContent">

          <div className="formSelect">
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
          <div className="form_submit">

            <Form.Control
              id="qtd"
              placeholder="Quantidade..."
              type="number"
              name="qtd"
            />
            <button className="btn-global" id="submit-amount">ADICIONAR</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </section >
  );
};

export default Amount;
