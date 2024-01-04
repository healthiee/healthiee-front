import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/instance';

const DescriptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 22px;
`;

const ImageThumbnail = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 25px;
`;

const Description = () => {
  const detailsData = useLoaderData().details;
  const [postDetails, setPostDetails] = useState(detailsData);
  const navigate = useNavigate();

  const postHandler = (postId) => {
    navigate(`/post/${postId}`)
  }

  return (
    <DescriptionWrapper>
      {postDetails.map((detail, i) => (
        <React.Fragment key={i}>
          <ImageThumbnail src={detail.imageUrl} alt={`Image ${i}`} onClick={() => postHandler(detail.postId)} />
        </React.Fragment>
      ))}
    </DescriptionWrapper>
  );
};

export default Description;

export async function loader() {
  try {
    const response = await api.get('v1/posts', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      },
    });

    const posts = response.data.data.content;
    console.log(posts);
    const details = posts.map(post => ({
      postId: post.postId,
      imageUrl: post.medias[0].url
    }))

    return { details };
  } catch (err) {
    console.error(err);
  }
}