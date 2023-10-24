import { useForm } from "react-hook-form";
import "./Form.css";
import RDialog from "./Dialog/Dialog";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import apiGold from "../../../../Services/api.js";
import {ImBin2} from 'react-icons/im'


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

  const limparForm = (e) => {
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
      <form className="newOrderForm d-flex flex-column justify-content-center my-5 p-5" ref={formRef}>
        <h1 className="mb-4">Novo Pedido</h1>

        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom mb-3 pb-3">Dados do cliente</h3>
          <div className="form_line justif d-flex mb-4">
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="cl-id"> CPF </label>
              <Form.Control
                {...register("cl-id")}
                type="text"
                as={MaskedInput}
                name="cl-id"
                onBlur={checkCPF}
                id="cl-id"
                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
              />
            </Form.Group>
            <Form.Group className="d-flex w-25 flex-column px-2" >
              <label htmlFor="cl-name"> Nome </label>
              <Form.Control
                {...register("cl-name")}
                type="text"
                name="cl-name"
                id="cl-name"
              />
            </Form.Group>
            <Form.Group className="d-flex w-25 flex-column px-2">
              <label htmlFor="cl-email"> Email </label>
              <Form.Control
                {...register("cl-email")}
                type="email"
                name="cl-email"
                id="cl-email"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="cl-celphone"> Telefone celular </label>
              <Form.Control
                {...register("cl-celphone")}
                type="text"
                name="cl-celphone"
                id="cl-celphone"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="cl-landPhone"> Telefone Fixo </label>
              <Form.Control
                {...register("cl-landPhone")}
                type="text"
                name="cl-landPhone"
                id="cl-landPhone"
              />
            </Form.Group>
          </div>
        </div>

        <div className="form_section_horizontal  d-flex flex-column">
          <h3 className="w-100 border-bottom mb-3 pb-3">Endereço do cliente</h3>
          <div className="form_line d-flex mb-4 ">
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-postcode">CEP</label>
              <Form.Control
                {...register("adr-postcode")}
                as={MaskedInput}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                type="text"
                id="adr-postcode"
                onBlur={checkCEP}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-street">Rua</label>
              <Form.Control
                {...register("adr-street")}
                type="text"
                disabled={true}
                id="adr-street"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-number">Numero</label>
              <Form.Control
                {...register("adr-number")}
                type="text"
                id="adr-number"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-complement">Complemento</label>
              <Form.Control
                {...register("adr-complement")}
                type="text"
                id="adr-complement"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-city">Cidade</label>
              <Form.Control
                {...register("adr-city")}
                type="text"
                placeholder=""
                disabled={true}
                id="adr-city"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-uf">UF</label>
              <Form.Control
                {...register("adr-uf")}
                type="text"
                disabled={true}
                id="adr-uf"
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adr-district">Bairro</label>
              <Form.Control
                {...register("adr-district")}
                type="text"
                disabled={true}
                id="adr-district"
              />
            </Form.Group>
          </div>
        </div>
        <div className="form_section_horizontal  d-flex flex-column">
          <h3 className="w-100 border-bottom mb-3 pb-3">Carrinho de produtos</h3>
          <div className="form_table_line d-flex justify-content-center align-items-center p-3 mb-4 ">
            {orderProducts.length === 0 ? (
              <p id="noProducts">Nenhum produto no carrinho</p>
            ) : (
              <table className="my-3 purchaseCart">
                <thead>
                  <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Versão</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody className="">
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
                        <button type="button" className="btn-global btn-hv w-50" onClick={() => handleRemoveProduct(index)}>
                          <ImBin2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <RDialog onAddProduct={handleAddProducts} />

          </div>

        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className="w-100 border-bottom mb-3 pb-3">Dados do pedido</h3>
          <div className="form_line d-flex mb-4">
            <Form.Group className="d-flex flex-column px-3">
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
          <button className="btn-global btn btn-outline-danger btn-profile" onClick={limparForm}>Limpar</button>
          <button className="btn-global btn-profile mx-3" onClick={enviarPedido}>Enviar</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewOrderForm;
