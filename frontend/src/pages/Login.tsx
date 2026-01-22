import { useEffect, useState } from 'react';
import { LoginInput } from '../components/LoginInput';
import { LoginButton } from '../components/LoginButton';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import senacLearningLogo from '../assets/senac-learning.png';

export function Login() {
    const { login: authLogin, user } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotModal, setShowForgotModal] = useState(false);

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
        <div className="login-page">
            <div className="login-card p-4 rounded-5">
                <div className="modal-logo">
                    <img src={senacLearningLogo} alt="Senac Learning" />
                </div>

                <h4 className="text-center text-white mb-4 font-monospace fs-3">
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

                <div className="text-center mt-2">
                    <button
                        type="button"
                        className="btn btn-link p-0 forgot-password"
                        onClick={() => setShowForgotModal(true)}
                    >
                        Esqueci meu e-mail ou senha
                    </button>
                </div>

            </div>

            {showForgotModal && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Esqueci minha senha</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowForgotModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <p>
                                    Caso você tenha esquecido sua senha, entre em contato com o
                                    administrador do sistema ou com o suporte do SENAC para
                                    realizar a recuperação de acesso.
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowForgotModal(false)}
                                >
                                    Fechar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
