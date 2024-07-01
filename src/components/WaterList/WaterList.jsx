
import { useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import {selectWaterDaily} from '../../redux/water/selectors';
import { useState, useEffect } from 'react';


const WaterList = ({selectedDate}) => {

  const [dayWater, setDayWater] = useState([]);

    const data = useSelector(selectWaterDaily);

    useEffect(() => {
      if(data){
        setDayWater(data);
      }
    }, [data]);

    return (
      dayWater &&
      (
        <div className={css.container}>
            <ul className={css.waterList}>
                {dayWater.map((day) => (
                    <li key={day._id} >
                        <WaterItem selectedDate={selectedDate} day={day} id={day._id} />
                    </li>
                ))}
            </ul>
        </div>
      )
    )

        // return (
        //   dayWater &&
        //   (
        //     <div className={css.container}>
        //         <ul className={css.waterList}>
        //             {dayWater.map((day) => (
        //                 <li key={day._id} >
        //                     <WaterItem selectedDate={selectedDate} day={day} id={day._id} />
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        //   )
        // )
}

export default WaterList;
