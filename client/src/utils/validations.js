import * as yup from 'yup';

export const validationSchemaNewClass = yup.object().shape({
    nombre: yup
        .string()
        .required('Este campo es obligatorio')
        .test('nameSize', 'El nombre es demaciado largo', (value) => value && value.length < 80),
    materia: yup
        .string()
        .test('materia', 'Necesita elegir una materia', (value) => value),
    descripcion: yup
        .string()
        .test('descriptionSize', 'La descripcion no debe ser mayor a 350 caracteres', (value) => !value || value.length < 350),
    grado: yup
        .string()
        .test('grado', 'Necesita elegir un grado', (value) => value),
    nivel: yup
        .string()
        .test('nivel', 'Necesita elegir un nivel', (value) => value),
    precio: yup
        .number()
        .required('Este campo es obligatorio'),

});


export const validationSchemaRegister = yup.object().shape({
    mail: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es obligatorio')
        .test('nameSize', 'El mail es demaciado largo', (value) => value && value.length < 30),
    password: yup
        .string()
        .required('Este campo es obligatorio')
        .test('passwordSize', 'La contraseña debe tener de 4 a 20 caracteres', (value) => value && value.length > 4 && value.length < 20),
    confirmar: yup
        .string()
        .required('Este campo es obligatorio')
        .test('passwordSize', 'La contraseña debe tener de 4 a 20 caracteres', (value) => value && value.length > 4 && value.length < 20),
    name: yup
        .string()
        .required('Este campo es obligatorio')
        .test('nameSize', 'El nombre es demaciado largo', (value) => value && value.length < 30),
    lastName: yup
        .string()
        .required('Este campo es obligatorio')
        .test('lastNameSize', 'El apellido es demaciado largo', (value) => value && value.length < 30),
    role: yup
        .number()
        .required('Este campo es obligatorio'),
    country: yup
        .string()
        .required('Este campo es obligatorio'),
    state: yup
        .string()
        .required('Este campo es obligatorio'),
})


export const validationSchemaGoogle = yup.object().shape({
    role: yup
        .number()
        .required('Este campo es obligatorio'),
    city: yup
        .string()
        .required('Este campo es obligatorio')
        .test('citySize', 'El nombre de la ciudad es demaciado largo', (value) => value && value.length < 60),
});