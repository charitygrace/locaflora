import React from 'react'
export function sunIcon(item, index) {
  const itemName = item.toLowerCase().replace(" ","-")
  return(
    <svg key={index} className={"icon-light icon-" + itemName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.47 131.47">
      <title>{"needs " + itemName}</title>
      <path className="sun-outer" d="M65.6,7l10.09,14.7a13.84,13.84,0,0,0,13.93,5.77l17.52-3.26-3.26,17.52a13.83,13.83,0,0,0,5.77,13.93l14.69,10.08L109.65,75.82a13.82,13.82,0,0,0-5.77,13.93l3.26,17.52L89.62,104a13.82,13.82,0,0,0-13.93,5.77L65.6,124.48l-10.08-14.7A13.83,13.83,0,0,0,41.59,104l-17.53,3.26,3.26-17.52a13.82,13.82,0,0,0-5.77-13.93L6.86,65.73,21.55,55.65a13.83,13.83,0,0,0,5.77-13.93L24.06,24.2l17.53,3.26a13.85,13.85,0,0,0,13.93-5.77Z"/>
      <circle className="sun-inner" cx="65.6" cy="65.6" r="26.29"/>
    </svg>
  )
}
