import css from './EmailVerify.module.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { sendVerify } from '../../redux/auth/operations';
import LangSwitch from '../../components/LangSwitch/LangSwitch';

const EmailVerify = () => {
  const dispatch = useDispatch();
  const [validCode, setValidCode] = useState(null);

  const { verificationToken } = useParams();

  useEffect(() => {
    const checkCode = async verificationToken => {
      try {
        const res = await dispatch(sendVerify(verificationToken)).unwrap();
        console.log(res);
        if (res) {
          setValidCode(true);
        } else {
          setValidCode(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (verificationToken) {
      checkCode(verificationToken);
    }
  }, [verificationToken, dispatch]);

  return (
    <>
      <LangSwitch />
      <div className={css.container}>
        <h1 className={css.title}>
          {validCode
            ? 'Email verified successfully'
            : 'Email verification failed'}
        </h1>
        <Link to="/signup" className={css.link}>
          {validCode ? 'Sign in' : 'Try again'}
        </Link>
      </div>
    </>
  );
};

export default EmailVerify;
