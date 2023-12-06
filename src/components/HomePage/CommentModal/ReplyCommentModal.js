import { styled } from 'styled-components';
import { ReactComponent as defaultProfile } from '../../../assets/images/defaultProfile2.svg'
import { ReactComponent as heart } from '../../../assets/images/heart.svg';

const Card = styled.article`
  display: flex;
  flex-direction: column;
`

const CardImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`

const CardContentImg = styled(defaultProfile)`
  width: 30px;
  height: 30px;
`;

const CardContentWrapper = styled.div`
  padding: 12px 16px 9px 72px;
  box-shadow:-2px 3px 6px #00000029;
`

const CardContent = styled.div`
  display: flex;
`

const CardMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`

const CardUserAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CardUser = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`;

const CardTime = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`

const CardContentAndHeart = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardContents = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
`

const CardHeartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardHeartIcon = styled(heart)`
  width: 16px;
  height: 16px;
  fill: ${({ $isActive }) => ($isActive ? '#FF0000' : '#D3D3D3')};
`

const CardHeartNumber = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`

const ReplyCommentModal = ({ childcomment }) => {
  return (
    <Card>
      <CardContentWrapper>
        <CardContent>
          <CardImgWrapper>
            <CardContentImg />
          </CardImgWrapper>
          <CardMainWrapper>
            <CardUserAndTime>
              <CardUser>{childcomment.commentId}</CardUser>
              <CardTime>{childcomment.createdDate}</CardTime>
            </CardUserAndTime>
            <CardContentAndHeart>
              <CardContents>{childcomment.content}</CardContents>
              <CardHeartWrapper>
                <CardHeartIcon />
                <CardHeartNumber>{childcomment.likeCount}</CardHeartNumber>
              </CardHeartWrapper>
            </CardContentAndHeart>
          </CardMainWrapper>
        </CardContent>
      </CardContentWrapper>
    </Card>
  );
};

export default ReplyCommentModal;