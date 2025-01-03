import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginAdminForm = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('/login', values); // Cambia la ruta según tu backend
            const email = values.email
            localStorage.setItem('email', email);
            

            alert('Inicio de sesión exitoso: ' + response.data.message);
            resetForm();
        } catch (error) {
            console.error(error);
            alert('Error al iniciar sesión: ' + error.response?.data?.message || 'Error desconocido');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Inicio de Sesión de Administrador</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Correo Electrónico</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginAdminForm;
