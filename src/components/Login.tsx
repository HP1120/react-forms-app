import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import styles from '../styles/Login.module.css';

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (values: LoginValues) => {
    if (values.rememberMe) {
      localStorage.setItem('rememberedEmail', values.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const initialValues: LoginValues = {
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
    rememberMe: Boolean(localStorage.getItem('rememberedEmail')),
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.formCard}
      >
        <div className={styles.header}>
          <LogIn className={styles.icon} />
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.formGroup}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={`${styles.input} ${styles.passwordInput}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.togglePassword}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className={styles.error}>{errors.password}</div>
                )}
              </div>

              <div className={styles.checkbox}>
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxLabel}>Remember me</span>
              </div>

              <button type="submit" className={styles.submitButton}>
                Sign in
              </button>
            </Form>
          )}
        </Formik>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.successMessage}
          >
            Login successful!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};