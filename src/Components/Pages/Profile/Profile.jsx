import React, { useState } from 'react'
import './Profile.css'
import { FloatingLabel, Form, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { getUserLocalStorage } from '../../../context/util'

const Profile = () => {

    const browserUser = getUserLocalStorage();

    const profileForm = useForm({
        defaultValues: {
            user_name: browserUser.name,
            user_email: browserUser.email,
        }
    });

    const { register, setValue } = profileForm;

    const [isDisable, setIsDisable] = useState(true);

    const editForm = (e) => {
        e.preventDefault();
        if(isDisable === false){
            setValue("user_name", browserUser.name); 
            setValue("user_email", browserUser.email); 
            setValue("user_password", ""); 
            setValue("confirm_password", ""); 
        }
        setIsDisable(!isDisable);
    }

    return (
        <>
            <section className='profile_page d-flex flex-column mb-3 justify-content-start align-items-center'>
                <div className='display-user'><h2>Perfil</h2></div>

                <Form className='profile_form d-flex flex-column mb-3 justify-content-center '>
                    <div className="form_header d-flex flex-column mb-5 justify-content-center align-items-start">
                        <h3>Dados do seu usuário</h3>
                    </div>
                    <div>
                        <FloatingLabel
                            label="Nome"
                            className="mb-3"
                        >
                            <Form.Control
                                {...register("user_name")}
                                type='text'
                                placeholder=''
                                name='user_name'
                                disabled={isDisable}

                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control
                                {...register("user_email")}
                                type='email'
                                placeholder=''
                                name='user_email'
                                disabled={isDisable}

                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Nova senha"
                            className="mb-3"
                            password>
                            <Form.Control
                                {...register("user_password")}
                                type='password'
                                placeholder=''
                                name='user_password'
                                disabled={isDisable}

                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Confirmar senha"
                            className="mb-3"
                        >
                            <Form.Control
                                {...register("confirm_password")}
                                type='password'
                                placeholder=''
                                name='confirm_password'
                                disabled={isDisable}
                            />
                        </FloatingLabel>
                    </div>
                    <div className='form-buttons d-flex justify-content-center mt-3'>
                        <button className={`btn w-25 ${isDisable ? 'btn-outline-primary' : ' btn-outline-danger'}`} onClick={editForm}>
                            {isDisable ? 'Editar' : 'Cancelar'}
                        </button>
                        <button className="btn-global btn-profile w-25 mx-3" disabled={isDisable}>Salvar</button>

                    </div>
                </Form>
            </section>
        </>
    )
}

export default Profile