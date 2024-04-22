import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (cedula: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [cedula, setCedula] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/login/${cedula}`, {
        method: 'POST',
        body: cedula,
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      onSubmit(cedula);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Cédula:
          <input
            type="text"
            name="cedula"
            value={cedula}
            onChange={handleCedulaChange}
            required
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>

      <style jsx>{`
        .form {
          text-decoration: none;
          line-height: 1.4;
          padding: calc(1.5rem - 1px);
          border-radius: 8px;
          color: white;
          opacity: 0.8;
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(rgba(var(--accent-dark2), 66%), rgba(var(--accent-dark2), 33%));
          border: 1px solid rgba(var(--accent-light2), 25%);
        }
        @media (min-width: 768px) {
          .form {
            width: 15%;
          }
        }
      `}</style>
    </>
  );
};

export default LoginForm;
