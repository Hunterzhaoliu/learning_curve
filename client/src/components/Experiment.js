import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../actions/experiment";
// import { bindActionCreators } from "redux";
import "./experiment.css";
import background from "../images/background.png";
import egg_platform from "../images/egg_platform.png";
import egg from "../images/egg.png";

class Experiment extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0,
      platformHeight: 0,
      eggAnimation: "none",
      eggFalling: false
    };
  }

  onChange = e => {
    if (this.state.eggAnimation === "none") {
      this.setState({ eggAnimation: "shake 0.5s infinite" });
    }
    this.setState({ eggHeight: e.target.value });
    this.setState({ platformHeight: e.target.value });
  };

  onChangeEnd = () => {
    this.setState({ eggAnimation: "none" });
  };

  componentDidUpdate(_) {
    const eggFallPercentage = 80;
    if (
      this.state.eggAnimation !== "fall 2.0s ease-in 1" &&
      this.state.eggFalling
    ) {
      this.setState({ eggAnimation: "fall 2.0s ease-in 1" });
      console.log("trial completed");
      // this.props.trialCompleted()
    } else if (
      !this.state.eggFalling &&
      this.state.eggHeight > eggFallPercentage
    ) {
      // egg needs to fall
      this.setState({ eggFalling: true });
    }
  }

  render() {
    const { windowWidth, windowHeight } = this.props;

    const ladderHeight = 0.72 * windowHeight;

    const eggPlatformWidth = 150;
    const eggPlatformHeight = 20;

    document.documentElement.style.setProperty(
      "--ladder-height",
      String(ladderHeight) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-width",
      String(eggPlatformWidth) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-height",
      String(eggPlatformHeight) + "px"
    );

    const sliderLeft = (windowWidth - eggPlatformWidth) / 2;

    const platformTop =
      (1 - this.state.eggHeight * 0.01) * ladderHeight - eggPlatformHeight / 2;

    const eggHeight = 75;
    const eggWidth = 57;
    const eggTop = platformTop - eggHeight;
    const eggLeft = (eggPlatformWidth - eggWidth) / 2;

    return (
      <div>
        <img className="img-background" src={background} alt="" />
        <div style={{ left: sliderLeft }} className="slider-container">
          <input
            onChange={this.onChange}
            type="range"
            min="1"
            max="100"
            value={this.state.eggHeight}
            className="slider"
            id="eggHeight"
            onMouseUp={this.onChangeEnd}
            onTouchEnd={this.onChangeEnd}
            disabled={this.state.eggFalling}
          />
          <img
            style={{ top: platformTop }}
            className="img-egg-platform"
            src={egg_platform}
            alt=""
          />
          <img
            style={{
              height: String(eggHeight) + "px",
              top: eggTop,
              left: eggLeft,
              animation: this.state.eggAnimation
            }}
            className="img-egg"
            src={egg}
            alt=""
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    windowHeight: state.initialize.windowHeight
  };
}
//
// function mapDispatchToProps(dispatch) {
//   const experimentDispatchers = bindActionCreators(
//     experimentActionCreators,
//     dispatch
//   );
//
//   return {
//     checkCode: userCode => {
//       experimentDispatchers.checkCode(userCode);
//     }
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Experiment);

export default connect(
  mapStateToProps,
  null
)(Experiment);
