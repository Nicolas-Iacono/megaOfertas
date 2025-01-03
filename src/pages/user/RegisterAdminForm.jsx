import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterAdminForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('/register', values); // Cambia la ruta según tu backend
            alert('Registro exitoso: ' + response.data.message);
            resetForm();
        } catch (error) {
            console.error(error);
            alert('Error al registrarse: ' + error.response?.data?.message || 'Error desconocido');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Registro de Administrador</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" />
                        </div>
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
                            {isSubmitting ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterAdminForm;
