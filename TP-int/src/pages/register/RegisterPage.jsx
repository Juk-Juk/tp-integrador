import { useState } from 'react';
import { useRegister } from '../../hooks/auth/useRegisterAuth';
import { toast } from 'react-toastify';

// import './Login.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { registerFn, registerStateError, registerStateLoading, registerStateSuccess } = useRegister();

    const handleRegister = () => {
        if (email && password) {
            registerFn({ email, password });
        }
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2>Registrarse</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleRegister} disabled={registerStateLoading} className='login-btn'>
                    {registerStateLoading ? 'Cargando...' : 'Registrarse'}
                </button>
                {registerStateError && (
                    <p className='text-danger'>Ocurrió un error</p>
                )}
                {registerStateSuccess && toast.success("Usuario creado con éxito")}
            </div>
        </div>
    );
};

export default Register;
