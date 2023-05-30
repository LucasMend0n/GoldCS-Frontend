import * as Dialog from '@radix-ui/react-dialog'
import './Dialog.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const RDialog = () => {

    const { register } = useForm()
    const [camposExtras, setCamposExtras] = useState([]);

    const adicionarCampo = (e) => {
        e.preventDefault()
        setCamposExtras([...camposExtras, '']);
    };

    const handleChange = (valor, indice, campo) => {
        const novosCamposExtras = [...camposExtras];
        novosCamposExtras[indice][campo] = valor;
        setCamposExtras(novosCamposExtras);
    };

    const removerCampo = () => {
        setCamposExtras([]);
    };

    const saveItems = () =>{
        setCamposExtras([])
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
                        <Dialog.Title className="DialogTitle">Adicionar Produtos</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Adicione Produtos e insira uma quantidade neles
                        </Dialog.Description>

                        <form className='dialogForm'>

                            <label htmlFor="pd-products">Produtos</label>

                            <select name='pd-products'>
                            </select>


                            <label htmlFor="pd-qtd">Quantidade</label>
                            <input
                                {...register('pd-qtd')}
                                name='pd-qtd'
                                type='number'
                                placeholder='Quantidade...'
                            />

                            {camposExtras.map((campo, indice) => (
                                <div className='DynamicFields' key={indice}>
                                    <label>
                                        Produto
                                    </label>
                                    <select
                                        value={campo.selectValue}
                                        onChange={(e) =>
                                            handleChange(e.target.value, indice, 'selectValue')
                                        }
                                    >
                                    </select>
                                    <label>
                                        Quantidade
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Quantidade...'
                                        value={campo.inputValue}
                                        onChange={(e) =>
                                            handleChange(e.target.value, indice, 'inputValue')
                                        }
                                    />

                                </div>
                            ))}

                            <div className='AddMoreItems'>
                                <button onClick={adicionarCampo}> + </button>
                            </div>
                        </form>


                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button onClick={saveItems} className="Button green">Adicionar Produtos</button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button onClick={removerCampo} className="IconButton" aria-label="Close">
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