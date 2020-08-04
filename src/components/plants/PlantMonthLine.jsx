import React from 'react'
import leafRetention from '../../data/leafRetentionByState.json';
import colorsArr from '../../data/colors.json';
import monthsArr from '../../data/months.json';


const PlantMonthLine = props =>  {
  //console.log(props);
  const plant = props.plant
  const location = props.country + ":" + props.state_
//console.log(plant);
  //console.log(location);
  //console.log(leafRetention[location]);

  const bloomMonths = plant.flowers.months
  let bloomColor = plant.flowers.colors[0]
  if (plant.flowers.colorMain) bloomColor = plant.flowers.colorMain
  bloomColor = colorsArr[bloomColor]

  const fruitMonths = plant.fruits.months
  let fruitColor = plant.fruits.colors[0]
  if (plant.fruits.colorMain) fruitColor = plant.fruits.colorMain
  fruitColor = colorsArr[fruitColor]

  let isDeciduous = false
  if (plant.leaves.retention === "Deciduous") isDeciduous = true

  let conspicuousFall = false
  if (plant.leaves.conspicuousFall === true) conspicuousFall = true

  let seasonArr = []
  let seasonStart = leafRetention[location].start
  let seasonLeaves = leafRetention[location].colors
  let seasonEnd = leafRetention[location].end
  let leafColor = colorsArr['Leaf']
  let fallColor = colorsArr['Fall']
  let noColor = colorsArr['None']
  let displayColor;
  let displayText;

  for (let i = 1; i < 13; i++) {
    displayText = ""
    displayColor = ""
    if (isDeciduous) {
      if (i < seasonStart) { displayColor = noColor;}
      if (i >= seasonStart) { displayColor = leafColor; displayText = monthsArr[i] + ": Leaves" }
      if (i === seasonLeaves && conspicuousFall) { displayColor = fallColor; displayText = monthsArr[i] + ": Fall Colors" }
      if (i > seasonEnd) { displayColor = noColor; displayText = ""}
      if ( fruitMonths.includes(i.toString()) ) { displayColor = fruitColor; displayText = monthsArr[i] + ": Fruiting" }
      if ( bloomMonths.includes(i.toString()) ) { displayColor = bloomColor; displayText = monthsArr[i] + ": Blooming" }
    } else { displayColor = leafColor; displayText = "Evergreen / Semi Evergreen" }
    seasonArr.push({
      month: i,
      text: displayText,
      color: displayColor
    })
  }
  //console.log(seasonArr);

  return (
    <div className="row no-gutters month-line">
      {seasonArr.map( (i, k) => (
        <div
          key={k}
          className={"col-1 month-" + i.month}
          style={{backgroundColor:  i.color}}>
            {i.text !== "" ? <span className="monthtip">{i.text}</span> : null }
        </div>
        )
      )}
    </div>
  )
}

export default PlantMonthLine
