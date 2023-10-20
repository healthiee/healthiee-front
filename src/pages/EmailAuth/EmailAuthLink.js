import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/mainLogo.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 128px;
`;

const MainLogo = styled.img`
  width: 200px;
  height: 40px;
  margin-bottom: 12px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 272px;
  height: 80px;
  padding: 11px 17px 12px 17px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 20px;
  margin-bottom: 56px;
`;

const Text = styled.p`
  line-height: 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
`;

const ContinueButton = styled.button`
  width: 200px;
  height: 40px;
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  background-color: #FFC493;
`;

const LinkText = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;

const Link = styled.a`
  margin-bottom: 37px;
  font-size: 12px;
  color: #FF9F4E;
`;

const FooterText = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;

function ContinueLogin() {
  return (
    <Container>
      <MainLogo src={Logo} alt="main logo" />
      <Content>
        <Text>
          로그인을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면 이 메일을 무시하세요.
        </Text>
      </Content>
      <ContinueButton>계속하기</ContinueButton>
      <LinkText>위 버튼을 클릭하시거나 아래 링크를 열으세요.</LinkText>
      <Link href="Https://123489387d.com">Https://123489387d.com</Link>
      <FooterText>이 링크는 24시간 동안 유효합니다.</FooterText>
    </Container>
  );
}

export default ContinueLogin;
