import { useState } from 'react'; // Importar useEffect para usar com o back-end real.
// import { useParams, useNavigate } from 'react-router-dom'; // Usar com o back-end real.
import { Alert, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { editSchemaForm } from '../lib/yup/schemas/edit-schema-form';
import { createValidator } from '../utils/create-validator';
import FormWrapper from '../components/form-wrapper';

export default function EditUser() {
  //   const { id } = useParams(); // Usar com o back-end real.
  //   const navigate = useNavigate(); // Usar com o back-end real.

  const [alertMessage, setAlertMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  //   const [initialValues, setInitialValues] = useState<any>(null); // Usar com o back-end real.

  const handleDeleteUser = () => {
    // const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // const novosUsuarios = usuarios.filter((u: any) => u.id !== 1); // Substitua por ID real depois
    // localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    // window.location.href = '/usuario/criar';
    setLoadingDelete(true);
    setSnackbarOpen(true);
    setSnackbarMessage('Cadastro excluído com sucesso!');
    setTimeout(() => {
      window.location.href = '/usuario/criar';
    }, 2000);
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log('Dados Atualizados:', values); // Deletar depois.
      setAlertMessage('Usuário atualizado com sucesso!.');
      setTypeMessage('success');
    } catch {
      setAlertMessage('Erro ao atualizar usuário.');
      setTypeMessage('error');
    }
    setLoading(false);
  };

  return (
    <>
      <FormWrapper title="Editar Usuário" subtitle="Altere seus dados abaixo.">
        {alertMessage && (
          <Alert severity={typeMessage} sx={{ mb: 3, borderRadius: 2 }}>
            {alertMessage}
          </Alert>
        )}

        <Form
          onSubmit={onSubmit}
          validate={createValidator(editSchemaForm)}
          // initialValues={initialValues} // Usar com o back-end real.
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field name="name">
                {({ input, meta }) => (
                  <TextField {...input} label="Nome completo" fullWidth margin="normal" error={meta.touched && Boolean(meta.error)} helperText={meta.touched && meta.error} />
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
                {loading ? 'SALVANDO...' : 'SALVAR'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{
                  mt: 2,
                  fontSize: '1rem',
                  padding: '12px 24px',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                onClick={() => setOpenModal(true)}
              >
                EXCLUIR CADASTRO
              </Button>
            </form>
          )}
        />
      </FormWrapper>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir seu cadastro? Esta ação não pode ser desfeita.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
          <Button fullWidth onClick={() => setOpenModal(false)} color="primary">
            Cancelar
          </Button>
          <Button fullWidth onClick={handleDeleteUser} color="error" variant="contained" disabled={loadingDelete}>
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        disableWindowBlurListener
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#764ba2',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        }}
      />
    </>
  );
}
