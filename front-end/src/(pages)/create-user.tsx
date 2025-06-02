import { useState } from 'react';
import { Alert, Button, InputAdornment, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Field } from 'react-final-form';
import { registerSchemaForm } from '../lib/yup/schemas/register-schema-form';
import { createValidator } from '../utils/create-validator';
import FormWrapper from '../components/form-wrapper';

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const onSubmit = async (values: typeof registerSchemaForm) => {
    setLoading(true);
    setAlertMessage('');
    try {
      console.log('Dados validados:', values); // Deletar depois.
      setAlertMessage('Usuário cadastrado com sucesso! Em 3 segundos você será redirecionado para a página de Edição.');
      setTypeMessage('success');
    } catch {
      setAlertMessage('Erro ao cadastrar usuário.');
      setTypeMessage('error');
    }
    setLoading(false);
  };

  return (
    <FormWrapper title="Cadastro de Usuário" subtitle="Preencha os campos abaixo para criar sua conta.">
      {alertMessage && (
        <Alert severity={typeMessage} sx={{ mb: 3, borderRadius: 2 }}>
          {alertMessage}
        </Alert>
      )}

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
                        <IconButton onClick={togglePasswordVisibility} edge="end">
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
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
            </Button>
          </form>
        )}
      />
    </FormWrapper>
  );
}
