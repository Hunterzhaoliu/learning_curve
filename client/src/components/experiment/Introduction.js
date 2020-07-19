import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import introductionAudio from "../../audio/bell.mp3";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";
import hand from "../../images/hand.png";
import "./introduction.css";
import "./trial.css";

import {
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH,
  EGG_PLATFORM_HEIGHT,
  EGG_HEIGHT
} from "./constants";

class Introduction extends Component {
  constructor() {
    super();
    this.state = {
      eggAnimation: "none",
      eggAndPlatformAnimation: "none"
    };
  }

  componentDidMount() {
    setTimeout(function() {
      document.getElementById("introductionAudio").play();
    }, 1000);

    // highlight the two tree choices
    setTimeout(function() {
      // display and highlight left tree
      document.getElementById("divLeftTree").style.display = "block";
      document.getElementById("divLeftTree").style.border = "5px solid #639a3b";
    }, 2000);

    setTimeout(function() {
      // unhighlight the left tree
      document.getElementById("divLeftTree").style.border = "none";

      // display and highlight right tree
      document.getElementById("divRightTree").style.display = "block";
      document.getElementById("divRightTree").style.border =
        "5px solid #639a3b";

      // unhighlight the last tree
      setTimeout(function() {
        document.getElementById("divRightTree").style.border = "none";
      }, 1000);
    }, 4000);

    // going to start with right tree
    setTimeout(function() {
      // display and highlight right tree
      document.getElementById("divRightTree").style.display = "block";
      document.getElementById("divRightTree").style.border =
        "5px solid #639a3b";

      // unhighlight right tree
      setTimeout(function() {
        document.getElementById("divRightTree").style.border = "none";
      }, 1000);
    }, 7000);

    // show egg falling off platform
    setTimeout(() => {
      this.setState({
        eggAnimation: "fall 2.0s ease-in 1 backwards"
      });
    }, 9000);

    // make the egg and platform go up
    setTimeout(() => {
      document.getElementById("hand").style.display = "block";
      this.setState({
        eggAnimation: "shake 0.5s infinite",
        eggAndPlatformAnimation: "rise 1s forwards"
      });
      setTimeout(() => {
        this.props.completedTrial();
      }, 1500);
    }, 12000);
  }

  render() {
    const eggAndPlatformTop =
      "calc(" +
      String(SCREEN_TO_LADDER_BOTTOM_PERCENT) +
      "% - " +
      String(EGG_PLATFORM_HEIGHT + EGG_HEIGHT) +
      "px)";
    const eggAndPlatformLeft =
      "calc(50% - " + String(EGG_PLATFORM_WIDTH / 2) + "px)";

    document.documentElement.style.setProperty(
      "--egg-and-platform-start-height",
      String(SCREEN_TO_LADDER_BOTTOM_PERCENT - 100) + "vh"
    );

    const handHeight = "100px";
    // subtract pixels from left edge of hand to index finger
    const handLeft = "calc(50% - 20px)";
    const handTop = EGG_HEIGHT / 2;

    return (
      <div>
        <audio id="introductionAudio">
          <source src={introductionAudio} type="audio/mpeg" />
        </audio>
        <div id="divLeftTree" className="tree-highlight left-tree" />
        <div id="divRightTree" className="tree-highlight right-tree" />
        <div
          className="div-egg-and-platform"
          style={{
            top: eggAndPlatformTop,
            left: eggAndPlatformLeft,
            width: EGG_PLATFORM_WIDTH,
            animation: this.state.eggAndPlatformAnimation
          }}
        >
          <img
            style={{
              position: "relative",
              height: EGG_HEIGHT,
              animation: this.state.eggAnimation
            }}
            className="img-egg"
            id="egg"
            src={egg}
            alt=""
          />
          <img
            style={{
              top: 0,
              width: EGG_PLATFORM_WIDTH,
              height: EGG_PLATFORM_HEIGHT
            }}
            className="img-introduction-egg-platform"
            src={egg_platform}
            alt=""
          />
          <img
            style={{
              height: handHeight,
              left: handLeft,
              top: handTop,
              display: "none"
            }}
            className="img-hand"
            src={hand}
            id="hand"
            alt=""
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    completedTrial: () => {
      experimentDispatchers.completedTrial();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Introduction);
