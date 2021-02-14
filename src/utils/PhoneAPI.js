import config from "../config"
const api = config.SERVER_URL
const modulus = "Telefone"

export const listByUser = (codigoUsuario) =>
  fetch(`${api}/listarTelefonesPorUsuario/${codigoUsuario}`)
    .then(res => res.json())

export const insert = (body) =>
  fetch(`${api}/inserir${modulus}s`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const remove = (codigoUsuario) =>
  fetch(`${api}/excluir${modulus}sPorUsuario/${codigoUsuario}`, { 
        method: 'DELETE'
  }).then(res => res.json())