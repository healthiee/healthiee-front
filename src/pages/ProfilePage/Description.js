import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [postDetails, setPostDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://prod.healthiee.net/v1/posts', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
          },
        });
        const posts = response.data.data.content;
        const details = posts.flatMap((post) => post.medias.map((media) => {
          return {
            postId: post.postId,
            imageUrl: media.url
          }
        }));
        setPostDetails(details);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

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