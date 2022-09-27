import React from 'react'
//import PlantFeature from './PlantFeature';
//import { labels } from '../../data/cleanData'
import PlantMonthLine from './PlantMonthLine';
import PlantImage from './PlantImage';
import FavoritePlant from './FavoritePlant';
import { Link } from "react-router-dom";
import plantDefaultImage from './plantDefaultImage.svg';
// import colorsArr from '../../data/colors.json';
//import star from '../../icons/star.svg';
import { moistureIcon } from '../../icons/moisture.js';
import { sunIcon } from '../../icons/sun.js';
import { flowerIcon } from '../../icons/flower.js';
import { berryIcon } from '../../icons/berry.js';


const PlantCard = props => {
  //console.log(props);
  //console.log(plantDefaultImage);
  const plant = props.plant
  // let thumb1 = <img src={plantDefaultImage} alt={plant.name} className="card-img-top" />;
  // let orient
  // let t1 = plant.thumb['1'][0]
  // if (t1) {
  //   let height = t1.height
  //   let width = t1.width
  //   orient = "horiz"
  //   if ((height / width) >= 1) orient = "vert"
  //   let sm = 240
  //   let md = 500
  //   let lg = 1024
  //   if (orient === "vert") {
  //     sm = Math.round((width * 240) / height)
  //     md = Math.round((width * 500) / height)
  //     lg = Math.round((width * 1024) / height)
  //   }


  //   thumb1 = <img
  //     alt={t1.alt}
  //     className={'card-img-top img-' + orient}
  //     src={t1.default}
  //     srcSet={
  //       "https://inaturalist-open-data.s3.amazonaws.com/photos/" + t1.id + "/small." + t1.fileType + " " + sm + "w, "
  //       + "https://inaturalist-open-data.s3.amazonaws.com/photos/" + t1.id + "/medium." + t1.fileType + " " + md + "w, "
  //       + "https://inaturalist-open-data.s3.amazonaws.com/photos/" + t1.id + "/large." + t1.fileType + " " + lg + "w"
  //     }
  //     sizes="(max-width: 550px) 100vw, 20vw"
  //     onError={({ currentTarget }) => {
  //       // console.log(currentTarget.onerror)
  //       // console.log(plantDefaultImage)
  //       currentTarget.onerror = null;
  //       if (currentTarget.src != plantDefaultImage) currentTarget.src = plantDefaultImage;
  //       currentTarget.srcset = "";
  //     }}
  //   />
  // }
  // if (plant.thumb['2'][0]) {
  //   //let thumb2 = <img src={plant.thumb['2'][0].default} alt={plant.thumb['2'][0].alt} className='card-img-top' />;
  // }
  // console.log("card")
  // console.log(plant.thumb["1"])
  // console.log(plant.thumb["1"][0])

  return (
    <div className="container-card col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-1">
      <div className="card h-100 mr-2 ml-2 mt-1 mb-2">
        <Link to={{
          pathname: `/plant/${plant.slug}`,
          state: { plant: plant }
        }}>
          <div className="card-head">
            {/* {thumb1} */}
            <PlantImage name={plant.name} image={plant.thumb['1'][0]} sizes="(max-width: 550px) 100vw, 20vw" imageClass="card-img-top" />

            {(plant.lightNeeds && plant.soils) && (plant.lightNeeds.length > 0 || plant.soils.moistureNeeds > 0) ?
              (
                <div className="row g-0 ps-1 pe-1 careIcons">
                  <dl className="col">
                    <dt className="visually-hidden">Light</dt>
                    <dd>{plant.lightNeeds ? plant.lightNeeds.map((item, index) => sunIcon(item, index)) : null}</dd>
                  </dl>
                  <dl className="col text-end">
                    <dt className="visually-hidden">Moisture Needs</dt>
                    <dd>{plant.soils && plant.soils.moistureNeeds ? plant.soils.moistureNeeds.map((item, index) => moistureIcon(item, index)) : null}</dd>
                  </dl>
                </div>
              )
              : null
            }
          </div>
          <FavoritePlant plant={plant} />
          <PlantMonthLine plant={plant} country={props.country} state_={props.state_} />
          <div className="card-body ps-1 pe-1 pt-2">
            <h5 className="card-title">
              {plant.name}
            </h5>
            <p>{plant.taxa && plant.taxa.commonName ? plant.taxa.commonName : null}</p>
            <div className="row plant-colors">
              {plant.flowers && plant.flowers.colors && plant.flowers.colors.length > 0 ? (
                <dl className="col-6 mb-0">
                  <dt className="visually-hidden">Flower Colors</dt>
                  <dd className="mb-0">{plant.flowers.colors.map((color, index) => flowerIcon(color, index))}</dd>
                </dl>
              ) : null}
              {plant.fruits && plant.fruits.colors && plant.fruits.colors.length > 0 ? (
                <dl className="col-6 mb-0">
                  <dt className="visually-hidden">Fruit Colors</dt>
                  <dd className="mb-0">{plant.fruits.colors.map((color, index) => berryIcon(color, index))}</dd>
                </dl>
              ) : null}
              {/*<div className="text-end"><a target="_blank" href={"http://localhost:5000/edit-plant/select-images/" + plant.slug}>Edit</a></div>*/}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PlantCard

/*
<PlantFeature dt={''} dd={props.plant.taxa.commonName} />
<PlantFeature dt={labels.height.ranges} dd={props.plant.height.ranges} />
<PlantFeature dt={labels.lightNeeds} dd={props.plant.lightNeeds} />
<PlantFeature dt={labels.soil.moistureNeeds} dd={props.plant.soil.moistureNeeds} />
<PlantFeature dt={labels.flowers.seasons} dd={props.plant.flowers.seasons} />
<dt className="col-12">{labels.flowers.colors}</dt>
*/
