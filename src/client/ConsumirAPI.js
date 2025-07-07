import axios from "axios"

const transformarDatosGrupo = (data, nombreGrupo) => {
  const segundos = data[nombreGrupo]

  if (!Array.isArray(segundos)) return null

  // Pastel: cuántos segundos están atentos
  const trueCount = segundos.filter(d => d.atencion_promedio >= 0.8).length
  const falseCount = segundos.length - trueCount

  // Gráfico de promedio
  const promedioPorSegundo = segundos.map(d => ({
    segundo: d.segundo,
    atencion_promedio: d.atencion_promedio
  }))

  return {
    groupName: nombreGrupo,
    attentionStats: { trueCount, falseCount },
    promedioPorSegundo,
    segundos // ⬅️ Agregamos esto
  }
}

export const transformarDatosPorPersona = (segundos) => {
  if (!Array.isArray(segundos)) return {}

  const personas = {}

  segundos.forEach(seg => {
    seg.personas?.forEach(p => {
      if (!personas[p.id]) {
        personas[p.id] = []
      }
      personas[p.id].push({
        segundo: seg.segundo,
        atencion: p.atencion,
        color: p.color
      })
    })
  })

  return personas
}

export const consultarMatriculaDatosFachada = async () => {
  const respuesta = await axios.get("http://localhost:8081/api/atencion/v1/archivosjson")
  const data = respuesta.data

  const gruposTransformados = Object.keys(data).map(nombreGrupo =>
    transformarDatosGrupo(data, nombreGrupo)
  )

  return gruposTransformados.filter(g => g !== null)
}
