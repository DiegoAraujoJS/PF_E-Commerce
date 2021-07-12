import * as yup from 'yup';

export const validationSchemaStepOne = yup.object().shape({
    Profesor_mail: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es obligatorio'),

    materia: yup
        .string()
        .test('materia', 'Necesita elegir una materia', (value) => value ),
    grado: yup
        .string()
        .test('grado', 'Necesita elegir un grado', (value) => value ),
    nivel: yup
        .string()
        .test('nivel', 'Necesita elegir un nivel', (value) => value )
});
