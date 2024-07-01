import Modal from 'react-modal';
import PropTypes from 'prop-types';
import WaterForm from '../WaterForm/WaterForm';
import styles from './WaterModal.module.css';
import { useState, useEffect } from 'react';

const WaterModal = ({ isOpen, onClose, initialData, onSubmit, type }) => {

  const [backendError, setBackendError] = useState('');

  const handleSubmit = async (data) => {
    const dataForSave = {
      amount: data.amount,
      date: initialData.selectedDate + 'T' + data.time,
    }
    try {
      await onSubmit(dataForSave);
      setBackendError('');
      onClose();
    } catch (error) {
      setBackendError(error.message || 'An error occurred');
    }
  };

  const handleCloseError = () => {
    setBackendError('');
  };

  useEffect(() => {
    if (!isOpen) {
      setBackendError('');
    }
  }, [isOpen, initialData]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className={styles.waterModal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContent}>
          <WaterForm initialData={initialData} onSubmit={handleSubmit} onClose={onClose} type={type} />
        </div>
      </Modal>

      {backendError && (
        <Modal
          isOpen={!!backendError}
          onRequestClose={handleCloseError}
          ariaHideApp={false}
          className={styles.errorModal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.errorModalContent}>
            <p className={styles.errorText}>{backendError}</p>
          </div>
        </Modal>
      )}
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
