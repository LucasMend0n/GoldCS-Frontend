import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useState } from 'react';
import { useEffect } from 'react';
import apiGold from '../../../../../Services/api';

const RDialog = ({ onAddProduct }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('')
    const [qtd, setQtd] = useState(0)
    const [price, setPrice] = useState(0)

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
            qtd,
            price,
        }
        onAddProduct(data);
        resetFields();
    }

    const resetFields = () => {
        setProduct('');
        setQtd(0);
        setPrice(0);
    }


    return (
        <div className='DIALOG'>
            <Dialog.Root>
                <Dialog.Trigger>
                    +
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Adicionar produto ao carrinho</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Selecione um produto, um preço e uma quantidade ao carrinho...
                        </Dialog.Description>

                        <div className="Fields">
                            <label htmlFor="product">Produtos</label>

                            <select name='product' value={product} onChange={(e) => setProduct(e.target.value)} >

                                <option key={0} value={0}>
                                    Selecione um dos Produtos da Lista...
                                </option>

                                {products.map((product) => (
                                    <option key={product.productID} value={`${product.productID}-${product.name}-${product.version}`}>
                                        {product.name} - {product.version}
                                    </option>
                                ))};

                            </select>
                            <label htmlFor="quantity">Quantidade</label>
                            <input
                                name='quantity'
                                value={qtd}
                                onChange={(e) => setQtd(e.target.value)}
                                type='number'
                                placeholder='Quantidade...'
                            />
                            <label htmlFor="price">Preço</label>
                            <input
                                name='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type='text'
                                placeholder='Preço...'
                            />


                            <button type='button' onClick={sendProducts}>Adicionar produto</button>
                        </div>

                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button className="Button green">Fechar</button>
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