
function init() {
  // console.log(__filename)
  const IconSizeModifier = 0.6
  const d = new Date(2019,11,31);
  const mymap = L.map('map').setView([33.74927910652475, -84.38883081429442], 12);

  L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{id}/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmV3c2FwcHNhamMiLCJhIjoiM0pwTWxXRSJ9.JhYadcrZzpnUf-gX_PItAQ', {
      attribution: 'Map by <a href="https://www.ajc.com/staff/Eric-Fan/">Eric Fan / AJC</a>, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      username: 'newsappsajc',
      id: 'ckrwfts9y161517o10u6e5a0z'
      // tileSize: 512,
      // zoomOffset: -1
  }).addTo(mymap);

  $.getJSON("./data/apd_homicides.json", function(homicides){

    homicides.forEach(item => {
      let date = Date.parse(item.OCCURRED);
      console.log(d)
      console.log(date)
      if (date > d) {
        const redIcon = new L.Icon({
          iconUrl: './img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25*IconSizeModifier, 41*IconSizeModifier] ,
          iconAnchor: [12*IconSizeModifier, 41*IconSizeModifier],
          popupAnchor: [1*IconSizeModifier, -34*IconSizeModifier],
          shadowSize: [41*IconSizeModifier, 41*IconSizeModifier]
        });
        const marker = L.marker([item.Latitude, item.Longitude], {icon: redIcon}).addTo(mymap);
        marker.bindPopup(`
        Victim: ${item["VICTIM FIRST NAME"]} ${item["VICTIM LAST NAME"]}
        <br>
        Date: ${item["OCCURRED"]} 
        <br>
        Race: ${getRace(item["VICTIM RACE"])}
        <br>
        Age: ${item["Vic Age"]} 
        `);
      }
    })
  })

  // neighborhoods
  let layer_neighborhoods = null;
  $.getJSON("./data/neighborhoods.geojson", function(neighborhoods){
    layer_neighborhoods = L.geoJson(neighborhoods, {
      style: layer_neighborhoods_style,
      onEachFeature: onEachFeature
    }).addTo(mymap);

    function onEachFeature(feature, layer) {
      layer.bindPopup(`Neighborhood: ${feature.properties.NAME}`);
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight  
      });
    }

    function highlightFeature(e) {
      let layer = e.target;
  
      layer.setStyle({
          weight: 1,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
  
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      layer_neighborhoods.resetStyle(e.target);
    }

    function layer_neighborhoods_style(feature) {
      return {
          fillColor: "#8dd3c7",
          weight: 1,
          opacity: 1,
          color: 'grey',
          dashArray: '3',
          fillOpacity: 0.2
      };
    }

    // police beats
    let layer_beats = null;
    $.getJSON("./data/apd_beat_2011_region.json", function(beats){
      layer_beats = L.geoJson(beats, {
        style: layer_beats_style,
        onEachFeature: onEachFeature
      })

      function onEachFeature(feature, layer) {
        layer.bindPopup(`Police Beat: ${feature.properties.BEAT}`);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight  
        });
      }

      function highlightFeature(e) {
        let layer = e.target;
    
        layer.setStyle({
            weight: 1,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.5
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
      }

      function resetHighlight(e) {
        layer_beats.resetStyle(e.target);
      }

      function layer_beats_style(feature) {
        return {
            fillColor: "#80b1d3",
            weight: 1,
            opacity: 1,
            color: 'grey',
            dashArray: '3',
            fillOpacity: 0.2
        };
      }
      // const baseMaps = {
      //   "Grayscale": grayscale,
      //   "Streets": streets
      // };
      const overlayMaps = {
        "Neighborhoods": layer_neighborhoods,
        "Police Beats": layer_beats
      };
    
      L.control.layers(overlayMaps, null, {collapsed:false}).addTo(mymap);
    });
  });
}

function getRace(race) {
  return race == 'B' ? 'Black' :
  race == 'W' ? 'White' :
  race == 'H' ? 'Hispanic' :
  race == 'A' ? 'Asian' :
  race;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

init();