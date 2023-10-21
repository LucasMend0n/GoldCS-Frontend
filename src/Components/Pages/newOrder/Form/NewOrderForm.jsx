import { useForm } from "react-hook-form";
import "./Form.css";
import RDialog from "./Dialog/Dialog";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import apiGold from "../../../../Services/api.js";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserLocalStorage } from "../../../../context/util";
import MaskedInput from "react-text-mask";
import { Form } from "react-bootstrap";

const NewOrderForm = () => {
  const [orderProducts, setOrderProducts] = useState([]);

  const form = useForm();
  const { register, setValue, setFocus, reset } = form;

  const formRef = useRef(null);

  const checkCEP = () => {
    const cep = formRef.current["adr-postcode"].value.replace(/\D/g, "");

    if (!cep) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("adr-street", data.logradouro);
        setValue("adr-district", data.bairro);
        setValue("adr-city", data.localidade);
        setValue("adr-uf", data.uf);
        setFocus("adr-number");
      });
  };

  const handleAddProducts = (products) => {
    const selected = products["product"].split("-");
    const productObject = {
      id: selected[0],
      name: selected[1],
      version: selected[2],
      price: products["price"],
      quantity: products["qtd"],
    };
    setOrderProducts([...orderProducts, productObject]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...orderProducts];
    updatedProducts.splice(index, 1);
    setOrderProducts(updatedProducts);
  };

  const checkCPF = (e) => {
    e.preventDefault();

    const cpf = formRef.current["cl-id"].value;
    if (cpf !== "") {
      const searchClient = async () => {
        try {
          const response = await apiGold.get(`/Client/${cpf}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success === true) {
            formRef.current["cl-name"].value = response.data.result.name;
            formRef.current["cl-email"].value = response.data.result.email;
            formRef.current["cl-celphone"].value = response.data.result.cellPhone;
            formRef.current["cl-landPhone"].value = response.data.result.landlinePhone;
          }
        } catch (e) {

        }
      };

      searchClient();
    }
  };

  const limparForm = (e) =>{
    e.preventDefault(); 
    setOrderProducts([])
    reset(); 
  }

  const enviarPedido = (e) => {
    e.preventDefault();
    const client = {
      cpf: formRef.current["cl-id"].value,
      name: formRef.current["cl-name"].value,
      email: formRef.current["cl-email"].value,
      cellphone: formRef.current["cl-celphone"].value,
      landlinePhone: formRef.current["cl-landPhone"].value,
    };

    const address = {
      cep: formRef.current["adr-postcode"].value,
      addressName: formRef.current["adr-street"].value,
      city: formRef.current["adr-city"].value,
      district: formRef.current["adr-district"].value,
      uf: formRef.current["adr-uf"].value,
      number: formRef.current["adr-number"].value,
      complement: formRef.current["adr-complement"].value,
    };

    var products = [];
    orderProducts.forEach((product) => {
      products.push({
        productID: product.id,
        quantity: product.quantity,
        finalPrice: product.price,
      });
    });

    const user = getUserLocalStorage()

    const order = {
      paymentMethod: formRef.current["od-payment"].value,
      deliveryForecast: formRef.current["od-uptoDate"].value,
      userId: user.userId,
      client: client,
      address: address,
      orderProducts: products,
    };

    const postOrder = async () => {
      const response = await apiGold.post("/Order", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        toast.info(
          `Pedido inserido com sucesso - ID: ${response.data.result}!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        const response2 = await apiGold.post(`/Mail/${response.data.result}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response2.data.success === true) {
          console.log("Email enviado com sucesso!");
        }

        reset()
        window.scrollTo(0, 0);
        setOrderProducts([])
      }
    };

    postOrder();
  };

  return (
    <>
      <form className="newOrderForm d-flex flex-column justify-content-center mx-auto" ref={formRef}>
        <h1>Novo Pedido</h1>

        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom">Informações do cliente</h3>
          <div className="form_line d-flex " >
            <Form.Group className="d-flex flex-column">
              <label htmlFor="cl-id"> CPF </label>
              <Form.Control
                {...register("cl-id")}
                type="text"
                as={MaskedInput}
                placeholder="Digite o CPF do cliente"
                name="cl-id"
                onBlur={checkCPF}
                id="cl-id"
                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column" >
              <label htmlFor="cl-name"> Nome </label>
              <Form.Control
                {...register("cl-name")}
                type="text"
                placeholder="Digite o nome do cliente"
                name="cl-name"
                id="cl-name"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="cl-email"> Email </label>
              <Form.Control
                {...register("cl-email")}
                type="email"
                placeholder="Digite o email do cliente"
                name="cl-email"
                id="cl-email"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="cl-celphone"> Telefone celular </label>
              <Form.Control
                {...register("cl-celphone")}
                type="text"
                placeholder="Digite o celular do cliente"
                name="cl-celphone"
                id="cl-celphone"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="cl-landPhone"> Telefone Fixo </label>
              <Form.Control
                {...register("cl-landPhone")}
                type="text"
                placeholder="Digite o telefone fixo do cliente"
                name="cl-landPhone"
                id="cl-landPhone"
              />
            </Form.Group>
          </div>
        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom">Endereço do cliente</h3>
          <div className="form_line d-flex ">
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-postcode">CEP</label>
              <Form.Control
                {...register("adr-postcode")}
                as={MaskedInput}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                type="text"
                placeholder="Digite o CEP do cliente"
                id="adr-postcode"
                onBlur={checkCEP}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-street">Rua</label>
              <Form.Control
                {...register("adr-street")}
                type="text"
                placeholder=""
                disabled={true}
                id="adr-street"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-number">Numero</label>
              <Form.Control
                {...register("adr-number")}
                type="text"
                placeholder="Digite o número do cliente"
                id="adr-number"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-complement">Complemento</label>
              <Form.Control
                {...register("adr-complement")}
                type="text"
                placeholder="Digite o complemento do cliente"
                id="adr-complement"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-city">Cidade</label>
              <Form.Control
                {...register("adr-city")}
                type="text"
                placeholder=""
                disabled={true}
                id="adr-city"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-district">Bairro</label>
              <Form.Control
                {...register("adr-district")}
                type="text"
                placeholder=""
                disabled={true}
                id="adr-district"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="adr-uf">UF</label>
              <Form.Control
                {...register("adr-uf")}
                type="text"
                placeholder=""
                disabled={true}
                id="adr-uf"
              />
            </Form.Group>
          </div>
        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom">Carrinho de produtos</h3>

          {orderProducts.length === 0 ? (
            <p id="noProducts">Nenhum produto no carrinho</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Versão</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.version}</td>
                    <td>
                      <NumericFormat
                        value={product.price}
                        displayType={"text"}
                        prefix={"R$ "}
                      />
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <button type="button" onClick={() => handleRemoveProduct(index)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <RDialog onAddProduct={handleAddProducts} />
        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom">Informações do pedido</h3>
          <div className="form_line d-flex ">
            <Form.Group className="d-flex flex-column">
              <label htmlFor="od-uptoDate">Data de entrega prevista</label>
              <Form.Control type="date" {...register("od-uptoDate")} />
            </Form.Group>
            <Form.Group className="d-flex flex-column">
              <label htmlFor="od-payment">Forma de pagamento</label>
              <Form.Select
                {...register("od-payment")}
              >
                <option value={""}>Selecione a forma de pagamento...</option>
                <option value={"Pix"}>Pix</option>
                <option value={"Débito"}>Débito</option>
                <option value={"Crédito"}>Crédito</option>
                <option value={"Dinheiro"}>Dinheiro</option>
                <option value={"Cheque"}>Cheque</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button onClick={limparForm}>Limpar</button>
          <button onClick={enviarPedido}>Enviar</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewOrderForm;
