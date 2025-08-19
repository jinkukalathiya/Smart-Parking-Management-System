import React, {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../api/api';
// import {useNavigate} from 'react-router-dom';

export default function Register() {
    // const { login } = useContext();
    // const navigate = useNavigate();
    const initialValues = { name: '', email: '', password: '', role: 'Customer' };
    const validation = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8,'Min 8 Character Required').required('Required')
    })

    const onFromSubmit = async () => {
        try{
            const res = await API.post('./register', values);
            login(res.data.user, res.data.token);
            navigate('./dashboard');
        }catch(err){
            setErrors({api : err.response ? data : message || 'Error'});

        }finally { setSubmitting(false)};
    }

    return (
        <>
            <div className='bg-gray-200 w-full h-lvh text-center flex justify-center items-center'>
                <div className='w-4/12 p-10 bg-cyan-900 rounded-3xl shadow'>
                    <h2 className='text-4xl font-sans font-bold mb-5 text-white'>Register User</h2>
                    <Formik
                        initialValues={initialValues}
                        validate={validation}
                        onSubmit={onFromSubmit}
                    >
                    {({ isSubmitting, errors }) => (
                        <form>
                            {errors.api && <div className='text-red-600'> { errors.api } </div>}
                            <div>
                                <label>Name :</label>
                                <Field type="text" name="name" className="w-ful p-2 border outline-0" />
                                <ErrorMessage name="name" component="div" className='text-red-600' />
                            </div>

                        </form>
                    )}
                    </Formik>
                </div>
                
            </div>
        </>
    )
}

