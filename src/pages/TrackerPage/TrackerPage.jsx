import Page from '../../components/Page/Page';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { dailyActivity } from '../../redux/water/operations';
import { getDateObject } from '../../helpers/dateHelpers';
import CalendarStat from '../../components/Calendar/CalendarStat';
import { Helmet } from 'react-helmet-async';
import css from './TrackerPage.module.css';
import DailyInfo from '../../components/DailyInfo/DailyInfo';

import { useTranslation } from 'react-i18next';

const TrackerPage = () => {

  const { t } = useTranslation();

  // поточна або вибрана в календарі дата для якої треба виводити дані в усіх компонентах
  const [selectedDate, setSelectedDate] = useState(getDateObject());

  const handleCalendarBtnClick = async (btnDate) => {
    setSelectedDate(getDateObject(btnDate));
  };


  const dispatch = useDispatch();

  useEffect(() => {
    if(selectedDate){
      dispatch(dailyActivity({"date": selectedDate.fullDate}));
    }
  }, [dispatch, selectedDate]);

  return (
    <>
      <Helmet>
        <title>{t('trackerPage')}</title>
      </Helmet>
      <Page>
        <WaterMainInfo selectedDate={selectedDate} />
        <section className={css.trackerSection}>
          <WaterDetailedInfo />
          <DailyInfo selectedDate={selectedDate} />
          <CalendarStat selectedDate={selectedDate} handleClick={handleCalendarBtnClick} />
        </section>
      </Page>
    </>
  );
};

export default TrackerPage;
