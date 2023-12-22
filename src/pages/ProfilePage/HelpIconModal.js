import styled from 'styled-components';
import descriptionWorkoutBadge from '../../assets/images/descriptionWorkoutBadge.png';
import closeIcon from '../../assets/images/closeIcon.png';

const HelpIconModalWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width : 100%; 
height : 100%;
background: rgba(255, 255, 255, 0.5);
z-index: 1;
`
const HelpModal = styled.div`
  display :flex; 
  justify-content:center;
  align-items :center;
  width: 344px;
  height: 381px;
  background: url(${descriptionWorkoutBadge});
  margin: 102px 0 0 8px;
`
const Close = styled.div`
  width: 24px;
  height: 24px;
  margin: 20px 20px 337px 300px;
  background: url(${closeIcon});
`
const HelpIconModal = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <HelpIconModalWrapper>
      <HelpModal>
        <Close onClick={closeModal} />
      </HelpModal>
    </HelpIconModalWrapper>
  );
};

export default HelpIconModal;