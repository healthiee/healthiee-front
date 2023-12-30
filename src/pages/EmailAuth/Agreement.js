import { ReactComponent as ArrowBack_Icon } from '../../assets/icons/ArrowBack_icon.svg';
import styled from 'styled-components';

const AgreementWrapper = styled.div`
  position: fixed;
  width: 360px;
  height: 640px;
  top:0;
  left:0;
  background-color: #FFFFFF;
`;

const BackButton = styled.button`
  margin: 3px 0 0 25px;
  background-color: white;
  margin-bottom: 18px;

  &:active {
    background-color: white;
  }
`;

const ArrowBackIcon = styled(ArrowBack_Icon)`
  width: 33px;
  height: 33px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0 0 34px 30px;
`;

const InformationWrapper = styled.div`
  width: 300px;
  height: 405px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 30px 19px;
  margin-left: 30px;
`;

const DescriptionMd = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: 30px;
  line-height: 1.2;
  text-align: left;
`;

const DescriptionSm = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 50px;
  line-height: 1.2;
  text-align: left;
`;

const Agreement = ({ setShowAgreement }) => {
  const closeAgreement = () => {
    setShowAgreement(false);
  }

  return (
    <AgreementWrapper>
      <BackButton
        type='button'
        onClick={closeAgreement}>
        <ArrowBackIcon />
      </BackButton>
      <Description>개인정보 이용 안내</Description>
      <InformationWrapper>
        <DescriptionMd>[헬띠의 개인정보 수집 목적]</DescriptionMd>
        <DescriptionSm>헬띠는 회원가입과 로그인 단계에서 본인인증과 로그인을 위한 링크가 회원님의 이메일로 전송되며, 이를 위한 이메일 주소를 수집하고 있습니다.</DescriptionSm>

        <DescriptionMd>[수집하는 개인정보 항목]</DescriptionMd>
        <DescriptionSm>이메일 주소</DescriptionSm>

        <DescriptionMd>[개인정보의 이용 및 보유 기간]</DescriptionMd>
        <DescriptionSm>회원가입시부터 탈퇴시까지 보유</DescriptionSm>
      </InformationWrapper>
    </AgreementWrapper>
  );
};

export default Agreement;