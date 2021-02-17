import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthState';
import Loader from '../../components/Loader/Loader';
import Title from '../../components/Title/Title';
import FormInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import { login } from '../../utils/validations';
import { loginService } from '../../utils/api';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { auth, loginUser } = useContext(AuthContext);
  const {
    errors,
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await loginService(data);
    if (response.status !== 200) {
      setError(response.error);
      setShowToast(true);
      setLoading(false);
    } else {
      reset({ phoneNumber: '', password: '' });
      const { token } = response.data;
      const { role } = response.data.data;
      if (role !== 'admin') {
        setError('Access denied. You must be an admin to proceed');
        setShowToast(true);
        setLoading(false);
      } else {
        const payload = {
          authenticated: true,
          user: {
            token,
            ...response.data.data,
          },
        };
        const from = { pathname: '/dashboard' };
        await loginUser(payload, from);
      }
    }
  };

  if (auth?.authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid item xs={12}>
      <div className="login-page">
        <Title variant="h4" text="Login" align="left" color="primary" gutterBottom />
        <form className="form-wrapper" noValidate autoComplete="off">
          <FormControl className="form-control">
            <FormInput
              inputRef={register(login.phoneNumber)}
              data-testid="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              variant="outlined"
              placeholder="Phone number"
              inputProps={{ 'aria-label': 'phoneNumber' }}
              FormHelperTextProps={{ 'aria-label': 'error-helper-text' }}
              error={!!errors?.phoneNumber?.message}
              helperText={errors?.phoneNumber?.message}
              autoFocus
              fullWidth
              required
            />
          </FormControl>
          <FormControl className="form-control">
            <FormInput
              inputRef={register(login.password)}
              data-testid="password"
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              type="password"
              inputProps={{ 'aria-label': 'password' }}
              FormHelperTextProps={{ 'aria-label': 'error-helper-text' }}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
              fullWidth
              required
            />
          </FormControl>
          <FormControl className="form-control">
            {loading ? (
              <Loader color="primary" />
            ) : (
              <FormButton
                label="Login"
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                data-testid="login-button"
                disableElevation
                fullWidth
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </FormControl>
        </form>
      </div>
      <ToastNotification
        autoHideDuration={5000}
        variant="filled"
        severity="error"
        text={error}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </Grid>
  );
};

export default LoginPage;
