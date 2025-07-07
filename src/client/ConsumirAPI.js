import axios from "axios"

const transformarDatosGrupo = (data, nombreGrupo) => {
  const segundos = data[nombreGrupo]
  if (!Array.isArray(segundos)) return null

  const trueCount = segundos.filter(d => d.atencion_promedio >= 0.8).length
  const falseCount = segundos.length - trueCount

  const promedioPorSegundo = segundos.map(d => ({
    segundo: d.segundo,
    atencion_promedio: d.atencion_promedio
  }))

  const personas = {}
  segundos.forEach(seg => {
    seg.personas?.forEach(p => {
      if (!personas[p.id]) personas[p.id] = []
      personas[p.id].push({
        segundo: seg.segundo,
        atencion: p.atencion,
        color: p.color
      })
    })
  })

  return {
    groupName: nombreGrupo,
    attentionStats: { trueCount, falseCount },
    promedioPorSegundo,
    personas
  }
}

export const consultarMatriculaDatosFachada = async () => {
  try {
    const archivosResp = await axios.get("http://localhost:8081/api/atencion/v1/archivosjson/catalogoarchivos")
    const nombresArchivos = archivosResp.data

    const gruposTransformados = []

    for (const nombre of nombresArchivos) {
      const resp = await axios.get(`http://localhost:8081/api/atencion/v1/archivosjson/${nombre}`)
      //const contenido = JSON.parse(resp.data)
      const data = resp.data;

      const grupoKeys = Object.keys(data)
      grupoKeys.forEach(nombreGrupo => {
        const datosTransformados = transformarDatosGrupo(data, nombreGrupo)
        if (datosTransformados) gruposTransformados.push(datosTransformados)
      })
    }

    return gruposTransformados
  } catch (error) {
    console.error("Error al consultar datos:", error)
    return []
  }
}
