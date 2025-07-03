export async function getMockGroupData(groupId) {
  return {
    attentionStats: {
      trueCount: 7,
      falseCount: 3
    },
    secondBySecond: Array.from({ length: 30 }, (_, i) => ({
      second: i + 1,
      attention: Math.floor(Math.random() * 100)
    }))
  }
}