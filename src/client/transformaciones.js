export const transformarDatosGrupo = (data, nombreGrupo) => {
  const segundos = data[nombreGrupo]
  if (!Array.isArray(segundos)) return null

  const trueCount = segundos.filter(d => d.atencion_promedio >= 0.8).length
  const falseCount = segundos.length - trueCount

  const promedioPorSegundo = segundos.map(d => ({
    segundo: d.segundo,
    atencion_promedio: d.atencion_promedio
  }))

  return {
    groupName: nombreGrupo,
    attentionStats: { trueCount, falseCount },
    promedioPorSegundo
  }
}

export const transformarDatosPorPersona = (segundos) => {
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
  return personas
}
