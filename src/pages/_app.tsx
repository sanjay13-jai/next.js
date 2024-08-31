import { AuthWrapper } from "@/context/AuthContext";
import { getCookie } from "cookies-next";
import App, { AppContext } from "next/app";
import { AppPropsWithLayout } from "@/types/page";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppWrapper } from "@/context/AppContext";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { SearchWrapper } from "@/context/SearchContext";


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // const metaProps = Component.metadata || DEFAULT_META_DATA;

  return (
    <AuthWrapper>
      <AppWrapper>
        <SearchWrapper>
          <>
            {/* <Meta {...metaProps} /> */}
            {getLayout(<Component {...pageProps} />)}
          </>
        </SearchWrapper>
          </AppWrapper>
    </AuthWrapper>
  );
}

const IS_SERVER = typeof window === "undefined";
if (IS_SERVER) {
  MyApp.getInitialProps = async (context: AppContext) => {
    const {
      ctx: { req, res, pathname },
    } = context;
    const isLoggedIn = getCookie("isLoggedIn", { req, res });
    const token = getCookie("token", { req, res });
    const isGuest = getCookie("isGuest", { req, res });
    const ctx = await App.getInitialProps(context);

    if (
      !isLoggedIn || 
      !token) {
      if (!isGuest && res) {
        res.setHeader(
          'Set-Cookie',
          [
            'isLoggedIn=;path=/;max-age=0',
            'token=;path=/;max-age=0',
            'emailId=;path=/;max-age=0',
            'isGuest=1;path=/'
          ]);
        res.writeHead(302, {
          Location: `/login`,
        });

        res.end();
        return;
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/login`,
          },
        };
      }
    }
    if (pathname === "/login" &&
       isLoggedIn && 
       token) {
      return {
        redirect: {
          permanent: true,
          destination: `/`,
        },
      };
    }

    return {
      ...ctx,
      pageProps: { isLoggedIn },
    };
  };
}
export default MyApp;
