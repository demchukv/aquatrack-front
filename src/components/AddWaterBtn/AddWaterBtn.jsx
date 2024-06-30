import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import Icon from '../Icon/Icon';
import WaterModal from '../WaterModal/WaterModal';
import { BasicModal } from '../BasicModal/BasicModal';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import toast, { Toaster } from 'react-hot-toast';

const AddWaterBtn = ({ isBig = true, selectedDate }) => {
  const [modIsOpen, setModIsOpen] = useState(false);
  const [basicModIsOpen, setBasicModIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const openAddModal = () => {
    setModIsOpen(true);
    setBasicModIsOpen(true);
  };

  const closeWaterModal = () => {
    setModIsOpen(false);
    setBasicModIsOpen(false);
  };

  const handleSubmit = async (data) => {
    try{
      await dispatch(addWater(data));
      setSuccess(true);
      toast.success('Water added');
    }catch(error){
      console.log(error)
    }
  };

  return (success ? (<Toaster position="top-center" />) :
    <>
      <div className={css.addBtnWrap}>
        <button
          className={isBig ? css.btnBig : css.btnSmall}
          type="button"
          onClick={openAddModal}
        >
          {isBig ? (
            <Icon
              iconName="plus"
              width="18"
              height="18"
              styles={css.iconWhite}
            />
          ) : (
            <div className={css.iconWrapper}>
              <Icon
                iconName="plus"
                width="18"
                height="18"
                styles={css.iconGrey}
              />
            </div>
          )}
          <span className={isBig ? css.txtSmall : css.txtBig}>Add water</span>
        </button>
      </div>
      <BasicModal isOpen={basicModIsOpen} onClose={closeWaterModal}>
        <WaterModal
          isOpen={modIsOpen}
          onClose={closeWaterModal}
          onSubmit={handleSubmit}
          type="add"
          initialData={{
            amount: 50,
            selectedDate: selectedDate.fullDate,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }}
        />
      </BasicModal>
    </>
  );
};

export default AddWaterBtn;
