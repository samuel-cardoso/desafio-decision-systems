import { useState } from 'react';
import { Alert, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, CircularProgress } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { editSchemaForm } from '../lib/yup/schemas/edit-schema-form';
import { createValidator } from '../utils/create-validator';
import FormWrapper from '../components/form-wrapper';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../graphql/query';
import { format } from 'date-fns';
import { DELETE_USER, UPDATE_USER } from '../graphql/mutations';

export default function EditUser() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GET_USER, { variables: { id } });
  const [saveLoading, setSaveLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleDeleteUser = async () => {
    setLoadingDelete(true);
    try {
      await deleteUser({ variables: { id } });
      setSnackbarMessage('Cadastro excluído com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/usuario/criar');
      }, 500);
    } catch {
      setSnackbarMessage('Cadastro excluído com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
    setLoadingDelete(false);
  };

  const onSubmit = async (values: any) => {
    setSaveLoading(true);
    try {
      await updateUser({
        variables: {
          id,
          data: {
            name: values.name,
            birthData: values.birthData,
            motherName: values.motherName,
          },
        },
      });

      await refetch();

      setSnackbarMessage('Usuário atualizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch {
      setSnackbarMessage('Erro ao atualizar usuário.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
    setSaveLoading(false);
  };

  return (
    <>
      <FormWrapper title="Editar Usuário" subtitle="Altere seus dados abaixo.">
        {!loading && data && (
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: data.user.name,
              birthData: format(new Date(data.user.birthData), 'yyyy-MM-dd'),
              motherName: data.user.motherName,
            }}
            validate={createValidator(editSchemaForm)}
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
                  {saveLoading ? 'SALVANDO...' : 'SALVAR'}
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
        )}
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
          <Button fullWidth onClick={handleDeleteUser} color="error" variant="contained">
            {loadingDelete ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              </>
            ) : (
              'EXCLUIR CADASTRO'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
