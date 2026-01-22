import { useState } from 'react';

export function Footer() {
    const [showFaq, setShowFaq] = useState(false);

    return (
        <>
            <footer className="footer text-light py-2 px-3">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div></div>

                    <div className="small text-center w-100 text-white">
                        Desenvolvido por <strong>SENAC</strong>
                    </div>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setShowFaq(true)}
                    >
                        Ajuda
                    </button>
                </div>
            </footer>

            {showFaq && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajuda / FAQ</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowFaq(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <p><strong>❓ Esqueci meu login ou senha</strong></p>
                                <p>Entre em contato com o administrador do sistema.</p>

                                <p><strong>❓ Quem pode criar usuários?</strong></p>
                                <p>Apenas perfis Administrador ou Moderador.</p>

                                <p><strong>❓ Problemas de acesso</strong></p>
                                <p>Verifique sua conexão ou tente novamente mais tarde.</p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowFaq(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
