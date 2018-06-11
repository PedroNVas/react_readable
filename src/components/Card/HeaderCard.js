import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class HeaderCard extends PureComponent {

  static propTypes = {
    avatar: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    subHeader: PropTypes.object.isRequired
  };

  render () {

    const { avatar, action, title, subHeader } = this.props;

    return (
      <CardHeader
        avatar={avatar}
        action={action}
        title={title}
        subheader={subHeader}
      />
    );
  }
}

export default HeaderCard;