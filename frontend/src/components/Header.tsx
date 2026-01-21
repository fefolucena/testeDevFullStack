import senacLogo from '../assets/senac-logo.png';

export function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-4">
            <div className="container-fluid">

                <a className="navbar-brand" href="#">
                    <img
                        src={senacLogo}
                        alt="Senac"
                        height="40"
                        className="d-inline-block align-text-top"
                    />
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">
                                Política de Privacidade
                            </a>
                        </li>

                        <div className="vr text-light my-auto" />

                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">
                                Termos de Uso
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
