import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import css from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import { selectUserInfo } from '../../redux/user/selectors';

export default function UserSettingsModal({ closeModal, modIsOpen }) {
  const [get_setting, setGet_setting] = useState({});

  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (!modIsOpen) {
      return;
    }
    setGet_setting(user);
  }, [modIsOpen, user]);

  return (
    <>
      <div className={css.settingBox}>
        <h2 className={css.title}> Setting</h2>
        {Object.keys(get_setting) !== 0 && (
          <UserSettingsForm closeModal={closeModal} userSettings={get_setting} />
        )}
      </div>
    </>
  );
}
