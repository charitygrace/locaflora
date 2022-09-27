import React from 'react'
import plantDefaultImage from './plantDefaultImage.svg';



const PlantImage = props => {
  const {
    name,
    image,
    sizes,
    imageClass,
    showCredit = false
  } = props;

  let iNatSrc = "https://inaturalist-open-data.s3.amazonaws.com/photos/"
  const iNatSrcAlt = "https://static.inaturalist.org/photos/"
  //src={'https://static.inaturalist.org/photos/' + photo.iNatId + '/medium' + photo.fileType} 
  // src={'https://inaturalist-open-data.s3.amazonaws.com/photos/' + photo.iNatId + '/medium' + photo.fileType} 

  // console.log("image")
  // console.log(image)

  if (image) {
    let orient = "horiz"
    if ((image.height / image.width) >= 1) orient = "vert"
    let sm = 240
    let md = 500
    let lg = 1024
    if (orient === "vert") {
      sm = Math.round((image.width * 240) / image.height)
      md = Math.round((image.width * 500) / image.height)
      lg = Math.round((image.width * 1024) / image.height)
    }
    return (
      <figure className="figure figure-thumb">
        <img
          alt={name}
          className={imageClass + " img-" + orient}
          src={iNatSrc + image.id + "/large." + image.fileType}
          srcSet={
            iNatSrc + image.id + "/small." + image.fileType + " " + sm + "w, "
            + iNatSrc + image.id + "/medium." + image.fileType + " " + md + "w, "
            + iNatSrc + image.id + "/large." + image.fileType + " " + lg + "w, "
            + iNatSrc + image.id + "/original." + image.fileType + " " + image.width + "w"
          }
          sizes={sizes}
          onError={({ currentTarget }) => {
            // console.log(currentTarget.onerror)
            // console.log(plantDefaultImage)
            currentTarget.onerror = null
            iNatSrc = iNatSrcAlt
            const src2 = iNatSrc + image.id + "/large." + image.fileType
            if (currentTarget.src != src2) {
              currentTarget.src = iNatSrc + image.id + "/large." + image.fileType
              currentTarget.srcset = iNatSrc + image.id + "/small." + image.fileType + " " + sm + "w, "
                + iNatSrc + image.id + "/medium." + image.fileType + " " + md + "w, "
                + iNatSrc + image.id + "/large." + image.fileType + " " + lg + "w, "
                + iNatSrc + image.id + "/original." + image.fileType + " " + image.width + "w"
            } else currentTarget.parentElement.remove()
          }}
        />
        {image.license !== "cc0" && showCredit == true ? <figcaption className="figure-caption">{image.credit}</figcaption> : null}
      </figure>
    )
  }
  else return (<img src={plantDefaultImage} alt={name} className="card-img-top" />)
}

export default PlantImage


  // <img src = "https://inaturalist-open-data.s3.amazonaws.com/photos/54603831/large.jpeg" alt = "Abies fraseri" class="img-fluid" sizes = "(max-width: 550px) 40vw, 50vw" >