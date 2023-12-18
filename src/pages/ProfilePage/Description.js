import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const [postImages, setPostImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://prod.healthiee.net/v1/posts', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`, // Replace with your actual token
          },
        });
        const posts = response.data.data.content;
        const images = posts.flatMap((post) =>
        post.medias.map((media) => media.url)
        );
        console.log(posts);
        console.log(images);
        setPostImages(images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  return (
    <DescriptionWrapper>
      {postImages.map((imgUrl, i) => (
        <React.Fragment key={i}>
          <ImageThumbnail src={imgUrl} alt={`Image ${i}`} />
        </React.Fragment>
      ))}
    </DescriptionWrapper>
  );
};

export default Description;
