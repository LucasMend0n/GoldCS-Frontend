import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useState } from 'react';
import { useEffect } from 'react';
import apiGold from '../../../../../Services/api';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { ImBin2 } from 'react-icons/im';


const RDialog = ({ onAddProduct }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('')
    const [qtd, setQtd] = useState('')
    const [price, setPrice] = useState('')
    const [productMinValue, setProductMinValue] = useState();

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

    const sendProducts = (e) => {
        e.preventDefault();
        if (product == '') {
            toast.error("Selecione um produto!");
            return
        }else if (qtd < 0) {
            toast.error("Quantidade inválida!");
            return
        } else if (price < productMinValue) {
            toast.error("Produto com valor abaixo do permitido!");
            return
        } else {
            const data = {
                product,
                qtd,
                price,
            }
            onAddProduct(data);
        }
        resetFields();
    }

    const resetFields = () => {
        setProduct('');
        setQtd('');
        setPrice('');
    }

    function getProductMinimumValue(selectValue) {
        setProduct(selectValue);
        const productSelected = selectValue.split("-");
        const idSelected = productSelected[0];
        let minmumValue;

        products.map((productIndex) => {
            if (productIndex.productID == idSelected) {
                minmumValue = productIndex.price
            }
        })
        setProductMinValue(minmumValue);
    }


    return (
        <div className='DIALOG'>
            <Dialog.Root>
                <Dialog.Trigger id='yellow_button' className='btn-global'>
                    +
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay p-5" />
                    <Dialog.Content className="DialogContent px-5 py-5">
                        <Dialog.Title className="DialogTitle">Adicionar produto ao carrinho</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Selecione um produto, um preço e uma quantidade ao carrinho...
                        </Dialog.Description>

                        <div className="Fields mb-4">
                            <Form.Group className="d-flex my-2 flex-column px-2">
                                <label htmlFor="product">Produtos</label>
                                <Form.Select
                                    name='product'
                                    value={product}
                                    onChange={(e) => getProductMinimumValue(e.target.value)}
                                >
                                    <option key={0} value={0}>
                                        Selecione um dos Produtos da Lista...
                                    </option>

                                    {products.map((product) => (
                                        <option key={product.productID} value={`${product.productID}-${product.name}-${product.version}`}>
                                            {product.name} - {product.version}
                                        </option>
                                    ))};

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="d-flex my-2 flex-column px-2">
                                <label>Quantidade</label>
                                <Form.Control
                                    name='quantidade'
                                    value={qtd}
                                    onChange={(e) => setQtd(e.target.value)}
                                    type='number'
                                    placeholder='Quantidade...'
                                />

                            </Form.Group>
                            <Form.Group className="d-flex my-2 flex-column px-2">
                                <label htmlFor="price">Preço</label>
                                <Form.Control
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    name='preco'
                                    type='number'
                                    placeholder='Preço...'
                                />
                            </Form.Group>
                        </div>
                        <div className='end_buttons d-flex justify-content-between'>
                            <button className='btn-global btn-hv w-50' type='button' onClick={sendProducts}>Adicionar produto</button>
                            <button className='btn btn-danger btn-hv ' type='button' onClick={resetFields}><ImBin2 /></button>
                        </div>

                        <Dialog.Close asChild>
                            <button className="IconButton btn btn-outline-danger" aria-label="Close">
                                X
                            </button>
                        </Dialog.Close>

                    </Dialog.Content>

                </Dialog.Portal>
            </Dialog.Root>
            <ToastContainer />

        </div>

    )

};

export default RDialog;