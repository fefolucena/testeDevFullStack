import { useState } from 'react';
import { LoginInput } from '../components/LoginInput';
import { LoginButton } from '../components/LoginButton';
import { login } from '../services/api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            const data = await login(email, password);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            alert('Login successful');
        } catch (error) {
            alert('Invalid email or password');
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
