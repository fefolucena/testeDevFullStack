import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function NotFound() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="bg-light rounded p-5 text-center">
                <h2 className="mb-3">Página não encontrada</h2>
                <p className="text-muted">
                    A página que você tentou acessar não existe.
                </p>

                {user && (
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => navigate('/')}
                    >
                        Voltar para usuários
                    </button>
                )}

                {!user && (
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => navigate('/login')}
                    >
                        Ir para login
                    </button>
                )}
            </div>
        </div>
    );
}
