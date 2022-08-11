import React, {useEffect} from 'react'
// import Breadcrumbs from '../components/Breadcrumbs'
import plantDefaultImage from '../components/plants/plantDefaultImage.svg';
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

const Plant = props => {
  // console.log(props);
  // console.log(useParams);
  const { plantSlug } = useParams();
  const plants = props.plants
  const plant = plants.find(plant => plant.slug === plantSlug)
  console.log(plant);
  let pageTitle = plant.name
  if (plant.taxa.commonName) pageTitle += " (" + plant.taxa.commonName + ")"
  pageTitle = pageTitle + " | Native Plants of North Carolina";
  useEffect(() => document.title = pageTitle, [pageTitle])

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
  if (plant.thumb['2'][0]) imgArr.push(plant.thumb['2'][0])
  if (plant.images && plant.images.length > 0) imgArr = imgArr.concat(plant.images)
  console.log(imgArr)
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
  console.log(plant.thumb['1'][0])
  console.log(imgArr)
  const iNatSrc = "https://inaturalist-open-data.s3.amazonaws.com/photos/"

  //console.log(imgArr);
  /*<Breadcrumbs plant={plant} />*/

  return (
    <div className="row">
      <div className="col plant-page">
        <div className="plant-header">
          {plant.plantTypes.length > 0 ? (
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
          <p className="mb-0">{plant.taxa.scientificFamily} {plant.taxa.commonFamily && <span>({plant.taxa.commonFamily})</span>}</p>
          <h1>{plant.name}</h1>
          <p>
            <strong>{plant.taxa.commonName}</strong>
            {plant.taxa.commonAlts.length > 0 ? ", " : null}
            {plant.taxa.commonAlts.map((i, key) => (
              i
            )
            ).join(", ")}

          </p>
          {plant.lightNeeds.length > 0 || plant.soils.moistureNeeds.length > 0 ? (
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
          {plant.taxa.scientificAlts.length > 0 ? (
            <div>
              <strong>Synonyms / Analogs</strong>:&nbsp;
              {plant.taxa.scientificAlts.map((i, key) => (
                i
              )
              ).join(", ")}
            </div>
          ) : null}
        </div>
        <div className="plant-images">
          <div className="images-main">
            {image ? (
              <figure className="figure figure-thumb">
                <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                {image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
              </figure>)
              : null
            }
            <div className="images-row masonry-with-columns g-0">
              {imgArr.map((image, key) => (
                <figure className="figure" key={key}>
                  <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                  {image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
                </figure>
              )
              )}
            </div>
          </div>
        </div>

        <div className="plant-details">
          {plant.flowers.colors.length > 0 || plant.fruits.colors.length > 0 ? (
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
              <PlantDetailTR heading="Moisture" field={plant.soils.moistureNeeds} />
              <PlantDetailTR heading="Soil" field={plant.soils.types} note={plant.soils.phNeeds} check={true} check_note="pH" />
              <PlantDetailTR heading="Flowers" field={plant.flowers.colors} note={plant.flowers.seasons} />
              <PlantDetailTR heading="Fruits" field={plant.fruits.colors} note={plant.fruits.seasons} check={plant.fruits.conspicuous} check_note="Conspicuous" />
              <PlantDetailTR heading="Leaves" field={plant.leaves.retention} check={plant.leaves.conspicuousFall} check_note="Fall Colors" />
              <PlantDetailTR heading="Attracts" field={plant.attracts} />
              <PlantDetailTR heading="Tolerant" field={plant.tolerant} />
              <PlantDetailTR heading="Problems" field={plant.problems} />
            </tbody>
          </table>
          <div className="row">
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
          </div>
          <div className="text-right"><a target="_blank" rel="noopener noreferrer" href={"http://localhost:5000/edit-plant/select-images/" + plant.slug}>Edit</a></div>
        </div>
      </div>
    </div >
  );
}
export default Plant;



/*
              {imgArr.map((image, key) => (
                <div className={`col-img mb-2 pe-2 ${key !== 0 ? "col-lg-6" : "col-xl-6"}`}>
                  <figure className="figure" key={key}>
                    <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                    {image.license !== "cc0" ? <figcaption className="figure-caption">{key}{image.credit}</figcaption> : null}
                  </figure>
                </div>
              )
              )}


                <div className={`col-img mb-2 pe-2 ${key !== 0 ? "col-lg-6" : "col-xl-6"}`}>
                </div>


                              <Masonry
                breakpoints={{ mobile: 0, tablet: 900, desktop: 1600 }}
                columns={{ mobile: 1, tablet: 2, desktop: 2 }}
                gap={{ mobile: 10, tablet: 10, desktop: 10 }}
                autoArrange={true}
              >
                {imgArr.map((image, key) => (
                  <figure className="figure" key={key}>
                    <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                    {image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
                  </figure>
                ))}
              </Masonry>

              */