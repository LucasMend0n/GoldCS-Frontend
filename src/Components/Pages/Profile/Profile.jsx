import React from 'react'
import './Profile.css'
import { FloatingLabel, Form, FormControl } from 'react-bootstrap'

const Profile = () => {
    return (
        <>
            <section className='profile_page d-flex flex-column mb-3 justify-content-start align-items-center'>
                <div className='display-user'>Perfil</div>

                <Form className='profile_form d-flex flex-column mb-3 justify-content-center '>
                    <div className="form_header d-flex flex-column mb-5 justify-content-center align-items-start">
                        <h3>Dados do seu usuário</h3>
                    </div>
                    <div>
                        <FloatingLabel
                            label="Nome"
                            className="mb-3"
                        >
                            <Form.Control />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Senha"
                            className="mb-3"
                        >
                            <Form.Control />
                        </FloatingLabel>
                    </div>
                    <div className='form-buttons d-flex justify-content-start mt-3'>
                        <button className="btn-global">Editar</button>
                        <button className="btn-global mx-3">Salvar</button>

                    </div>
                </Form>
            </section>
        </>
    )
}

export default Profile