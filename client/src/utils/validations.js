import * as yup from 'yup';

export const validationSchemaStepOne = yup.object().shape({
	Profesor_mail: yup
		.string()
		.email('Debe ser un email válido')
		.required('Este campo es obligatorio'),

});
