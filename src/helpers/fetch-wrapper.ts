export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

async function get(url: string) {
  const requestOptions = {
      method: 'GET'
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: any) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: any) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
      method: 'DELETE'
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// helper functions

function handleResponse(response: any) {
  return response.text().then((text:any) =>  {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}
