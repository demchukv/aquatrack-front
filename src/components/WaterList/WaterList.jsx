
import { useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import {selectWaterDaily} from '../../redux/water/selectors';


const WaterList = ({selectedDate}) => {

    const dayWater = useSelector(selectWaterDaily);
console.log(dayWater)

        return (
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
}

export default WaterList;
