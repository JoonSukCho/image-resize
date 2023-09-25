import type { AppProps } from 'next/app';
import DefaultLayout from 'src/components/layouts/Layout';
import GlobalStyles from 'styles/GlobalStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.layout || DefaultLayout;

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
