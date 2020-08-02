//export const API_URL = 'http://192.168.1.118/team4/risingstar/';
// export const API_URL = 'http://111.93.169.90/team4/risingstar/';

 export const API_URL = 'http://api.trustarapp.com/';
export const FILE_URL = 'https://www.trustarapp.com/';


export const post = (data) => {
  console.warn('service',API_URL+data.param,data.formData)
  return fetch(API_URL+data.param, {
    method: 'POST',
    headers: {  'Content-Type':'multipart/form-data' },
    body:  data.formData,
  })
  .then(res => res.json())
  .catch(error=>console.warn(error))
};


export const postWithJwt = (data,token) => {
  return fetch(API_URL+data.param, {
    method: 'POST',
    headers: {  'Content-Type':'multipart/form-data',
    'Authorization': 'Bearer '+token},
    body:  data.formData,
  })
  .then(res => res.json())
  .catch(error=>console.warn(error))
};




export const get = (data) => {
  return fetch(API_URL+data.param, {
    method: 'GET',
  })
  .then(res => res.json())
  .catch(error=>console.warn(error))
};


export const getWithJwt = (data,token) => {
  return fetch(API_URL+data.param, {
    headers: {'Authorization': 'Bearer '+token},
    method: 'GET',
  })
  .then(res => res.json())
  .catch(error=>console.warn(error))
};

export const initUser =(token) =>{
  return fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' + token)
  .then((response) => response.json())
  .catch(() => {
    reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}