import Layout from '../Components/Layout'
import '../styles/globals.css'
import Login from "./Login";
import {AuthProviders}  from "../Auth";
import Loading from '../Components/Loading.js';

function MyApp({ Component, pageProps }) {
  return (

  <AuthProviders>

       <Layout>
        <Component {...pageProps} />
       </Layout>


    </AuthProviders>
  
  )
}

export default MyApp
