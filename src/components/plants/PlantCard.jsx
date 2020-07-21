import React from 'react'
//import PlantFeature from './PlantFeature';
//import { labels } from '../../data/cleanData'

import { Link } from "react-router-dom";
import plantDefaultImage from './plantDefaultImage.svg';
import colorsArr from '../../data/colors.json';


const PlantCard = props =>  {
  //console.log(props.plant);
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
        "https://static.inaturalist.org/photos/" + t1.id + "/small." + t1.fileType + " " + sm +"w" + ", "
        + "https://static.inaturalist.org/photos/" + t1.id + "/medium." + t1.fileType + " " + md +"w" + ", "
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
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100">
        <Link to={{
          pathname: `/plant/${plant.slug}`,
          state: { plant :  plant }
        }}>
          <div className="card-head">
            {thumb1}
          </div>
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={{
              pathname: `/plant/${plant.slug}`,
              state: { plant :  plant }
            }}>
              {plant.name}
            </Link>
          </h5>
          {plant.taxa.commonName}
          <dl className="row">
            <dt className="col-12">Light</dt>
            <dd className="col-12">{
              plant.lightNeeds.map((item, index, arr) =>(
                  <span key={index}>{(index ? ", " : "") + item}</span>
                )
              )}
            </dd>
          </dl>
          {plant.flowers.colors.length > 0 ? (
            <dl className="row">
              <dt className="col-12">Flowers</dt>
              <dd className="col-12">{
                plant.flowers.colors.map((color, index) =>
                  <span
                    key={index}
                    className="color-block"
                    style={{backgroundColor:  colorsArr[color], border: "1px solid #ccc"} }
                  >
                  </span>
                )}
              </dd>
            </dl>
          ) : null}
          {plant.fruits.colors.length > 0 ? (
            <dl className="row">
              <dt className="col-12">Fruits</dt>
              <dd className="col-12">{
                plant.fruits.colors.map((color, index) =>
                  <span
                    key={index}
                    className="color-block"
                    style={{backgroundColor:  colorsArr[color], border: "1px solid #ccc"} }
                  >
                  </span>
                )}
              </dd>
            </dl>
          ) : null}
          <div className="text-right"><a href={"http://localhost:5000/edit-plant/select-images/" + plant.slug}>Edit</a></div>
        </div>
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
<dt className="col-12">{labels.flowers.colors}</dt>*/
