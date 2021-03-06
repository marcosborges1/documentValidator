const api = process.env.FILE_API_URL || 'http://ec2-3-94-190-164.compute-1.amazonaws.com:4000'
const modulus = "Arquivo"
const axios = require("axios")

export const listAll = () =>
  fetch(`${api}/listar${modulus}s`)
    .then(res => res.json())

export const listByUser = (codigoUsuario) =>
  fetch(`${api}/listarArquivosPorUsuario/${codigoUsuario}`)
    .then(res => res.json())

export const insert = (body) =>
  fetch(`${api}/inserir${modulus}`, {
    method: 'POST',
    body: body
  })

  export const update = (codigoArquivo, body) =>
  fetch(`${api}/atualizar${modulus}/${codigoArquivo}`, {
    method: 'PUT',
    headers: {
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
export const getValidations = (body) => {
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
