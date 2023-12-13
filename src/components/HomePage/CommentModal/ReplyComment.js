import { styled } from 'styled-components';
import { ReactComponent as defaultProfile } from '../../../assets/images/defaultProfile2.svg'
import { ReactComponent as replyIcon } from '../../../assets/images/replyIcon.svg'

const CardContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const ReplyIcon = styled(replyIcon)`
  width: 17px;
  height: 14.5px;
  margin-right: 8px;
  fill: ${({ theme }) => theme.colors.gray};
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

const CardContents = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #000000;
  line-height: 1.7;
`

const UserId = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`

const UserMessage = styled.span`

`

const ReplyComment = ({ comment }) => {

  const contentParts = comment.content.split(' ');
  const userId = contentParts[0];
  const message = contentParts.slice(1).join(' ');

  return (
      <CardContent>
        <ReplyIcon />
        <CardImgWrapper>
          <CardContentImg />
        </CardImgWrapper>
        <CardMainWrapper>
          <CardUserAndTime>
            <CardUser>{comment.commentId}</CardUser>
          </CardUserAndTime>
            <CardContents>
              <UserId>{userId}</UserId>{' '}
              <UserMessage>{message}</UserMessage>
            </CardContents>
        </CardMainWrapper>
      </CardContent>
  );
};

export default ReplyComment;