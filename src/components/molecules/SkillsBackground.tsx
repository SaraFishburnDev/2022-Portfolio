import { Icon } from '@iconify/react'
import { useState } from "react"
import getRandomArrayElement from "../../helpers/getRandomArrayElement"


const Dot = ({width, color}: {width: number, color: string}) => {
  return (
    <div 
      style={{
        "--dot-width": `${width}px`,
        "--dot-color": `${color}`
    } as any}>
      <div className="w-[var(--dot-width)] [aspect-ratio:1/1] bg-[var(--dot-color)] rounded-full"></div>
    </div>
  )
}

const positionDot = (cellWidth:number, row: number, column:number) => {
  const xPos = Math.floor(Math.random()*cellWidth) + (column * cellWidth)
  const yPos = Math.floor(Math.random()*cellWidth) + (row * cellWidth)
  return {x: xPos, y: yPos}
}

const distFromCenter = (pos: number, centerPos: number) => {
  if(pos <= centerPos) {
    return centerPos - pos
  } else {
   return pos - centerPos
  }
}

const inCircleArea = (
  pos: {[key: string] : number}, 
  centerPos: {[key: string] : number},
  radius: number) => {
  const xDistFromCenter = distFromCenter(pos.x, centerPos.x)
  const yDistFromCenter = distFromCenter(pos.y, centerPos.y)
  const squaredPositionRadius = (xDistFromCenter ** 2) + (yDistFromCenter ** 2)
  const squaredRadius = radius ** 2
  return squaredPositionRadius <= squaredRadius
}

type SkillsBackgroundProps = {
  width: number,
  height: number,
  density: number,
  colors?: string | string[],
  twinkle?: boolean,
  icons?: string | string[] | null,
  circle?: boolean,
  expanded: boolean,
  sizeVariation?: number[]
}

const SkillsBackground = (props: SkillsBackgroundProps) => {

  let {width, height, density, colors, twinkle, icons, circle, expanded, sizeVariation} = props
  colors = colors ? Array.isArray(colors) ? colors : [colors] : ["#fff"]
  icons = icons ? Array.isArray(icons) ? icons : [icons] : null

  //  determine how many across and how many down
  // Math.ceil ensures the whole area is populated
  const cellWidth = Math.ceil(width / density)
  const cellsRows = Math.ceil((height / 2) / cellWidth) * 2
  const cellsColumns = Math.ceil((width / 2) / cellWidth) * 2

  const starAreaCenter = {x: (cellWidth * cellsColumns) / 2, y: (cellWidth * cellsRows) / 2}
  const actualAreaCenter = {x: width / 2, y: height / 2}

  const actualAreaDifference = {
    y: starAreaCenter.y - actualAreaCenter.y,
    x: starAreaCenter.x - actualAreaCenter.x,
  }

  //find the radius for if circle is true
  const radius = Math.min(width, height) / 2

  const [positions, setPositions] = useState(calcPositions(icons))

  function calcPositions(icons: any) {
    // nested forloop each row and column, find position & add to array
    const newPositions: any = []
    Array(cellsRows).fill(null).forEach((_, rowIndex) => {
      const rowArray: any = []
      Array(cellsColumns).fill(null).forEach((_, columnIndex) => {
        const newPosition: any = positionDot(cellWidth, rowIndex, columnIndex)
  
        //adjust position to account for ceil values
        newPosition.x -= actualAreaDifference.x
        newPosition.y -= actualAreaDifference.y
  
        const inActualArea = newPosition.x >= 0 && newPosition.x <= width && newPosition.y >= 0 && newPosition.y <= height
        const inCircle = circle ? inCircleArea(newPosition, actualAreaCenter, radius) : true
  
        if(inActualArea && inCircle) {
          newPosition.size = sizeVariation ? getRandomArrayElement(sizeVariation) : Math.floor(Math.random()*4) + 1
          newPosition.color = getRandomArrayElement(colors)
          rowArray.push(newPosition)
        } else {
          rowArray.push({x: null, y: null})
        }
      })
      newPositions.push(rowArray)
    })

    icons?.map((icon: any, i: number) => {
      let iconCell = getRandomCell(newPositions, i) as {x: number, y: number, icon?: string}
      while (iconCell.icon || !(iconCell.x && iconCell.y)){
        iconCell = getRandomCell(newPositions, i)
      }
      iconCell.icon = icon
    })

    return newPositions
  }
  

  // pick random stars to become icons
  const getRandomCell = (positions: any, i: number) => {

    const numDivisions = Math.ceil(Math.sqrt((icons as string[]).length))

    const rowsChunkSize = Math.floor(positions.length / numDivisions)
    const columnsChunkSize = Math.floor(positions[0].length / numDivisions)

    const j = Math.floor(i / numDivisions)
    i = i % numDivisions

    const randomRowIndex = Math.floor(Math.random()*rowsChunkSize) + (rowsChunkSize * i)
    const randomColumnIndex = Math.floor(Math.random()*columnsChunkSize) + (columnsChunkSize * j)

    return positions[randomRowIndex][randomColumnIndex]
  }

  return (
    <>
      <div 
        style={{
          "--area-height": `${height}px`,
          "--area-width": `${width}px`,
        } as any}
        className="w-[var(--area-width)] h-[var(--area-height)] relative ml-[200px]">
          {positions.map((row: []) => (
            row.map((dot: {x: number | null, y: number | null, icon?: string, size: number, color: string}) => {
              return (
                dot.x && dot.y &&
                <div 
                style={{
                  "--dot-top": `${expanded ? dot.y : actualAreaCenter.y}px`,
                  "--dot-left": `${expanded ? dot.x : actualAreaCenter.x}px`,
                  "--animation-duration": `${Math.floor(Math.random()*200) + 500}ms`,
                  "--twinkle-delay": `${Math.floor(Math.random()*8000) + 3000}ms`,
                } as any}
                className={`absolute top-[var(--dot-top)] left-[var(--dot-left)]
                  transition-[top,left] duration-[var(--animation-duration)]
                  ${twinkle && "animate-[twinkle_10s_ease-in-out_var(--twinkle-delay)_infinite]"}`}>
                  {dot.icon ? 
                    <div 
                      style={{
                        "--icon-color": `${dot.color}`,
                        "--icon-width": `${Math.floor(Math.random()*3) + 16}px`
                      } as any}
                      className="text-[var(--icon-color)] w-[var(--icon-width)]">
                      <Icon icon={dot.icon} className="text-current fill-current w-full h-full"/>
                    </div>
                    :
                    <Dot width={dot.size} color={dot.color}/>
                  }
                </div>
              )
              })
          ))}


      </div>
    </>
  )
}

export default SkillsBackground