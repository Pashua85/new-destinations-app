import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withGoogleMap, 
  GoogleMap, 
  Marker, 
  Polyline, 
  InfoWindow
} from 'react-google-maps';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoBox: false,
      selectPoint: null    
    };
  };

  componentDidUpdate() {
    if(this.props.points.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      this.props.points.map((point, i) => {
        bounds.extend(new window.google.maps.LatLng(
          point.latLng.lat,
          point.latLng.lng
        ));
      });
      this.map.fitBounds(bounds);
    };
  }

  resetState = () => {
    this.setState({ 
      showInfoBox: false,
      selectPoint: null
    });    
  }

  handleClickedMarker = (point) => () => {
    this.setState(() => ({
      selectPoint: point,
      showInfoBox: true
    }));
  };

  onStartChangePosition = ()  => {
    this.setState(() => ({
      showInfoBox: false
    }))
  };

  handleCenterChanged = () => {
    const currentCenter = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    };
    this.props.onCenterChanged(currentCenter);
  };

  handleCloseInfoBox = () => {
    this.setState({ 
      selectPoint: null,
      showInfoBox: false
    });
  };

  render() {   
    var center;
    this.props.points.length ?
    center = this.props.points[0].latLng :
    center = {
      lat: 55.751244,
      lng: 37.618423
    };


    return (
      <GoogleMap
        ref={ref => { this.map = ref;}}
        defaultZoom={14}  
        defaultCenter={center}
        onIdle={this.handleCenterChanged}
      > 
        { this.props.points &&
        <Polyline
          path={this.props.pathCoords}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1.0
          }}
        /> 
        }
        {
          this.props.points &&
          this.props.points.map((point, index) => {
            return (
              <Marker 
                key={point.pointId}
                position={point.latLng} 
                draggable={true}
                onDragStart={this.onStartChangePosition}
                onDragEnd={(event) => this.props.onChangePosition(point.pointId, event.latLng)}
                onClick={this.handleClickedMarker(point)}
              />
            )
          }) 
        }
        { 
          this.state.showInfoBox && <InfoWindow
            key={Math.random()}
            onCloseClick={this.handleCloseInfoBox}
            position={this.state.selectPoint.latLng}
          >
            <p>{this.state.selectPoint.pointName}</p>
          </InfoWindow>  
        } 
      </GoogleMap>
    )
  }
};

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ 
                        height: `400px`,
                        border: `1px solid green`,
                        width: `66%`
                      }} />,
    mapElement: <div style={{ height: `100%` }} />,
    className: 'map-component'
  }),
  withGoogleMap
)(Map);

export default MyMapComponent;