import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class IconAction extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    hoverColor: PropTypes.string.isRequired,
    regularColor: PropTypes.string.isRequired,
    buttonCallback: PropTypes.func
  };

  state = {
    isHovered: false
  };

  render () {

    const { title, icon, hoverColor, regularColor, buttonCallback } = this.props;
    const { isHovered } = this.state;

    const iconButton = buttonCallback === undefined ?
      <IconButton
        style={{ color: isHovered ? `${hoverColor}` : `${regularColor}` }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}>
        {icon}
      </IconButton>
      :
      <IconButton
        style={{ color: isHovered ? `${hoverColor}` : `${regularColor}` }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        onClick={() => buttonCallback()}>
        {icon}
      </IconButton>;

    return (
      <Tooltip
        title={title}
        placement='right'
        enterDelay={100}
        leaveDelay={100}>
        {iconButton}
      </Tooltip>
    );
  }

}

export default IconAction;