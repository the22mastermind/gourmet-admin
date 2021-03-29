import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';
import { AuthContext } from '../../context/AuthState';
import Loader from '../../components/Loader/Loader';
import Title from '../../components/Title/Title';
import FormInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import logoImage from '../../assets/images/color-bg.png';
import loginImage from '../../assets/images/login.png';
import { login } from '../../utils/validations';
import { postService } from '../../utils/api';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth, loginUser } = useContext(AuthContext);
  const {
    errors,
    handleSubmit,
    register,
    reset,
  } = useForm();
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const handleCloseAlert = () => {
    setError(null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await postService('/api/auth/login', data);
    if (response.status !== 200) {
      setError(response.error);
      setLoading(false);
    } else {
      reset({ phoneNumber: '', password: '' });
      const { token } = response.data;
      const { role } = response.data.data;
      if (role !== 'admin') {
        setError('Access denied. You must be an admin to proceed');
        setLoading(false);
      } else {
        const payload = {
          authenticated: true,
          user: {
            ...response.data.data,
          },
        };
        const from = { pathname: '/dashboard' };
        await loginUser(token, payload, from);
      }
    }
  };

  if (auth?.authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <animated.div style={props} className="wrapper">
      <Grid
        className="full-height"
        container
        spacing={0}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6}>
          <div className="login-page">
            <img src={logoImage} alt="logo" className="logo-img" />
            <form className="form-wrapper" noValidate autoComplete="off">
              <Title
                variant="h4"
                text="Login"
                align="center"
                color="primary"
                gutterBottom
              />
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
          {error ? (
            <ToastNotification
              autoHideDuration={5000}
              variant="filled"
              severity="error"
              text={error}
              handleCloseAlert={handleCloseAlert}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="img-grid">
          <img
            src={loginImage}
            alt="login dish"
            className="login-img"
            width="100%"
            heigth="100%"
          />
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default LoginPage;
