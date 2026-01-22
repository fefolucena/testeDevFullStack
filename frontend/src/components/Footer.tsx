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
                        className="btn text-white help-button rounded-5 font-monospace"
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
                                <h5 className="modal-title">Ajuda</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowFaq(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <p><strong>Usuários padrão: </strong></p>
                                <p>Login: admin@teste.com | Senha: 123456</p>
                                <p>Login: moderador@teste.com | Senha: 123456</p>
                                <p>Login: leitor@teste.com | Senha: 123456</p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-danger"
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
