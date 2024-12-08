import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import styles from '../styles/Signup.module.css';

interface SignupValues {
  name: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Required'),
});

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const getStrengthClass = (strength: number): string => {
    if (strength <= 25) return styles.weak;
    if (strength <= 50) return styles.fair;
    if (strength <= 75) return styles.good;
    return styles.strong;
  };

  const handleSubmit = (values: SignupValues) => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.formCard}
      >
        <div className={styles.header}>
          <UserPlus className={styles.icon} />
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join our community today</p>
        </div>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="John Doe"
                />
                {errors.name && touched.name && (
                  <div className={styles.error}>{errors.name}</div>
                )}
              </div>

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

                {values.password && (
                  <div className={styles.strengthIndicator}>
                    <div className={styles.strengthBar}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculatePasswordStrength(values.password)}%` }}
                        className={`${styles.strengthBarFill} ${getStrengthClass(calculatePasswordStrength(values.password))}`}
                      />
                    </div>
                    <p className={styles.strengthText}>
                      Password strength: {calculatePasswordStrength(values.password)}%
                    </p>
                  </div>
                )}
              </div>

              <button type="submit" className={styles.submitButton}>
                Sign up
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
            Account created successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};