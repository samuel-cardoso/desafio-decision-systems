import { useState } from 'react';
import { Alert, Button, InputAdornment, IconButton, TextField, Snackbar, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Field } from 'react-final-form';
import { registerSchemaForm } from '../lib/yup/schemas/register-schema-form';
import { createValidator } from '../utils/create-validator';
import FormWrapper from '../components/form-wrapper';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = async (values: any) => { 
    setLoading(true);
    try {
      const { data } = await createUser({
        variables: {
          data: {
            name: values.name,
            password: values.password,
            birthData: values.birthData,
            motherName: values.motherName,
          },
        },
      });
      setOpenSnackbar(true);
      const userId = data.createUser.id;

      if (userId) {
        setTimeout(() => {
          navigate(`/usuario/${userId}`);
        }, 500);
      }
    } catch {
      setOpenSnackbar(false);
    }
    setLoading(false);
  };

  return (
    <>
      <FormWrapper title="Cadastro de Usuário" subtitle="Preencha os campos abaixo para criar sua conta.">
        <Form
          onSubmit={onSubmit}
          validate={createValidator(registerSchemaForm)}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field name="name">
                {({ input, meta }) => (
                  <TextField {...input} label="Nome completo" fullWidth margin="normal" error={meta.touched && Boolean(meta.error)} helperText={meta.touched && meta.error} />
                )}
              </Field>

              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              <Field name="birthData">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Data de nascimento"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Field name="motherName">
                {({ input, meta }) => (
                  <TextField {...input} label="Nome da mãe" fullWidth margin="normal" error={meta.touched && Boolean(meta.error)} helperText={meta.touched && meta.error} />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={submitting || loading}
                sx={{
                  mt: 3,
                  fontSize: '1rem',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  </>
                ) : (
                  'CADASTRAR'
                )}
              </Button>
            </form>
          )}
        />
      </FormWrapper>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
