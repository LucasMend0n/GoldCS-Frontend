import React, { useEffect, useState } from 'react'
import './Profile.css'
import { FloatingLabel, Form, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { getUserLocalStorage } from '../../../context/util'
import apiGold from '../../../Services/api'
import useAuth from '../../../hooks/useAuth'
import { Alert, Slide, Snackbar } from '@mui/material'

const Profile = () => {
    const auth = useAuth()
    const browserUser = getUserLocalStorage();

    const profileForm = useForm({
        defaultValues: {
            user_name: browserUser.name,
            user_email: browserUser.email,
            user_password: "",
            confirm_password: ""
        }
    });

    const { register, setValue, getValues, reset } = profileForm;

    const [isDisable, setIsDisable] = useState(true);
    const [confirmPasswordEnabled, setConfirmPasswordEnabled] = useState(false);
    const [error, setError] = useState(false);


    const editForm = e => {
        e.preventDefault();
        if (isDisable === false) {
            setValue("user_name", browserUser.name);
            setValue("user_email", browserUser.email);
            setValue("user_password", "");
            setValue("confirm_password", "");
            setConfirmPasswordEnabled(false);
        }
        setIsDisable(!isDisable);
    }

    const enableConfirmPassword = () => {
        setConfirmPasswordEnabled(true);
    };
    const isFieldEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    const isPasswordMatching = () => {
        const password = getValues('user_password');
        const confirmPassword = getValues('confirm_password');
        return password === confirmPassword;
    };
    const transitionAlert = (props) => {
        return <Slide {...props} direction="left" />;
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const enviarAlteracoes = async (e) => {
        e.preventDefault();
        //validação de senhas iguais
        if (!isPasswordMatching()) {
            setError(true);
            setValue("user_password", "");
            setValue("confirm_password", "");
            return;
        }

        try {
            const name = getValues("user_name");
            const email = getValues("user_email");
            const pwd = getValues("user_password");

            let submittedData = {}

            let formValues = {
                name: name,
                email: email,
                password: pwd
            }

            for (const key in formValues) {
                //validação para retirar campos vazios do formulario no JSON
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
        finally {
            //           auth.logout()
        }
    }

    return (
        <>
            <section className='profile_page d-flex flex-column justify-content-start align-items-center'>
                <div className='display-user'><h2>Perfil</h2></div>

                <Form onSubmit={enviarAlteracoes} className='profile_form d-flex flex-column justify-content-center '>
                    <div className="form_header d-flex flex-column justify-content-center align-items-start">
                        <h3>Dados do seu usuário</h3>
                        <div className='description d-flex align-items-center'>
                            <div className={`edit-description  d-${!isDisable ? 'flex ' : 'none'}`} >
                                <p>Não é necessário atualizar todos os campos.</p>
                                <p>Ao concluir a alteração, você será deslogado.</p>
                            </div>
                        </div>
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
                                onKeyUp={enableConfirmPassword}
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
                                disabled={!confirmPasswordEnabled || isDisable}
                            />
                        </FloatingLabel>
                        {error && (
                            <Snackbar open={error} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} TransitionComponent={transitionAlert}>
                                <Alert severity='error'> Senha e confirmar senha precisam ser iguais! </Alert>
                            </Snackbar>
                        )}
                    </div>
                    <div className='form-buttons d-flex justify-content-center mt-2'>
                        <button className={` btn btn-profile w-25 ${isDisable ? 'btn-outline-primary' : ' btn-outline-danger'}`} onClick={editForm}>
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