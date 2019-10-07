import React from 'react';
import './Patch.css';
import PatchRow from "../PatchRow/PatchRow";
import pumpkinRows from '../pumpkinRows.js';

const ROW_HEIGHT = 130;
class Patch extends React.Component {
  state = {
    numberOfRowsToDisplay: Math.floor((window.innerHeight - 150) / ROW_HEIGHT),
    carouselUp: false,
    carouselDown: true,
    carouselDistance: 0,
  };

  /**
   * Add event listener for window resize and carousel
   */
  componentDidMount() {
    this.updateDimensions();
    this.onWindowResizing = this.updateDimensions.bind(this);
    window.addEventListener('resize', this.onWindowResizing);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  /**
   * Remove event listener for window resize
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResizing);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  updateDimensions() {
    const numberOfRowsToDisplay = Math.floor((window.innerHeight - 100) / ROW_HEIGHT);

    this.setState(prevState => {
      let {carouselDown} = prevState;
      if (prevState.numberOfRowsToDisplay < numberOfRowsToDisplay) {
        carouselDown = (pumpkinRows.length + 1) >
          (prevState.carouselDistance + numberOfRowsToDisplay);
      }

      return {
        numberOfRowsToDisplay,
        carouselDown
      };
    });
  }

  keyUpHandler = evt => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      evt.stopPropagation();
      if ((this.state.carouselDistance + this.state.numberOfRowsToDisplay) <=
        (pumpkinRows.length)) {
        this.handleCarouselDown();
      }
    } else if (evt.key === 'ArrowUp' && this.state.carouselDistance) {
      evt.preventDefault();
      evt.stopPropagation();
      if (this.state.carouselDistance) {
        this.handleCarouselUp();
      }
    }
  };

  handleCarouselDown = () => {
    if ((this.state.carouselDistance + this.state.numberOfRowsToDisplay) < (pumpkinRows.length + 1)) {
      this.setState(prevState => {
        return {
          carouselUp: true,
          carouselDown: (prevState.carouselDistance + prevState.numberOfRowsToDisplay) !==
            (pumpkinRows.length),
          carouselDistance: prevState.carouselDistance + 1
        };
      });
      return;
    }

    this.setState({
      carouselDown: false
    });
  };

  handleCarouselUp = () => {
    if (this.state.carouselDistance) {
      this.setState(prevState => {
        return {
          carouselUp: prevState.carouselDistance > 1,
          carouselDown: true,
          carouselDistance: prevState.carouselDistance - 1
        };
      });
      return;
    }

    this.setState({
      carouselUp: false,
      carouselDown: true
    });
  };

  render() {
    const {carouselDistance, numberOfRowsToDisplay, carouselDown, carouselUp} = this.state;
    const PatchRows = pumpkinRows.slice(carouselDistance, numberOfRowsToDisplay + carouselDistance)
      .map((row, index) => <PatchRow key={index} pumpkins={row}/>);
    return (
      <div className="patch">
        {carouselUp && <div className="carousel-arrow up"/>}
        {PatchRows}
        {carouselDown && <div className="carousel-arrow down"/>}
      </div>
    );
  }
}

export default Patch;
