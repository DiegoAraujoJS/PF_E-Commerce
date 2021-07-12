import * as yup from 'yup';

export const validationSchemaNewClass = yup.object().shape({
    Profesor_mail: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es obligatorio'),
    materia: yup
        .string()
        .test('materia', 'Necesita elegir una materia', (value) => value),
    grado: yup
        .string()
        .test('grado', 'Necesita elegir un grado', (value) => value),
    nivel: yup
        .string()
        .test('nivel', 'Necesita elegir un nivel', (value) => value)
});


export const validationSchemaRegister = yup.object().shape({
    mail: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es obligatorio'),
    password: yup
        .string()
        .required('Este campo es obligatorio')
        .test('passwordSize', 'La contraseña debe tener de 4 a 20 caracteres', (value) => value && value.length > 4 && value.length < 20),
    name: yup
        .string()
        .required('Este campo es obligatorio'),
    lastName: yup
        .string()
        .required('Este campo es obligatorio'),
    role: yup
        .number()
        .required('Este campo es obligatorio'),
    city: yup
        .string()
        .required('Este campo es obligatorio'),
});