import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import InfoIcon from '@material-ui/icons/InfoOutline'
import PropTypes from 'prop-types'

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

const style = {
  slide: {
    display: 'grid',
    alignItems: 'center',
    margin: '2% 0% 0% 2%'
  }
}

class AdditionalActions extends PureComponent {

  static propTypes = {
    showing: PropTypes.bool.isRequired,
    isComment: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  render () {

    const {showing, isComment, id, onDelete, category} = this.props

    return (
      <Slide direction="left" in={showing} style={style.slide}>
        <div>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
          {/*https://material-ui.com/demos/dialogs/ TO DELETE POST*/}
          {!isComment &&
          <Link to={`/${category}/${id}`}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Link>
          }
        </div>
      </Slide>
    )
  }
}

export default AdditionalActions