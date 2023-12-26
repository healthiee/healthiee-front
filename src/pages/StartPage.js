import { useNavigate } from 'react-router-dom';
import mainLogo from '../assets/images/mainLogo.png'
import styled from "styled-components";

const MainLogo = styled.img`
  width: 300px;
  height: 60px;
  margin: 130px 30px 270px;
`;

const Button = styled.button`
  width: 200px;
  height: 60px;
  margin: 0 80px 120px;
  font-size: ${({ theme }) => theme.fontSize.xlg};
  border-radius: 30px;
`;

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/emaillogin')
  };

  return (
    <>
      <MainLogo src={mainLogo} alt="healthiee main logo" />
      <Button onClick={handleStartClick}>시작하기</Button>
    </>
  );
};

export default StartPage;