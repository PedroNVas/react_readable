import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
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

class Actions extends PureComponent {

  static propTypes = {
    isComment: PropTypes.bool.isRequired,
    isDetails: PropTypes.bool.isRequired,
    showing: PropTypes.bool.isRequired,
    category: PropTypes.string,
    id: PropTypes.string,
    deleteCallback: PropTypes.func.isRequired,
    editCallback: PropTypes.func.isRequired
  }

  state = {
    showDeleteConfirmation: false,
    isFavoriteHovered: false,
    isDeleteHovered: false,
    isInfoHovered: false,
    isEditHovered: false,
  }

  render () {

    const {showing, isComment, id, deleteCallback, category, isDetails} = this.props

    const {
      isFavoriteHovered, isDeleteHovered, isInfoHovered,
      isEditHovered, showDeleteConfirmation
    } = this.state

    const deleteConfirmation = (
      <Slide direction="left" in={showDeleteConfirmation} mountOnEnter unmountOnExit>
        <div style={{display: 'block'}}>
          <p>Are you sure you want to delete the {isComment ? 'comment' : 'post'}?</p>
          <IconButton onClick={() => this.setState({showDeleteConfirmation: false})}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={() => deleteCallback()}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Slide>
    )

    return (
      <Slide direction="left" in={showing} style={style.slide} mountOnEnter unmountOnExit>
        {showDeleteConfirmation ? deleteConfirmation :
          <div>
            {!isComment &&
            <Tooltip title='Favorite' placement='right'>
              <IconButton
                style={{color: isFavoriteHovered ? '#ff0006' : '#757575'}}
                onMouseEnter={() => this.setState({isFavoriteHovered: true})}
                onMouseLeave={() => this.setState({isFavoriteHovered: false})}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            }
            <Tooltip title='Edit' placement='right'>
              <IconButton
                style={{color: isEditHovered ? '#00910d' : '#757575'}}
                onMouseEnter={() => this.setState({isEditHovered: true})}
                onMouseLeave={() => this.setState({isEditHovered: false})}
                onClick={() => this.props.editCallback()}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            {!isComment && !isDetails &&
            <Link to={`/${category}/${id}`}>
              <Tooltip title='Post details' placement='right'>
                <IconButton
                  style={{color: isInfoHovered ? '#0010ff' : '#757575'}}
                  onMouseEnter={() => this.setState({isInfoHovered: true})}
                  onMouseLeave={() => this.setState({isInfoHovered: false})}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Link>
            }
            <Tooltip title='Delete' placement='right'>
              <IconButton
                style={{color: isDeleteHovered ? '#000000' : '#757575'}}
                onMouseEnter={() => this.setState({isDeleteHovered: true})}
                onMouseLeave={() => this.setState({isDeleteHovered: false})}
                onClick={() => this.setState({showDeleteConfirmation: true})}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        }
      </Slide>
    )
  }
}

export default Actions