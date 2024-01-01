import styles from './SearchName.module.css'
import axios from 'axios';
import { Fragment } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const SearchName = () => {

  const nickname = useLoaderData();

  return (
    <Fragment>
      {nickname && nickname.map(name => 
      <Link to='/profile' key={name.memberId} className={styles.container}>
        <div className={styles.img}></div>
        <div className={styles.name}>{name.nickname}</div>
        <p>사람</p>
      </Link>)}
    </Fragment>
  )
};

export default SearchName;

export async function loader ({params}) {

  const nickname = params.nickname;

  const response = await axios.get(`http://prod.healthiee.net/v1/members?nickname=${nickname}`,{
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
    }
  })

  if(response.status !== 200) {
    return <p>response error</p>
  } else {
    return response.data.data.content;
  }
}