import React from 'react'
import leafRetention from '../../data/leafRetentionByState.json';
import colorsArr from '../../data/colors.json';
import monthsArr from '../../data/months.json';


const PlantMonthLine = props => {
  //console.log(props);
  const plant = props.plant
  const location = props.country + ":" + props.state_
  // console.log(plant);
  //console.log(location);
  //console.log(leafRetention[location]);

  if (plant.flowers.colors.length > 0 || plant.leaves.retention.length > 0) {

    const bloomMonths = plant.flowers.months
    let bloomColor = plant.flowers.colors[0]
    if (plant.flowers.colorMain) bloomColor = plant.flowers.colorMain
    bloomColor = colorsArr[bloomColor]

    const fruitMonths = plant.fruits.months
    let fruitColor = plant.fruits.colors[0]
    if (plant.fruits.colorMain) fruitColor = plant.fruits.colorMain
    fruitColor = colorsArr[fruitColor]

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
      if (plant.leaves.retention === "Deciduous") {
        if (i < seasonStart) { displayColor = noColor; }
        if (i >= seasonStart) { displayColor = leafColor; displayText = monthsArr[i] + ": Leaves" }
        if (i === seasonLeaves && conspicuousFall) { displayColor = fallColor; displayText = monthsArr[i] + ": Fall Colors" }
        if (i > seasonEnd) { displayColor = noColor; displayText = "" }
        if (fruitMonths.includes(i.toString())) { displayColor = fruitColor; displayText = monthsArr[i] + ": Fruiting" }
        if (bloomMonths.includes(i.toString())) { displayColor = bloomColor; displayText = monthsArr[i] + ": Blooming" }
      } else if (plant.leaves.retention === "Evergreen") {
        displayColor = leafColor;
        displayText = "Evergreen / Semi Evergreen"
      } else {
        displayColor = noColor;
        displayText = "No Information"
      }
      seasonArr.push({
        month: i,
        text: displayText,
        color: displayColor
      })
    }
    //console.log(seasonArr);

    return (
      <div className="row row-cols-12 g-0 month-line">
        {seasonArr.map((i, k) => (
          <div
            key={k}
            className={"col month-" + i.month}
            style={{ backgroundColor: i.color }}>
            {i.text !== "" ? <span className="monthtip">{i.text}</span> : null}
          </div>
        )
        )}
      </div>
    )
  }
  else {
    return null
  }

}

export default PlantMonthLine
