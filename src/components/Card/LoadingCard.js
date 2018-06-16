import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/es/CardContent";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/es/Typography";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class LoadingCard extends PureComponent {

  static propTypes = {
    content: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    cardStyle: PropTypes.object.isRequired
  };

  render () {

    const { content, backgroundColor, cardStyle } = this.props;

    return (
      <Card
        raised={true}
        style={{ ...cardStyle, backgroundColor }}>

        <CardContent>
          <Typography variant='subheading'>
            {content}
          </Typography>
          <CircularProgress />
        </CardContent>

      </Card>
    );
  }
}

export default LoadingCard;