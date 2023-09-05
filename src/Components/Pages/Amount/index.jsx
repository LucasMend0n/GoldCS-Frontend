import "./Amount.css";
import { useState, useEffect } from "react";
import apiGold from "../../../Services/api.js";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Amount = () => {
  const [products, setProducts] = useState([]);

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
    if (qtde <= 0) {
      toast.error("Quantidade inválida!");
      e.target.qtd.value = "";
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
      }
    };

    postAmount();
  }

  return (
    <section className="AmountPage">
      <form onSubmit={submit}>
        <h1>Inserir Estoque</h1>
        <div className="formSelect">
          <label htmlFor="product">Produto</label>
          <select name="product">
            {products.map((product) => (
              <option key={product.productID} value={product.productID}>
                {product.name} - {product.version}
              </option>
            ))}
            ;
          </select>
        </div>
        <label htmlFor="qtd">Quantidade</label>
        <input type="number" name="qtd" />
        <button>Enviar</button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Amount;
