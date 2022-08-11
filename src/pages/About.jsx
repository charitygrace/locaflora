import React from 'react'

const About = () => (
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-8 col-xl-6 mb-4">
      <h1>About</h1>
      <p>Hi. I created this website because I want to support native plant use and wanted a project in which I could learn the javascript framework React.</p>
      <p>This is a work in progress. If you want to help either with the information or improving the site somehow, please <a href="/contact">let me know</a>.</p>
      <p>If you want to create a similar website for your state, <a href="/contact">let me know too</a>. I'll need a plant list of scientifc names and it would be nice to have some plant details (e.g. height and type), but that's not required.</p>
      <h2>Sources and data processing</h2>
      <p>The North Carolina native plant list comes from the website <a href="https://auth1.dpr.ncparks.gov/flora/plant_list.php" target="_blank">Vascular Plants of North Carolina</a> (3000+ native plants) as well as the <a href="https://plants.ncwildflower.org/plant_galleries/all_fields_search" target="_blank">North Carolina Native Plant Society</a> (800+ plants).</p>
      <p>I used the scientific names to gather information from various APIs: the <a href="https://plants.usda.gov/" target="_blank">USDA</a> via the Trefle Plant API (now defunct) as well as <a href="https://www.inaturalist.org/" target="_blank">iNaturalist</a> and <a href="https://explorer.natureserve.org/">NatureServe</a>.</p>
      <p>I also make reference to external websites where I was able to easily collect or determine the plant page's link.</p>
      <h2>Data</h2>
      <p>Images are from iNaturalist and under a Creative Commons license.</p>
      <p>The detailed data available for some of the plants either comes from the USDA or the North Carolina Native Plant Society.</p>
      <p>I've tried my best to provide accurate data as I process it, but because scientific names of plants change over time, there are likely duplicates as well as some problems.</p>
      <p>Additionally, I've noted plant details (e.g. height) can be wrong or based on data from other areas of the country.</p>
      <p>If you want this data, <a href="/contact">contact me</a> and I can provide it as json or a csv.</p>
    </div>
  </div>
);

export default About;
