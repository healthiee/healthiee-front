import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DescriptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 22px;
`
const ImageThumbnail = styled.img`
  width: 104px;
  height: 104px;
  background-image: url(${props => props.postImg});
  border-radius: 25px;
`
const Description = () => {
  const [postImg, setPostImg] = useState([]);

  useEffect(() => {
    const fetchImg = async() => {
      try {
        const response = await axios.get('http://prod.healthiee.net/v1/posts',{
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
          }
        })
        setPostImg(response.data.data.content);
      } catch (err) {
      console.log(err);
    }
  }
    fetchImg();
  }, []);

  return (
    <DescriptionWrapper>
      {postImg && postImg.map((img, i) => {
        return(
          <React.Fragment key={postImg.id}>
              <ImageThumbnail 
                src={img.medias.url}
              />
          </React.Fragment>
        )
      })}
    </DescriptionWrapper>
    )
};

export default Description;