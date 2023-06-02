import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import apiGold from "../api.js";

export async function generatePDFOrder() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const orderID = 47;

  async function getOrder() {
    let result = await await apiGold.get(`/Order/${orderID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.data;
  }

  const data = await getOrder();

  const reportTitle = [
    {
      text: `Pedido n°${data.result.orderID}`,
      alignment: "center",
      fontSize: 24,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dados = data.result.orderProducts.map((itemPedido) => {
    return [
      { text: itemPedido.productID, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: itemPedido.productName, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: itemPedido.quantity, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: `R$${itemPedido.finalPrice.toFixed(2)}`,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: `R$${(itemPedido.finalPrice * itemPedido.quantity).toFixed(2)}`,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      text: "Dados do cliente",
      style: "subheader",
    },
    `Nome: ${data.result.client.name}`,
    `CPF: ${data.result.client.cpf}`,
    `E-mail: ${data.result.client.email}`,
    `Telefone celular: ${data.result.client.cellPhone}`,
    `Telefone fixo: ${data.result.client.landlinePhone}`,
    "\n\n\n",
    {
      text: "Endereço de entrega",
      style: "subheader",
    },
    `CEP: ${data.result.address.cep}`,
    `Endereço: ${data.result.address.addressName}`,
    `Número: ${data.result.address.number}`,
    `Complemento: ${data.result.address.complement}`,
    `Bairro: ${data.result.address.district}`,
    `Cidade: ${data.result.address.city}`,
    `Estado: ${data.result.address.uf}`,
    "\n\n\n",
    {
      text: "Dados do pedido",
      style: "subheader",
    },
    `Data do pedido: ${new Date(data.result.orderDate).toLocaleDateString()}`,
    `Método de pagamento: ${data.result.paymentMethod}`,
    `Vendedor: ${data.result.userName}`,
    `Previsão de entrega: ${new Date(
      data.result.deliveryForecast
    ).toLocaleDateString()}`,
    `Total: R$${data.result.total.toFixed(2)}`,
    "\n\n",
    {
      table: {
        headerRows: 1,
        widths: ["", "", "", "", "*"],
        body: [
          [
            { text: "ID", style: "tableHeader", fontSize: 12 },
            { text: "Produto", style: "tableHeader", fontSize: 12 },
            { text: "Quantidade", style: "tableHeader", fontSize: 12 },
            { text: "Unitário", style: "tableHeader", fontSize: 12 },
            { text: "Total", style: "tableHeader", fontSize: 12 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitios = {
    info: {
      title: `Pedido n°${data.result.orderID}`,
    },
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    styles: {
      subheader: {
        fontSize: 18,
        alignment: "center",
        color: "#3100A9",
      },
    },
    footer: Rodape,
  };

  async function sendEmail(form) {
    let emailResponse = await apiGold.post(`/Mail`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return emailResponse;
  }

  var pdf = pdfMake.createPdf(docDefinitios);
  console.log(pdf);

  const form = new FormData();
  form.append("OrderID", orderID);
  form.append("Email", data.result.client.email);
  form.append("Document", pdf + ";type=application/pdf");

  const emailResponse = await sendEmail(form);
  console.log(emailResponse);
}