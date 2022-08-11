import React from 'react'
import colorsArr from '../data/colors.json';

export function berryIcon(color, index) {
  const itemName = color.toLowerCase().replace(" ","-")
  return(
    <svg key={index} style={{ fill: colorsArr[color] }} className={"icon-berry icon-" + itemName} xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 139.09 131">
      <title>{itemName + " fruits"}</title>
      <path d="M60.47,91.79c13.34-14.59,29.13-37.36,30.98-64.71h0c3.53-2.71,7.5-5.12,11.82-6.64,2.18-.77,3.32-3.17,2.54-5.34-.77-2.18-3.16-3.32-5.34-2.54-6.97,2.47-13.09,6.72-18.08,11.16-15.45-3-34.5,5.51-46.42,23.1-28.88,42.58-13.09,68.6-9,72.13,7-3.41,20.47-12.89,33.5-27.15Z" />
      <path d="M96.16,30.56c-4.65,43.14-42.34,78.25-62.38,90.3,11.52,1.44,36.31-.83,60.78-31.88,15.68-19.9,15.33-45.8,1.6-58.42Z" />
      </svg>
  )
}
