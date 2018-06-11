import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class AvatarCard extends PureComponent {

  static propTypes = {
    voteScore: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired
  };

  chooseBackgroundColor = voteScore => {
    if (voteScore > 0) {
      return "#dcffd1";
    } else if (voteScore < 0) {
      return "#ffdbd2";
    } else {
      return "#e2e2e2";
    }
  };

  render () {

    const { voteScore, opacity } = this.props;

    const backgroundColor = this.chooseBackgroundColor(voteScore);

    return (
      <Avatar style={
        {
          backgroundColor,
          color: voteScore > 0 ? "#1c8000" : "#830800",
          opacity
        }
      }>
        {voteScore}
      </Avatar>
    );
  }
}

export default AvatarCard;