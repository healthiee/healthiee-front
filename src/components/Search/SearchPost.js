import styles from './SearchPost.module.css'
import axios from 'axios';

const SearchPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
    </div>
  )
};

export default SearchPost;

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