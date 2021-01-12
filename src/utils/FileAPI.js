const api = process.env.FILE_API_URL || 'http://localhost:4000'
const modulus = "Arquivo"
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

export const remove = (data) =>
  fetch(`${api}/excluir${modulus}/${data.codigoArquivo}`, { 
        method: 'DELETE'
        // headers 
    })
    .then(res => res.json())
export const get = (codigoArquivo) => 
    fetch(`${api}/obter${modulus}/${codigoArquivo}`, { 
            method: 'GET'
            // headers 
        })
    .then(res => res.json())

// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())