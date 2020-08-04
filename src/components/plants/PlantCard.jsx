import React from 'react'
//import PlantFeature from './PlantFeature';
//import { labels } from '../../data/cleanData'
import PlantMonthLine from './PlantMonthLine';
import FavoritePlant from './FavoritePlant';
import { Link } from "react-router-dom";
import plantDefaultImage from './plantDefaultImage.svg';
import colorsArr from '../../data/colors.json';
//import star from '../../icons/star.svg';
import { moistureIcon } from '../../icons/moisture.js';
import { sunIcon } from '../../icons/sun.js';


const PlantCard = props =>  {
  //console.log(props);
  //console.log(plantDefaultImage);
  const plant = props.plant
  let thumb1 = <img src={plantDefaultImage} alt={plant.name} className="card-img-top" />;
  let orient
  let t1 = plant.thumb['1'][0]
  if (t1) {
    let height = t1.height
    let width = t1.width
    orient = "horiz"
    if ((height / width) > 1) orient = "vert"
    let sm = 240
    let md = 500
    let lg = 1024
    if (orient === "vert") {
      sm = Math.round((width * 240) / height)
      md = Math.round((width * 500) / height)
      lg = Math.round((width * 1024) / height)
    }

    thumb1 = <img
      alt={t1.alt}
      className={'card-img-top img-' + orient }
      src={t1.default}
      srcSet={
        "https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " " + sm +"w, "
        + "https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " " + md +"w, "
        + "https://static.inaturalist.org/photos/" + t1.id + "/large." + t1.fileType + " " + lg +"w"
      }
      sizes="100vw"
      />;
      //console.log(thumb1.props.srcSet);

      /*
      sm = sm + "w"
      md = md + "w"
      lg = lg + "w"

      "https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " " + sm + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " " + md + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/large." + t1.fileType + " " + lg

      "https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " " + sm + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " " + md + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/large." + t1.fileType + " " + lg

      "https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " " + sm +"w" + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " " + md +"w" + ", "
      + "https://static.inaturalist.org/photos/" + t1.id + "/large." + t1.fileType + " " + lg +"w"

      for horizonatal images.
      sm = 240
      md = 500
      lg = 1024
      srcset={"https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " 240w"}
      srcset={"https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " 500w"}
      srcset={"https://static.inaturalist.org/photos/" + t1.id + "/large." + t1.fileType + " 1024w"}
      for vertical images.
      if (orient ==== "vert") {
        sm = (width * 240) / height
        md = (width * 500) / height
        lg = (width * 1024) / height
      }

      example
      srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
            */

  }
  if (plant.thumb['2'][0]) {
    //let thumb2 = <img src={plant.thumb['2'][0].default} alt={plant.thumb['2'][0].alt} className='card-img-top' />;
  }

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-1">
      <div className="card h-100 mr-2 ml-2 mt-1 mb-2">
        <Link to={{
          pathname: `/plant/${plant.slug}`,
          state: { plant :  plant }
        }}>
          <div className="card-head">
            {thumb1}
            <div className="row careIcons">
              <dl className="col-6">
                <dt className="sr-only">Light</dt>
                <dd>{plant.lightNeeds.map((item, index) => sunIcon(item, index))}</dd>
              </dl>
              <dl className="col-6 text-right">
                <dt className="sr-only">Moisture Needs</dt>
                <dd>{plant.soils.moistureNeeds.map((item, index) => moistureIcon(item, index))} </dd>
              </dl>
            </div>
          </div>
        <FavoritePlant plant={plant} />
        <PlantMonthLine plant={plant} country={props.country} state_={props.state_} />
        <div className="card-body">
          <h5 className="card-title">
              {plant.name}
          </h5>
          <p>{plant.taxa.commonName}</p>
          <div className="row">
          {plant.flowers.colors.length > 0 ? (
            <dl className="col-6 mb-0">
              <dt className="sr-only">Flower Colors</dt>
              <dd className="">{
                plant.flowers.colors.map((color, index) =>
                  <span
                    key={index}
                    className="color-block color-circle"
                    style={{backgroundColor:  colorsArr[color], border: "1px solid #ccc"} }
                  >
                  </span>
                )}
              </dd>
            </dl>
          ) : null}
          {plant.fruits.colors.length > 0 ? (
            <dl className="col-6 mb-0">
              <dt className="sr-only">Fruit Colors</dt>
              <dd className="">{
                plant.fruits.colors.map((color, index) =>
                  <span
                    key={index}
                    className="color-block color-circle"
                    style={{backgroundColor:  colorsArr[color], border: "1px solid #ccc"} }
                  >
                  </span>
                )}
              </dd>
            </dl>
          ) : null}
          {/*<div className="text-right"><a target="_blank" href={"http://localhost:5000/edit-plant/select-images/" + plant.slug}>Edit</a></div>*/}
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
