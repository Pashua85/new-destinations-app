import React from 'react';
import uuidv1 from 'uuid/v1';

import Header from './Header';
import MapComponent from './MapComponent';
import AddPoint from './AddPoint';
import PointList from './PointList';
import ErrorMessage from './ErrorMessage';

class App extends React.Component {
  state = {
    points: [],
    pathCoords: [],
    currentCenter: {
      lat: 55.751244,
      lng: 37.618423
    },
    errorMessage: ''  
  };

  setCurrentCenter = (currentCenter) => {
    this.setState({ currentCenter });
    console.log(this.state.currentCenter);
  };

  isUniquePlace = (newPoint) => {
    if(this.state.points.length > 0) {
      const repeatingPoints = this.state.points.filter(point => {
        return point.latLng.lat === newPoint.latLng.lat 
          && point.latLng.lng === newPoint.latLng.lng;
      });
      return repeatingPoints.length === 0;
    }
    return true;
  }; 

  addPoint = (pointName) => {
    const newPoint = {
      pointName: pointName,
      pointId: uuidv1(),
      latLng: this.state.currentCenter
    };
    if (this.isUniquePlace(newPoint)) {
      this.setState((prevState) => (
        {
          points: prevState.points.concat(newPoint),
          errorMessage: ''
        }
      ));
      this.setPathCoords();
    } else {
      this.handleError('There is a point on this place already')
    }
  };

  handleError = (errorMessage) => {
    this.setState({ errorMessage });
  };

  reorderPoints = (points) => {
    this.setState(() => ({ points }));
    this.setPathCoords();
  };

  deletePoint = (pointId) => {
    this.setState(prevState => ({
      points: prevState.points.filter(point => point.pointId !== pointId)
    }));
    this.setPathCoords();
  };

  setPathCoords = () => {
    this.setState((prevState) => ({
      pathCoords: prevState.points.map(point => point.latLng)
    }));
  };

  onChangePosition = (pointId, newLatLng) => {
    const pointsCopy = this.state.points.slice();
    const newPoints = this.state.points.map( point => {
      if (point.pointId === pointId) {
        point.latLng = newLatLng;
        return point;
      } else {
        return point;
      }
    });
    this.setState(() => ({
      points: newPoints
    }));
    this.setPathCoords();
  };

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="main-container container">
          <div className="widget">
            <AddPoint 
              handleAddPoint={this.addPoint}
              handleError={this.handleError}
            />
            <ErrorMessage errorMessage={this.state.errorMessage} />
            <PointList
              handleReorder={this.reorderPoints} 
              points={this.state.points}
              deletePoint={this.deletePoint}  
            /> 
          </div>
          <MapComponent
            isMarkerShown points={this.state.points} 
            onChangePosition={this.onChangePosition}
            pathCoords={this.state.pathCoords}
            onCenterChanged={this.setCurrentCenter}
          />
        </div>
      </div>
    )
  }
};

export default App;