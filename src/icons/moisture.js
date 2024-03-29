import React from 'react'
export function moistureIcon(item, index) {
  const itemName = item.toLowerCase().replace(" ","-")
  return(
    <svg key={index} className={"icon-moistureNeeds icon-" + itemName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.18 160.56">
      <title>{"needs " + itemName + " soil"}</title>
      <g className="dropsSmall">
        <path className="dropWater" d="M18.19,16.59S3.79,37.09,3.79,45.05a14.4,14.4,0,1,0,28.8,0C32.59,37.09,18.19,16.59,18.19,16.59ZM18,53.65a9,9,0,0,1-9-9,1.5,1.5,0,0,1,3,0,6,6,0,0,0,6,6,1.5,1.5,0,1,1,0,3Z" transform="translate(-2.52 -0.99)"/>
        <path className="dropWater" d="M58.68,15.28s-21,29.86-21,41.45a21,21,0,0,0,42,0C79.66,45.14,58.68,15.28,58.68,15.28ZM57,69.85A12.27,12.27,0,0,1,44.73,57.59a1.32,1.32,0,0,1,2.63,0A9.64,9.64,0,0,0,57,67.22a1.32,1.32,0,0,1,0,2.63Z" transform="translate(-2.52 -0.99)"/>
        <path className="dropWater" d="M102.43,36.15S91.2,52.14,91.2,58.34a11.24,11.24,0,1,0,22.47,0C113.67,52.14,102.43,36.15,102.43,36.15Zm-.9,30a7.36,7.36,0,0,1-7.36-7.35,1.5,1.5,0,0,1,3,0,4.36,4.36,0,0,0,4.36,4.35,1.5,1.5,0,0,1,0,3Z" transform="translate(-2.52 -0.99)"/>
        <path className="dropWater" d="M86,2.44S73.55,20.21,73.55,27.1a12.48,12.48,0,0,0,25,0C98.51,20.21,86,2.44,86,2.44ZM85,35.62a8,8,0,0,1-8-8,1.5,1.5,0,0,1,3,0,5,5,0,0,0,5,5,1.5,1.5,0,0,1,0,3Z" transform="translate(-2.52 -0.99)"/>
        <path className="dropWater" d="M38.43,1.1s-9.7,13.81-9.7,19.17a9.7,9.7,0,0,0,19.4,0C48.13,14.91,38.43,1.1,38.43,1.1Zm-.78,25.31a5.75,5.75,0,0,1-5.74-5.74,1,1,0,1,1,2,0,3.75,3.75,0,0,0,3.74,3.74,1,1,0,0,1,0,2Z" transform="translate(-2.52 -0.99)"/>
        <path className="dropWater" d="M105.58,1S98.41,11.2,98.41,15.16a7.17,7.17,0,0,0,14.34,0C112.75,11.2,105.58,1,105.58,1Zm-.7,18.3a3.87,3.87,0,0,1-3.9-3.84,1,1,0,0,1,2,0,1.87,1.87,0,0,0,1.9,1.84,1,1,0,0,1,0,2Z" transform="translate(-2.52 -0.99)"/>
      </g>
      <path className="dropMain" d="M59.14,13.65S10.46,83,10.46,109.85a48.69,48.69,0,0,0,97.37,0C107.83,83,59.14,13.65,59.14,13.65ZM56.22,145a34.17,34.17,0,0,1-34.13-34.13,4.5,4.5,0,0,1,9,0A25.16,25.16,0,0,0,56.22,136a4.5,4.5,0,0,1,0,9Z" transform="translate(-2.52 -0.99)"/>
      <g className="aquaticLines">
        <path className="aquaticLine" d="M59.38,112.44a38.11,38.11,0,0,1-14.14-2.73l-4.54-1.8a16.38,16.38,0,0,0-12.38,0l-4.27,1.7a38.34,38.34,0,0,1-11.31,2.64,9.5,9.5,0,1,1-1.43-19A19.38,19.38,0,0,0,17,92l4.26-1.71a35.64,35.64,0,0,1,26.46,0l4.54,1.81a18.82,18.82,0,0,0,14.22,0L71,90.27a35.58,35.58,0,0,1,26.49,0L101.75,92a19.23,19.23,0,0,0,5.39,1.31,9.5,9.5,0,0,1-1.75,18.92,38.65,38.65,0,0,1-10.69-2.58l-4.29-1.72a16.5,16.5,0,0,0-12.39,0l-4.48,1.79A38.06,38.06,0,0,1,59.38,112.44Z" transform="translate(-2.52 -0.99)" />
        <path className="aquaticLine" d="M59.38,137a38.09,38.09,0,0,1-14.14-2.72l-4.54-1.81a16.42,16.42,0,0,0-12.38,0l-4.27,1.7a38.32,38.32,0,0,1-11.31,2.63,9.5,9.5,0,1,1-1.43-18.94,19.39,19.39,0,0,0,5.7-1.34l4.26-1.7a35.6,35.6,0,0,1,26.46,0l4.54,1.81a18.86,18.86,0,0,0,14.22,0L71,114.83a35.62,35.62,0,0,1,26.49,0l4.29,1.72a19.56,19.56,0,0,0,5.39,1.3,9.5,9.5,0,0,1-1.75,18.92,38,38,0,0,1-10.69-2.58l-4.29-1.71a16.4,16.4,0,0,0-12.39,0l-4.48,1.79A38.25,38.25,0,0,1,59.38,137Z" transform="translate(-2.52 -0.99)" />
        <path className="aquaticLine" d="M59.38,161.55a38.3,38.3,0,0,1-14.14-2.72L40.7,157a16.42,16.42,0,0,0-12.38,0l-4.27,1.71a38.32,38.32,0,0,1-11.31,2.63,9.5,9.5,0,0,1-1.43-19,19.07,19.07,0,0,0,5.7-1.33l4.26-1.7a35.55,35.55,0,0,1,26.46,0l4.54,1.81a18.86,18.86,0,0,0,14.22,0L71,139.38a35.58,35.58,0,0,1,26.49,0l4.29,1.72a19.56,19.56,0,0,0,5.39,1.3,9.5,9.5,0,0,1-1.75,18.92,38.65,38.65,0,0,1-10.69-2.58L90.41,157A16.4,16.4,0,0,0,78,157l-4.48,1.79A38.25,38.25,0,0,1,59.38,161.55Z" transform="translate(-2.52 -0.99)" />
        <path className="aquaticLine" d="M59.38,87.88a38.3,38.3,0,0,1-14.14-2.72L40.7,83.35a16.47,16.47,0,0,0-12.38,0l-4.27,1.71a38.32,38.32,0,0,1-11.31,2.63,9.5,9.5,0,1,1-1.43-19A19.07,19.07,0,0,0,17,67.41l4.26-1.7a35.55,35.55,0,0,1,26.46,0l4.54,1.81a18.86,18.86,0,0,0,14.22,0L71,65.71a35.58,35.58,0,0,1,26.49,0l4.29,1.72a19.56,19.56,0,0,0,5.39,1.3,9.5,9.5,0,0,1-1.75,18.92A38.3,38.3,0,0,1,94.7,85.07l-4.29-1.71a16.4,16.4,0,0,0-12.39,0l-4.48,1.79A38.25,38.25,0,0,1,59.38,87.88Z" transform="translate(-2.52 -0.99)" />
      </g>
    </svg>
  )
}
