import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'

const transformIdToTitle = id => id.replace(/([A-Z])/g, ' $1')

const Action = props => {

  const { id, image, to, icon, color, smallMode, small, disabled, onClick } = props

  if (image) {
    const imageStyle = {
      borderRadius: '50%',
      width: 32,
      height: 32,
      marginTop: 4,
      marginRight: 2,
      marginLeft: 2
    }
    return <img alt={id} src={image} style={imageStyle} />
  }

  const Icon = icon

  const iconButtonStyle = {
    color,
    cursor: onClick || to ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1
  }

  const buttonStyle = {
    color,
    marginRight:2,
    marginLeft:2,
    padding:8,
    opacity: disabled ? 0.5 : 1
  }

  const iconStyle = {
    width:20,
    height:20,
    marginRight:4
  }

  const isSmall = small || smallMode
  const buttonProps = {
    disabled,
    onClick,
    style: isSmall ? iconButtonStyle : buttonStyle
  }

  if (isSmall) {
    return (
      <IconButton {...buttonProps}>
        <Icon aria-label={id} />
      </IconButton>
    )
  }

  return (
    <Button {...buttonProps}>
      <Icon style={iconStyle} aria-label={id} />
      {transformIdToTitle(id)}
    </Button>
  )
}

const Operation = props => {
  const { hidden, to, disabled, description, descriptionWhenDisabled, small, smallMode } = props
  const showDescription = 
    description && ((disabled && descriptionWhenDisabled) || (small || smallMode))

  if (hidden) {
    return <div hidden></div>
  }

  if (to) {
    return (
      <Link to={to}>
        <Action {...props} />
      </Link> 
    )
  }

  if (showDescription) {
    return (
      <Tooltip
        title={description}
        placement="left"
        disableTriggerTouch
        disableTriggerFocus
        enterDelay={1000}
        leaveDelay={0}
      >
        <div>
          <Action {...props} />
        </div>
      </Tooltip>
    )
  }

  return <Action {...props} />

}

Operation.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.func,
  image: PropTypes.string,
  color: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledDescription: PropTypes.string,
  to: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func
}

Operation.defaultProps = {
  hidden: false,
  disabled: false,
  color: 'contrast'
}

export default Operation