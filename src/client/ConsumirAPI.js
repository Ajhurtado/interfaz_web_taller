import axios from "axios"

// 👇 Función que transforma un grupo del JSON en el formato esperado
const transformarDatosGrupo = (grupoJson, nombreGrupo) => {
  const segundos = grupoJson[nombreGrupo]

  const trueCount = segundos.filter(d => d.atencion >= 0.8).length
  const falseCount = segundos.length - trueCount

  const secondBySecond = segundos.map(d => ({
    second: d.segundo,
    attention: Math.round(d.atencion * 100)
  }))

  return {
    groupName: nombreGrupo,
    attentionStats: { trueCount, falseCount },
    secondBySecond
  }
}

// 👇 Función que consulta y transforma todos los grupos
export const consultarMatriculaDatosFachada = async () => {
  const respuesta = await axios.get("http://localhost:8081/api/atencion/v1/archivosjson")
  const data = respuesta.data // ejemplo: { Grupo_55: [...], Grupo_99: [...] }

  const gruposTransformados = Object.keys(data).map(nombreGrupo =>
    transformarDatosGrupo(data, nombreGrupo)
  )

  return gruposTransformados
}
