import { LoginForm, RegisterForm } from '../';


import './LoginPage.css';

export const LoginPage = () => {




    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <LoginForm></LoginForm>
                </div>

                <div className="col-md-6 login-form-2">
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </div>
    )
}
