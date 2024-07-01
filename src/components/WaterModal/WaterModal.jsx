import PropTypes from 'prop-types';
import WaterForm from '../WaterForm/WaterForm';
import styles from './WaterModal.module.css';
import { BasicModal } from '../BasicModal/BasicModal';

const WaterModal = ({ isOpen, onClose, initialData, onSubmit, type }) => {
  const handleSubmit = data => {
    const dataForSave = {
      amount: data.amount,
      date: initialData.selectedDate + 'T' + data.time,
    };
    onSubmit(dataForSave);
  };

  return (
    <>
      <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        ariaHideApp={false}
        className={styles.waterModal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContent}>
          <WaterForm
            initialData={initialData}
            onSubmit={handleSubmit}
            type={type}
          />
        </div>
      </BasicModal>
    </>
  );
};

WaterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    amount: PropTypes.number,
    time: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['add', 'edit']).isRequired,
};

export default WaterModal;
