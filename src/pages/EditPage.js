import EditForm from '../components/PostForm/PostForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditPage = () => {
  const loaderdata = useRouteLoaderData('post-detail');
  const data = loaderdata[0];

  return <EditForm method={'patch'} data={data}/>
};

export default EditPage;