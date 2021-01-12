const api = process.env.USER_API_URL || 'http://localhost:4000'
const modulus = "Usuario"
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

// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())