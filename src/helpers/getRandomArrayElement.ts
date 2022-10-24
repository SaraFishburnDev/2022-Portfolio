const getRandomArrayElement = (element:any) => {
  return (
    element[Math.floor(Math.random()*element.length)]
  )
}

export default getRandomArrayElement