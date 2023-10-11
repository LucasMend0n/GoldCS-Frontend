import React, { useState } from 'react'
import './Profile.css'
import { FloatingLabel, Form, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { getUserLocalStorage } from '../../../context/util'
import apiGold from '../../../Services/api'

const Profile = () => {

    const browserUser = getUserLocalStorage();

    const profileForm = useForm({
        defaultValues: {
            user_name: browserUser.name,
            user_email: browserUser.email,
            user_password: "",
            confirm_password: ""
        }
    });

    const { register, setValue, getValues } = profileForm;

    const [isDisable, setIsDisable] = useState(true);

    const editForm = (e) => {
        e.preventDefault();
        if (isDisable === false) {
            setValue("user_name", browserUser.name);
            setValue("user_email", browserUser.email);
            setValue("user_password", "");
            setValue("confirm_password", "");
        }
        setIsDisable(!isDisable);
    }
    const isFieldEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    const enviarAlteracoes = async (e) => {
        e.preventDefault();
        try {
            const name = getValues("user_name");
            const email = getValues("user_email");
            const pwd = getValues("user_password");
            const confirmPwd = getValues("confirm_password");

            let submittedData = {}
            
            let formValues ={
                name: name, 
                email: email, 
                password: pwd
            }

            for (const key in formValues) {
                if (isFieldEmpty(formValues[key])) {
                    delete formValues[key];
                }
                submittedData = formValues;
            }
            console.log(submittedData);
            // const id = browserUser.userId;
            // const response = await apiGold.put(`Authenticate/Update/${id}`, profileData);
            // if (response.data.success) {
            //     console.log("DEU CERTO");
            // }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className='profile_page d-flex flex-column mb-3 justify-content-start align-items-center'>
                <div className='display-user'><h2>Perfil</h2></div>

                <Form onSubmit={enviarAlteracoes} className='profile_form d-flex flex-column mb-3 justify-content-center '>
                    <div className="form_header d-flex flex-column my-5 justify-content-center align-items-start">
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
                        >
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
                    <div className='form-buttons d-flex justify-content-center my-3'>
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