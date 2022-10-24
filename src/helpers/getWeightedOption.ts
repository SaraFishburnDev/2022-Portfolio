export type WeightedOptionType = {[option:string]: number}

const getWeightedOption = (optionsWeighting: WeightedOptionType) => {
  const cumul = 100
  const random = Math.floor(Math.random()*cumul)

  const weightedOption = Object.keys(optionsWeighting).find((option) => {
    const prob = cumul - optionsWeighting[option as keyof typeof optionsWeighting]
    if (random >= prob) {
      return option
    }
  })
  return weightedOption
}

export default getWeightedOption