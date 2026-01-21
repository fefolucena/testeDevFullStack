import { useEffect, useState } from 'react';
import { LoginInput } from '../components/LoginInput';
import { LoginButton } from '../components/LoginButton';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const { login: authLogin, user } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    async function handleLogin() {
        try {
            const data = await login(email, password);

            authLogin(data.token, data.user);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/');
        } catch (error) {
            alert('E-mail ou senha inválidos.');
        }
    }

    return (
        <div className="login-wrapper d-flex align-items-center justify-content-center">
            <div className="login-card p-4 rounded">
                <h4 className="text-center text-white mb-4">
                    Faça o seu login
                </h4>

                <LoginInput
                    label="E-mail"
                    value={email}
                    onChange={setEmail}
                />

                <LoginInput
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />

                <LoginButton
                    text="Acesse agora"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
}
