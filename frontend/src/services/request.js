import axios from 'axios';

export default async function request({ method, path, body }) {
  let data;
  const URL = `http://127.0.0.1:5000/api/v1/${path}`;
  
  await axios({
    method,
    url: URL,
    data: body
  })
    .then(res => data = res.data)
    .catch(err => console.log(err));

  return data;
}
