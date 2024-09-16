import React from 'react';
import { Formik } from 'formik';
import {Form, Card, Container} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';

 const Basic = () => (
   <Card.Body>
       
     <Formik 
       initialValues={{ day: ['lunes', 'martes'], from: '', to: '0' }}
       validate={values => {
         const errors:{day:string, from: string, to: string} = { day: '', from: '', to: '' };
         if (!values.day || !values.from || !values.to){
           errors.day = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
             <div style={{display:'flex'}}>

                <input
                    type="select"
                    name="day"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.day}
                />
                {errors.day && touched.day && errors.day}
                <input
                    type="text"
                    name="from"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from}
                />
                {errors.from && touched.from && errors.from}
                <div style={{ width: '200px' }}>
                    
                    <RangeSlider
                        value={values.to}
                        onChange={handleChange}
                        step={0.25}
                        max={8}
                    />
                </div>
             </div>
           
         </form>
       )}
     </Formik>
   </Card.Body>
 );
 
 export default Basic;

 