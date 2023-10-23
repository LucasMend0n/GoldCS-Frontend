import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useState } from 'react';
import { useEffect } from 'react';
import apiGold from '../../../../../Services/api';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const RDialog = ({ onAddProduct }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('')
    const [qtd, setQtd] = useState(0)
    const [price, setPrice] = useState(0)

    const modalForm = useForm();
    const { register, getValues, reset } = modalForm;

    const formValues = getValues()
    const quantidade = getValues("quantidade")
    const preco = getValues("preco")

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
        const data = {
            product,
            quantidade,
            preco,
        }
        onAddProduct(data);
        resetFields();
        console.log(data, quantidade)
    }

    const resetFields = () => {
        setProduct('');
        reset()
    }


    return (
        <div className='DIALOG'>
            <Dialog.Root>
                <Dialog.Trigger className='open_dialog btn-global' id='yellow_button'>
                    +
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Adicionar produto ao carrinho</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Selecione um produto, um preço e uma quantidade ao carrinho...
                        </Dialog.Description>
                        <form>
                            <div className="Fields mb-4">
                                <Form.Group className="d-flex my-2 flex-column px-2">
                                    <label htmlFor="product">Produtos</label>
                                    <Form.Select
                                        name='product'
                                        value={product}
                                        onChange={(e) => setProduct(e.target.value)}
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
                                        {...register("quantidade")}
                                        name='quantidade'
                                        type='number'
                                        placeholder='Quantidade...'
                                    />

                                </Form.Group>
                                <Form.Group className="d-flex my-2 flex-column px-2">
                                    <label htmlFor="price">Preço</label>
                                    <Form.Control
                                        {...register("preco")}
                                        name='preco'
                                        type='number'
                                        placeholder='Preço...'
                                    />
                                </Form.Group>


                            </div>
                            <button type='button' className='btn-global btn-hv' onClick={sendProducts}>Adicionar produto</button>
                        </form>


                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button className="btn-global btn-hv">Fechar</button>
                            </Dialog.Close>
                        </div>

                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                X
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>

                </Dialog.Portal>
            </Dialog.Root>

        </div>

    )

};

export default RDialog;