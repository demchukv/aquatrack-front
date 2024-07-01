import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import TimeField from 'react-simple-timefield';
import { updateUserSettings } from '../../redux/user/operations';
import { selectIsError, selectIsLoading } from '../../redux/user/selectors';
import Loader from '../Loader/Loader';

import css from './UserSettingsForm.module.css';
import AvatarInput from './AvatarInput/AvatarInput';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email address (must contain @)')
    .required('This field is required'),
  name: yup.string(),
  gender: yup.string().oneOf(['male', 'female'], 'Select your gender'),
  weight: yup.number(),
  timeActivity: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Enter time in HH:MM format'),
  dailyNorma: yup.number(),
});

export default function UserSettingsForm({ closeModal, userSettings }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const [success, setSuccess] = useState(false);

  const convertToHours = time => {
    const [hours, minutes] = time.toString().split(':');
    const totalHours = parseInt(hours) + parseInt(minutes) / 60;
    return totalHours;
  };

  const calculateV = () => {
    const { gender, weight, timeActivity } = watch();
    if(typeof weight === 'undefined' || typeof timeActivity === 'undefined' || typeof gender === 'undefined'){
      return;
    }
    if (gender === 'male') {
      const vMale = weight * 0.04 + convertToHours(timeActivity) * 0.6;
      setV(vMale.toFixed(1));
    } else if (gender === 'female') {
      const vFemale = weight * 0.03 + convertToHours(timeActivity) * 0.4;
      setV(vFemale.toFixed(1));
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [v, setV] = useState(null);

  useEffect(() => {
    setValue('name', userSettings.name);
    setValue('email', userSettings.email);
    setValue('weight', userSettings.weight);
    setValue('dailyNorma', userSettings.dailyNorma);
    setValue('timeActivity', userSettings.timeActivity);
    setValue('gender', userSettings.gender);
  }, [userSettings, setValue]);

  useEffect(() => {
    calculateV();
  }, [calculateV]);

  const onSubmit = async data => {
    try {
      await dispatch(updateUserSettings(data)).unwrap();
      setSuccess(true);
      toast.success('Successfully updated!');
      closeModal();
    } catch (error) {
      toast.error(error || 'Failed to update data!');
    }
  };

  return (
    isError ? (<Toaster position="top-center" />) :
    (<>
    {isLoading && (<div className={css.loaderBg}><Loader addClass={css.monthDataLoader} /></div>)}
    <div className={css.settingsFormContainer}>
      <AvatarInput />

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className={css.titleHeader}>Your gender identity</h3>
        </div>
        <div>
          <div className={css.container}>
          <div className={css.radio}>
          <input
            type="radio"
            {...register('gender')}
            value="male"
            id="field-male"
            onChange={() => {
              setValue('gender', 'male');
              calculateV();
            }}
        />{' '}
          <label htmlFor="field-male" className={css.radioLabel}>Male</label>
          </div>
          <div className={css.radio}>
          <input
            type="radio"
            {...register('gender')}
            value="female"
            id="field-female"
            onChange={() => {
              setValue('gender', 'female');
              calculateV();
            }}
          />{' '}
          <label htmlFor="field-female" className={css.radioLabel}>Female</label>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
          </div>
        </div>

        <div className={css.sectionBox}>
          <section>
            <div className={css.box}>
              <label className={css.labelName}>Your name</label>
              <input {...register('name')} />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.box}>
              <label className={css.labelName}>Email</label>
              <input {...register('email', { required: true })} />
              {errors.email && (
                <p className={css.error}>{errors.email.message} </p>
              )}
            </div>

            <h2 className={css.titleNormaFormula}>My daily norma</h2>
            <ul className={css.listFormula}>
              <li>
                <p>For woman:</p>
                <span>V=(M*0,03) + (T*0,4)</span>
              </li>
              <li>
                <p>For man:</p>
                <span>V=(M*0,04) + (T*0,6)</span>
              </li>
              <li>
                <div className={css.textBox}>
                  <p>
                    <span>*</span> V is the volume of the water norm in liters
                    per day, M is your body weight,T is the time of active
                    sports,or another type of activity commensurate in terms of
                    loads (in the absence of these, you must set 0)
                  </p>
                </div>
              </li>
              <li className={css.vectorItem}>
                <p>
                  <span className={css.vector}>!</span>Active time in hours
                </p>
              </li>
            </ul>
          </section>

          <section>
            <div className={css.formKilo}>
              <label>Your weight in kilograms:</label>
              <input {...register('weight')}
              onChange={(event) => {
                setValue('weight', event.target.value);
                calculateV();
              }}
              />
              {errors.weight && (
                <p className={css.error}>{errors.weight.message} </p>
              )}
            </div>

            <div className={css.formKilo}>
              <label>The time of active participation in sports:</label>

              <TimeField
                value={watch('timeActivity')}
                onChange={(event, value) => {
                  setValue('timeActivity', value);
                  calculateV();
                }}
                input={<input type="text" {...register('timeActivity')} />}
              />
              {errors.timeActivity && <p>{errors.timeActivity.message}</p>}
            </div>

            <p className={css.amountWater}>
              The required amount of water in liters per day:
              <span className={css.amount}>{v} L</span>
            </p>

            <div className={css.youWater}>
              <label>Write down how much water you will drink:</label>
              <input {...register('dailyNorma')} />
              {errors.dailyNorma && (
                <p className={css.error}>{errors.dailyNorma.message} </p>
              )}
            </div>
          </section>
        </div>
        <div className={css.spBtn}>
          <button className={css.btnSave} type="submit">
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
    {success && <Toaster position='top-center'></Toaster>}
    </>)
  );
}
