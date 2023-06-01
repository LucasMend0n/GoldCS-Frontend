import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import apiGold from '../../../../Services/api';

const RDialog = ({onUpdateOrderProducts}) => {

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

    const { register } = useForm()

    return (
        <div className='DIALOG'>
            <Dialog.Root>
                <Dialog.Trigger>
                    +
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Adicionar Produto ao pedido</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Adicione Produtos e insira uma quantidade neles
                        </Dialog.Description>
                        <form className='dialogForm'>
                            <label htmlFor="pd-products">Produtos</label>
                            <select name='pd-products'>
                                <option key={0} value={0}> Selecione um dos Produtos da Lista... </option>
                                {products.map((product) => (

                                    <option key={product.productID} value={product.productID}>
                                        {product.name} - {product.version}
                                    </option>
                                ))};
                            </select>
                            <label htmlFor="pd-qtd">Quantidade</label>
                            <input
                                {...register('pd-qtd')}
                                name='pd-qtd'
                                type='number'
                                placeholder='Quantidade...'
                            />
                            <label htmlFor="pd-price">Preço</label>
                            <input
                                {...register('pd-price')}
                                type='text'
                                placeholder='Preço...'
                            />
                        </form>

                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button onClick={onUpdateOrderProducts} className="Button green">Adicionar Produto</button>
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