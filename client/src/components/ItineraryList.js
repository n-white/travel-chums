import React from 'react';
import { ItineraryListEntryView } from './ItineraryListEntryView';
import { HomeNav } from './Nav';


var footer = {
  'position': 'absolute',
  'height': '100px',
  'right': '0',
  'bottom': '0',
  'left': '0',
  'padding': '1rem',
  'background-color': '#5d5d5d',
  'text-align': 'center'
}

var newItinerary = {
	'color': 'white',
	'font': '2em "Open Sans", sans-serif',
	'position': 'relative',
	'top': '15px'
}



export const ItineraryList = (props) => (
	<div>
    <HomeNav/>
		<div>
		{props.route.itineraryList.map((itinerary) => (
			<ItineraryListEntryView itinerary={ itinerary } />
		))}
		</div>
		<div style={footer} >
			<div style={newItinerary} >+ add new itinerary</div>
		</div>
	</div>
)