const api = process.env.FILE_API_URL || 'http://localhost:4000'
const modulus = "Arquivo"
const axios = require("axios")
// let token = localStorage.token

// if (!token)
//   token = localStorage.token = Math.random().toString(36).substr(-8)

// const headers = {
//   'Accept': 'application/json',
//   'Authorization': token
// }


export const listAll = () =>
  fetch(`${api}/listar${modulus}s`)
    .then(res => res.json())

export const listByUser = (codigoUsuario) =>
  fetch(`${api}/listarArquivosPorUsuario/${codigoUsuario}`)
    .then(res => res.json())

export const insert = (body) =>
  fetch(`${api}/inserir${modulus}`, {
    method: 'POST',
    // headers: {
    // //   ...headers,
    //   // 'Content-Type': 'application/json'
    //   'content-type': 'multipart/form-data'
    // },
    body: body
  })

  export const update = (codigoArquivo, body) =>
  fetch(`${api}/atualizar${modulus}/${codigoArquivo}`, {
    method: 'PUT',
    headers: {
    //   ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const remove = (data) =>  {
  const options = {
    url: `${api}/excluir${modulus}/${data.codigoArquivo}`,
    timeout: 3000,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  return axios(options)
  .then(response => {
    return response;
  });
}
  // fetch(`${api}/excluir${modulus}/${data.codigoArquivo}`, { 
  //       method: 'DELETE'
  //       // headers 
  //   })
  //   .then(res => res.json())
export const get = (codigoArquivo) => 
    fetch(`${api}/obter${modulus}/${codigoArquivo}`, { 
            method: 'GET'
            // headers 
        })
    .then(res => res.json())

export const isFileOnDB = (body) =>
  fetch(`${api}/verificar${modulus}`, {
    method: 'POST',
    headers: {
    //   ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const validateFile = (body) => {

  const options = {
    url: `${api}/validacao`,
    timeout: 10000,
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

  // fetch(`${api}/validacao`, {
  //   method: 'POST',
  //   headers: {
  //   //   ...headers,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(body)
  // }).then(res => res.json())

  export const getValidations = (body) => {
    // return fetch(`${api}/validacoesPor${modulus}`, {
    //   method: 'POST',
    //   headers: {
    //   //   ...headers,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(body)
    // }).then(res => res.json())

    const options = {
      url: `${api}/validacoesPor${modulus}`,
      timeout: 2000,
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
  export const validationNegative = (body) => {

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