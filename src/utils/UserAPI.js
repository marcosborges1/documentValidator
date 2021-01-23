const api = process.env.USER_API_URL || 'http://localhost:4000'
const modulus = "Usuario"
const axios = require("axios")

export const listAll = () =>
  fetch(`${api}/listar${modulus}s`)
    .then(res => res.json())

export const insert = (body) =>
  fetch(`${api}/inserir${modulus}`, {
    method: 'POST',
    headers: {
    //   ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

  export const update = (codigoUsuario, body) =>
  fetch(`${api}/atualizar${modulus}/${codigoUsuario}`, {
    method: 'PUT',
    headers: {
    //   ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const remove = (data) =>
  fetch(`${api}/excluir${modulus}/${data.codigoUsuario}`, { 
        method: 'DELETE'
        // headers 
    })
    .then(res => res.json())
export const get = (codigoUsuario) => 
    fetch(`${api}/obter${modulus}/${codigoUsuario}`, { 
            method: 'GET'
            // headers 
        })
    .then(res => res.json())

export const login = (body) => {
    const options = {
      url: `${api}/login`,
      timeout: 4000,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        ...body
      }
    };
    return axios(options)
    .then(response => {
      return response;
    });
}

export const verifyEmail = (body) => {
  const options = {
    url: `${api}/verificarEmail`,
    timeout: 4000,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      ...body
    }
  };
  return axios(options)
  .then(response => {
    return response;
  });
}

export const logout = () => {
  localStorage.removeItem("token")
  return fetch(`${api}/logout`)
  .then(res => res.json())
}
export const isAutenticate = () => {

  const options = {
    url: `${api}/isAuthenticated`,
    timeout: 4000,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'x-access-token': localStorage.token
    },
  };
  return axios(options)
  .then(response => {    
    return response;
  }).catch(error=>error.response);
  
    // {
    // return fetch(`${api}/clientes`,{
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'x-access-token': body
    //   },
    //   mode: 'cors'
      
    // })
    // .then(res => res.json())
  }
// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())