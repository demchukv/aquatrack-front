import css from './EmailVerifyPage.module.css';
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection';
import EmailVerify from '../../components/EmailVerify/EmailVerify';
import { Helmet } from 'react-helmet-async';
import Page from '../../components/Page/Page';


const EmailVerifyPage = () => {


  return (
    <>
      <Helmet>
        <title>Email verify</title>
      </Helmet>
      <Page>
        <EmailVerify />
        <div className={css.divDesktopOnly}>
          <AdvantagesSection />
        </div>
      </Page>
    </>
  );
};

export default EmailVerifyPage;
