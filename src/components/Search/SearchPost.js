import styles from './SearchPost.module.css'
import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';

const SearchPost = () => {

  const nickname = useLoaderData();

  const posts = nickname.length > 0 ? nickname : ''

  return (
    <div className={styles.container}>
      {posts && posts.map(post => 
      <Link to={`/post/${post.postId}`} key={post.postId} className={styles.posts}><img src={post.medias[0].url} alt="img" /></Link>
      )}
    </div>
  )
};

export default SearchPost;

export async function loader ({params}) {
  const nickname = params.nickname;

  const response = await axios.get(`http://prod.healthiee.net/v1/search?keyword=${nickname}`,{
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