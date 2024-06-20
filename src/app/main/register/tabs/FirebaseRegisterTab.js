import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { registerWithFirebase } from 'app/auth/store/registerSlice';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  displayName: yup.string().required('You must enter display name'),
  email: yup.string().email('You must enter a valid email').required('You must enter an email address'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(10, 'Password is too short - should be 10 chars minimum.')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter.')
    .matches(/[0-9]/, 'Password must contain at least one digit.')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special symbol'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

function FirebaseRegisterTab(props) {
  const dispatch = useDispatch();
  const authRegister = useSelector(({ auth }) => auth.register);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    authRegister.errors.forEach(error => {
      setError(error.type, {
        type: 'manual',
        message: error.message
      });
    });
  }, [authRegister.errors, setError]);

  function onSubmit(model) {
    dispatch(registerWithFirebase(model));
  }

  function handleShowPassword() {
    setIsPasswordVisible(prev => !prev);
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Display name"
              error={!!errors.displayName}
              helperText={errors?.displayName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      email
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              label="Password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20 cursor-pointer" color="action" onClick={handleShowPassword}>
                      {isPasswordVisible ? 'visibility_off' : 'visibility'}
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              label="Confirm Password"
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20 cursor-pointer" color="action" onClick={handleShowPassword}>
                      {isPasswordVisible ? 'visibility_off' : 'visibility'}
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="REGISTER"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default FirebaseRegisterTab;
