import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import plantDefaultImage from '../components/plants/plantDefaultImage.svg';

const Plant = props => {
  console.log(props);
  const plants = props.plants
  const plant = props.plants.find(plant => plant.slug === props.match.params.plantSlug)
  //console.log(plant);
  let imgArr = []
  if (plant.thumb['1'][0]) imgArr.push(plant.thumb['1'][0])
  if (plant.thumb['2'][0]) imgArr.push(plant.thumb['2'][0])
  imgArr = imgArr.concat(plant.images)
  if (imgArr.length === 0 ) imgArr.push(
    { src: plantDefaultImage,
      alt: "generic image",
      license: "cc0"
    }
  )
  const iNatSrc = "https://static.inaturalist.org/photos/"

  console.log(imgArr);
  return (
    <div className="container">
      <Breadcrumbs plant={plant} />
      <div className="row">
        <div className="col-6">
          <ul className="list-unstyled list-inline">
            {plant.plantTypes.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                <a href="/#" >{i}</a>
              </li>
              )
            )}
          </ul>
          <p>{plant.taxa.scientificFamily} ({plant.taxa.commonFamily})</p>
          <h1>{plant.name}</h1>
          <ul className="list-unstyled list-inline">
            {plant.taxa.scientificAlts.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item list-pipe">
              {plant.taxa.commonName}
            </li>
            {plant.taxa.commonAlts.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Native</h3>
          <ul className="list-unstyled list-inline">
            {plant.native['US'].map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h3>NC Regions</h3>
          <ul className="list-unstyled list-inline">
            {plant.regions['US:NC'].map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h3>Exotic</h3>
          <ul className="list-unstyled list-inline">
            {plant.exotic['US'] ? plant.exotic['US'].map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            ) : null}
          </ul>
          <hr />
          <h3>Life Cycle</h3>
          <p>{plant.lifeCycle}</p>
          <hr />
          <h3>Flowers</h3>
            { plant.flowers.conspicuous === true ? <p>Conspicuous Flowers</p> : null }
          <h4>Colors</h4>
          <ul className="list-unstyled list-inline">
            {plant.flowers.colors.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Bloom Season</h4>
          <ul className="list-unstyled list-inline">
            {plant.flowers.seasons.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Bloom Months</h4>
          <ul className="list-unstyled list-inline">
            {plant.flowers.months.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Fruits</h3>
            { plant.fruits.conspicuous === true ? <p>Conspicuous Fruits</p> : null }
          <h4>Colors</h4>
          <ul className="list-unstyled list-inline">
            {plant.fruits.colors.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Fruiting Season</h4>
          <ul className="list-unstyled list-inline">
            {plant.fruits.seasons.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Fruiting Months</h4>
          <ul className="list-unstyled list-inline">
            {plant.fruits.months.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Light</h3>
          <ul className="list-unstyled list-inline">
            {plant.lightNeeds.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Soil</h3>
          <h4>Moisture Needs</h4>
          <ul className="list-unstyled list-inline">
            {plant.soils.moistureNeeds.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Soil Types</h4>
          <ul className="list-unstyled list-inline">
            {plant.soils.types.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Soil pH</h4>
          <ul className="list-unstyled list-inline">
            {plant.soils.phNeeds.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <h4>Nitrogen</h4>
          { plant.nitrogen === true ? <p>Fixes Nitrogen</p> : null }
          <hr />
          <h3>Leaves</h3>
          { plant.leaves.fallColors === true ? <p>Fall Colors</p> : null }
          <h4>Retention</h4>
          <p>{plant.leaves.retention}</p>
          <hr />
          <h3>Height</h3>
          {plant.height.min} – {plant.height.max} {plant.height.unit}
          <hr />
          <h3>Spread</h3>
          {plant.spread.min} – {plant.spread.max} {plant.spread.unit}
          <hr />
          <h3>Attracts</h3>
          <ul className="list-unstyled list-inline">
            {plant.attracts.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Tolerant</h3>
          <ul className="list-unstyled list-inline">
            {plant.tolerant.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Problems</h3>
          <ul className="list-unstyled list-inline">
            {plant.attracts.map( (i, key) => (
              <li className="list-inline-item list-pipe" key={key}>
                {i}
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Gardens</h3>
          { plant.gardens === true ? <p>Good For Gardens</p> : null }
          <hr />
          <h3>External Links</h3>
          <ul className="list-unstyled">
            {plant.externalLinks.map( (i, key) => (
              <li className="" key={key}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">{i.label}</a>
              </li>
              )
            )}
          </ul>
          <hr />
          <h3>Sources</h3>
          <ul className="list-unstyled">
            {plant.sources.map( (i, key) => (
              <li className="" key={key}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">{i.label}</a> ({i.from})
              </li>
              )
            )}
          </ul>
          <hr />
          <div className="text-right"><a href={"http://localhost:5000/edit-plant/select-images/" + plant.slug}>Edit</a></div>
        </div>
        <div className="col-6 order-first">
          <div className="row">
            <div className="col-3 order-first">
              {imgArr.map( (image, key) => (
                <figure className="figure" key={key}>
                  <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                </figure>
                )
              )}
            </div>
            <div className="col-9">
              {imgArr.map( (image, key) => (
                <figure className="figure" key={key}>
                  <img src={iNatSrc + image.id + "/large." + image.fileType} alt={image.alt} className="img-fluid" />
                  { image.license !== "cc0" ? <figcaption className="figure-caption">{image.credit}</figcaption> : null }
                </figure>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Plant;
