/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { useFormik } from 'formik';

export function useFormValidation({ initialValues, onSubmit, validate, validationSchema }) {
  return useFormik({
    initialValues,
    onSubmit,
    validate: validate || undefined,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
  });
}
