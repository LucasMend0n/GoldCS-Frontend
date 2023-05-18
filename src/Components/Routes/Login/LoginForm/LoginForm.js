import { Link } from "react-router-dom";
import Input from "../../../Layout/FormFields/Input";
import styles from './LoginForm.module.css'
import SubmitButton from "../../../Layout/FormFields/SubmitButton";

function LoginForm(btnTxt) {
    return ( 
        <form className={styles.form}>
            <Input
                text="Email" 
                type="email"
                placeholder="Insira o email"
                name="login_email"
            />
            <Input
                text="Senha" 
                type="password"
                placeholder="Insira a senha"
                name="login_password"
            />
            <div className={styles.buttons}>
            <SubmitButton text="Entrar"></SubmitButton>
            <SubmitButton text="Cadastrar"></SubmitButton>
            </div>
            <Link to='/home'>TESTE</Link>

        </form>
     );
}

export default LoginForm;