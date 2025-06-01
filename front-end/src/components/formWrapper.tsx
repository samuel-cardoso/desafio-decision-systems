import type { ReactNode } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';

type FormWrapperProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function FormWrapper({ title, subtitle, children }: FormWrapperProps) {
  return (
    <Box
      sx={{
        height: '100dvh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: { xs: 2, sm: 4, md: 5 },
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Box
              sx={{
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: { xs: '0 auto 12px', sm: '0 auto 14px', md: '0 auto 16px' },
              }}
            >
              <Person sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.125rem',
                },
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box sx={{ padding: 4 }}>{children}</Box>
        </Paper>
      </Container>
    </Box>
  );
}
