import type { AppProps } from 'next/app';
import DefaultLayout from 'src/components/layouts/Layout';
import GlobalStyles from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { NextComponentType, NextPageContext } from 'next';

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    layout: React.FC<any>;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.layout || DefaultLayout;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
