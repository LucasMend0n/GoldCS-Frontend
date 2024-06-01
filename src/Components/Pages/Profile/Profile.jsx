import React, { useEffect, useState } from 'react'
import './Profile.css'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
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
    const [passwordEqualsError, setpasswordEqualsError] = useState(false);
    const [emptyInputsError, setEmptyInputsError] = useState(false);
    const [strongPasswordError, setStrongPasswordError] = useState(false);
    const [loading, setIsloading] = useState(null);


    const editForm = e => {
        e.preventDefault();
        setIsDisable(!isDisable)
        if (isDisable === true) {
            setValue("user_name", "")
            setValue("user_email", "")
        }
        if (isDisable === false) {
            setValue("user_name", browserUser.name)
            setValue("user_email", browserUser.email)
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
    };
    const isPasswordMatching = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const allInputsEmpty = (formData) => {
        return !Object.keys(formData).some(k => formData[k] !== "");
    };
    const transitionAlert = (props) => {
        return <Slide {...props} direction="left" />;
    };
    const senhaForte = (password) => {
        const pattern = /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[A-Z]).*(?=.*[0-9]).{8,}/
        return pattern.test(password)
    };

    useEffect(() => {
        if (passwordEqualsError) {
            const timer = setTimeout(() => {
                setpasswordEqualsError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (emptyInputsError) {
            const timer = setTimeout(() => {
                setEmptyInputsError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (strongPasswordError) {
            const timer = setTimeout(() => {
                setStrongPasswordError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, [passwordEqualsError, emptyInputsError, strongPasswordError]);

    const enviarAlteracoes = async (e) => {
        e.preventDefault();
        setIsloading(true);

        try {
            const name = getValues("user_name");
            const email = getValues("user_email");
            const pwd = getValues("user_password");
            const pwdConfirm = getValues("confirm_password")

            let submittedData = {}

            let formValues = {
                name: name,
                email: email,
                password: pwd
            }

            // validação de se todos os inputs estão nulos
            if (allInputsEmpty(formValues)) {
                setEmptyInputsError(true);
                setIsloading(false);
                return

            } else if (!senhaForte(pwd) && confirmPasswordEnabled) { //validação senha forte 
                setStrongPasswordError(true);
                setValue("user_password", "");
                setValue("confirm_password", "");
                setIsloading(false);
                return;
            } else if (!isPasswordMatching(pwd, pwdConfirm) && confirmPasswordEnabled) {  //validação de senhas iguais
                setpasswordEqualsError(true);
                setValue("user_password", "");
                setValue("confirm_password", "");
                setIsloading(false);
                return;
            }
            //validação para retirar campos vazios do formulario no JSON
            for (const key in formValues) {
                if (isFieldEmpty(formValues[key])) {
                    delete formValues[key];
                }
                submittedData = formValues;
            }
            const id = browserUser.userId;
            const response = await apiGold.put(`Authenticate/Update/${id}`, submittedData);
            if (response.data.success) {
                setIsDisable(true);
                setIsloading(false);
                reset({
                    user_name: "",
                    user_email: "",
                    user_password: "",
                    confirm_password: ""
                })
                auth.logout()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className='profile_page d-flex flex-column justify-content-start align-items-center'>
                <div className='display-user'><h2>Perfil</h2></div>

                <Form onSubmit={enviarAlteracoes} className='profile_form d-flex flex-column aligin-items-start justify-content-center '>
                    <div className="form_header mb-3 d-flex flex-column justify-content-start align-items-center">
                        <h3 className='mb-5'>Dados do seu usuário</h3>
                        <div className='description mx-auto d-flex align-items-center'>
                            <div className={`edit-description px-3 my-2  d-${!isDisable ? 'flex ' : 'none'}`} >
                                <p>Não é necessário atualizar todos os campos.</p>
                                <p>Ao concluir a alteração, você será deslogado.</p>
                                <p>Senha: 1 caracter especial, 1 numero, 1 letra maiuscula e 8 caracteres no minimo. </p>
                            </div>
                        </div>
                    </div>
                    <div className='formInputs mx-auto'>
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
                        {passwordEqualsError && (
                            <Snackbar open={passwordEqualsError} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} TransitionComponent={transitionAlert}>
                                <Alert severity='error'> Senha e confirmar senha precisam ser iguais! </Alert>
                            </Snackbar>
                        )}
                        {emptyInputsError && (
                            <Snackbar open={emptyInputsError} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} TransitionComponent={transitionAlert}>
                                <Alert severity='error'> Ao menos um campo deve ser alterado </Alert>
                            </Snackbar>
                        )}
                        {strongPasswordError && (
                            <Snackbar open={strongPasswordError} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} TransitionComponent={transitionAlert}>
                                <Alert severity='error'> Senha no formato inválido. Insira uma senha forte! </Alert>
                            </Snackbar>
                        )}
                    </div>
                    <div className='form_buttons mx-auto d-flex justify-content-center mt-2'>
                        <button className={` btn btn-profile w-25 ${isDisable ? 'btn-outline-primary' : ' btn-outline-danger'}`} onClick={editForm}>
                            {isDisable ? 'Editar' : 'Cancelar'}
                        </button>
                        <button className="btn-global btn-profile w-25 mx-3" disabled={isDisable}>
                            {loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <>Salvar</>}
                        </button>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Profile