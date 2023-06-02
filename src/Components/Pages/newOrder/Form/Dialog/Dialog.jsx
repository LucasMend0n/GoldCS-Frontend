import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import apiGold from '../../../../../Services/api';

const RDialog = ({ onAddProduct }) => {

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

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = (data) => {
        if (data['pd-product'] !== "0") {
            onAddProduct(data)
        }
        reset()
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

                        <form onSubmit={handleSubmit(onSubmit)} className='dialogForm'>
                            <label htmlFor="pd-productID">Produtos</label>

                            <select {...register('pd-productID')}>
                                <option key={0} value={0}> Selecione um dos Produtos da Lista... </option>

                                {products.map((product) => (
                                    <option key={product.productID} value={`${product.productID}-${product.name}-${product.version}`}>
                                        {product.name} - {product.version}
                                    </option>
                                ))};

                            </select>
                            <label htmlFor="pd-qtd">Quantidade</label>
                            <input
                                {...register('pd-qtd')}
                                type='number'
                                placeholder='Quantidade...'
                            />
                            <label htmlFor="pd-price">Preço</label>
                            <input
                                {...register('pd-price')}
                                type='text'
                                placeholder='Preço...'
                            />
                            <button>Adicionar produto</button>
                        </form>

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