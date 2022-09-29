import React, { useEffect, useState } from 'react'
// import Breadcrumbs from '../components/Breadcrumbs'
import plantDefaultImage from '../components/plants/plantDefaultImage.svg';
import PlantImage from '../components/plants/PlantImage';
import FavoritePlant from '../components/plants/FavoritePlant';
// import PlantMonthLine from '../components/plants/PlantMonthLine';
import PlantDetailTR from '../components/plants/PlantDetailTR';
import PlantDetailTRminmax from '../components/plants/PlantDetailTRminmax';
// import Masonry from 'react-smart-masonry';
import { moistureIcon } from '../icons/moisture.js';
import { sunIcon } from '../icons/sun.js';
import { flowerIcon } from '../icons/flower.js';
import { berryIcon } from '../icons/berry.js';
import { useParams } from "react-router-dom";
import { getStoredPlant } from '../actions/getStoredPlant';


const Plant = props => {
  // console.log(props);
  // console.log(useParams);
  const { plantSlug } = useParams();
  const plants = props.plants
  const [plant, setPlant] = useState(plants.find(plant => plant.slug === plantSlug));
  // console.log(plant);
  let pageTitle = plant.name
  if (plant.taxa && plant.taxa.commonName) pageTitle += " (" + plant.taxa.commonName + ")"
  pageTitle = pageTitle + " | Native Plants of North Carolina";
  useEffect(() => document.title = pageTitle, [pageTitle])

  useEffect(() => {
    return getStoredPlant(plant.id).then(data => {
      // const plantAll = { ...plant, ...data };
      // console.log(data)
      if (data) setPlant({ ...plant, ...data })
    });
  }, [])
  // const country = props.country
  // const state_ = props.state_
  // const region = country + ':' + state_
  //console.log(country);
  //console.log(region);
  //console.log(plant);
  let imgArr = []
  let image
  if (plant.thumb['1'][0]) {
    image = plant.thumb['1'][0]
    imgArr.push(plant.thumb['1'][0])
  }
  if (plant.thumb['2'] && plant.thumb['2'][0]) imgArr.push(plant.thumb['2'][0])
  if (plant.images && plant.images.length > 0) imgArr = imgArr.concat(plant.images)
  // console.log(imgArr)
  if (imgArr.length === 0) imgArr.push(
    {
      "id": 0,
      "idObsrv": 0,
      "default": plantDefaultImage,
      "fileType": "jpeg",
      "license": "cc0",
      "alt": "generic image",
    }
    // {
    //   id: "default",
    //   src: plantDefaultImage,
    //   alt: "generic image",
    //   license: "cc0"
    // }
  )
  // console.log(plant.thumb['1'][0])
  // console.log(imgArr)
  const iNatSrc = "https://inaturalist-open-data.s3.amazonaws.com/photos/"

  //console.log(imgArr);
  /*<Breadcrumbs plant={plant} />*/

  return (
    <div className="row">
      <div className="col plant-page">
        <div className="plant-header">
          {plant.plantTypes && plant.plantTypes.length > 0 ? (
            <ul className="list-unstyled list-inline plant-types">
              {plant.plantTypes.map((i, key) => (
                <li className="list-inline-item list-pipe" key={key}>
                  {i}
                </li>
              )
              )}
            </ul>
          ) : null}
          <FavoritePlant plant={plant} />
          <p className="mb-0">
            {plant.taxa && plant.taxa.scientificFamily ? plant.taxa.scientificFamily : null}
            {plant.taxa && plant.taxa.commonFamily ? plant.taxa.commonFamily && <span>({plant.taxa.commonFamily})</span> : null}
          </p>
          <h1>{plant.name}</h1>
          <p>
            <strong>{plant.taxa && plant.taxa.commonName ? plant.taxa.commonName : null}</strong>
            {plant.taxa && plant.taxa.commonAlts && plant.taxa.commonAlts.length > 0 ? ", " + plant.taxa.commonAlts.map((i, key) => (i)).join(", ") : null}
            {plant.taxa && plant.taxa.scientificAlts && plant.taxa.scientificAlts.length > 0 ? (
              <span>
                <strong>Synonyms / Analogs</strong>:&nbsp;
                {plant.taxa.scientificAlts.map((i, key) => (i)).join(", ")}
              </span>
            ) : null}
          </p>
          {plant.lightNeeds && plant.soils && plant.soils.moistureNeeds && (plant.lightNeeds.length > 0 || plant.soils.moistureNeeds.length > 0) ? (
            <div className="row careIcons mb-1">
              <div className="col">
                <dl>
                  <dt className="visually-hidden">Light</dt>
                  <dd>{plant.lightNeeds.map((item, index) => sunIcon(item, index))}</dd>
                </dl>
              </div>
              <div className="col">
                <dl>
                  <dt className="visually-hidden">Moisture Needs</dt>
                  <dd>{plant.soils.moistureNeeds.map((item, index) => moistureIcon(item, index))} </dd>
                </dl>
              </div>
            </div>
          ) : null}
        </div>
        <div className="plant-images">
          <div className="images-main">
            {image ? (
              <div className="figure-thumb">
                <PlantImage showCredit={true} name={plant.name} image={image} sizes="calc(50vw - 24px)" imageClass="img-fluid" />
              {/* // <figure className="figure figure-thumb">
              //   <img
              //     src={iNatSrc + image.id + "/large." + image.fileType}
              //     alt={image.alt}
              //     className="img-fluid"
              //     sizes="(max-width: 550px) 40vw, 50vw"
              //     onError={({ currentTarget }) => {
              //       console.log(currentTarget.parentElement)
              //       currentTarget.onerror = null
              //       currentTarget.parentElement.remove()
              //     }}
              //   />
              //   {image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
              // </figure> */}
              </div>
            )
              : null
            }
            <div className="images-row masonry-with-columns g-0">
              {imgArr.map((image, key) => (
                <PlantImage key={key} showCredit={true} name={plant.name} image={image} sizes="(min-width: 1200px) 25vw, calc(25vw - 17px)" imageClass="img-fluid" />

                // <figure className="figure" key={key}>
                //   <img
                //     src={iNatSrc + image.id + "/large." + image.fileType}
                //     sizes="(max-width: 550px) 40vw, 25vw"
                //     alt={image.alt}
                //     className="img-fluid"
                //     onError={({ currentTarget }) => {
                //       console.log(currentTarget.parentElement)
                //       currentTarget.onerror = null
                //       currentTarget.parentElement.remove()
                //     }}

                //   />
                //   {image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
                // </figure>
              )
              )}
            </div>
          </div>
          <div className='d-grid mt-2 mb-2 gap-2'><a className='btn btn-secondary' target="_blank" href={"https://www.inaturalist.org/taxa/" + plant.id + "/browse_photos"}>More Photos</a></div>
        </div>

        <div className="plant-details">
          {plant.flowers && plant.flowers.colors && plant.fruits && plant.fruits.colors && (plant.flowers.colors.length > 0 || plant.fruits.colors.length > 0) ? (
            <div className="row colorIcons mb-1 mb-0 ps-1">
              <div className="col">
                <dl className='mb-0'>
                  <dt className="visually-hidden">Colors</dt>
                  <dd className='mb-0'>
                    {plant.flowers.colors.map((item, index) => flowerIcon(item, index))}
                    {plant.fruits.colors.map((item, index) => berryIcon(item, index))}
                  </dd>
                </dl>
              </div>
            </div>
          ) : null}
          <table>
            <tbody>
              <PlantDetailTR heading="Plant Type" field={plant.plantTypes} check={plant.nitrogen} check_note="Fixes Nitrogen" />
              <PlantDetailTR heading="Lifecycle" field={plant.lifeCycle} />
              <PlantDetailTRminmax heading="Height" field={plant.height} />
              <PlantDetailTRminmax heading="Spread" field={plant.spread} />
              <PlantDetailTR heading="Light" field={plant.lightNeeds} />
              {
                plant.soils ?
                  <PlantDetailTR heading="Moisture" field={plant.soils.moistureNeeds} subfield="moistureNeeds" />
                  : null
              }
              {
                plant.soils ?
                  <PlantDetailTR heading="Soil" field={plant.soils.types} note={plant.soils.phNeeds} check={true} check_note="pH" />
                  : null}
              {
                plant.flowers ?
                  <PlantDetailTR heading="Flowers" field={plant.flowers.colors} note={plant.flowers.seasons} />
                  : null}
              {
                plant.fruits ?
                  <PlantDetailTR heading="Fruits" field={plant.fruits.colors} note={plant.fruits.seasons} check={plant.fruits.conspicuous} check_note="Conspicuous" />
                  : null}
              {
                plant.leaves ?
                  <PlantDetailTR heading="Leaves" field={plant.leaves.retention} check={plant.leaves.conspicuousFall} check_note="Fall Colors" />
                  : null
              }
              <PlantDetailTR heading="Attracts" field={plant.attracts} />
              <PlantDetailTR heading="Tolerant" field={plant.tolerant} />
              <PlantDetailTR heading="Problems" field={plant.problems} />
            </tbody>
          </table>
          <div className="row">
            {plant.externalLinks ?
              (
                <div className="col-xl-6">
                  <h3 className="h5">Learn More</h3>
                  <ul className="list-unstyled">
                    {plant.externalLinks.map((i, key) => (
                      <li className="" key={key}>
                        <a href={i.url} target="_blank" rel="noopener noreferrer">{i.label}</a>
                      </li>
                    )
                    )}
                  </ul>
                </div>
              ) : null}
            {plant.sources ?
              (
                <div className="col-xl-6">
                  <h3 className="h5">Sources</h3>
                  <ul className="list-unstyled">
                    {plant.sources.map((i, key) => (
                      <li className="" key={key}>
                        <a href={i.url} target="_blank" rel="noopener noreferrer">{i.label}</a> ({i.from})
                      </li>
                    )
                    )}
                  </ul>
                </div>
              ) : null}
          </div>
          <div className="text-right"><a target="_blank" rel="noopener noreferrer" href={"http://localhost:4000/edit-plant/select-images/" + plant.slug}>Edit</a></div>
        </div>
      </div>
    </div >
  );
}
export default Plant;