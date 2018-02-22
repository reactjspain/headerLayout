import React from 'react'
import PropTypes from 'prop-types'
import CustomToolbar from './toolbar'
import { withStyles } from 'material-ui/styles'

const secondaryToolbarProperties = {
  height: 42,
  color: 'primary',
  tone: 'light',
  fontColor: 'primary',
  fontTone: 'dark'
}

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'stretch',
    margin: 0,
    padding: 0
  },
  toolbar: {
    overflow: 'hidden',
    width: '100%',
    flex: '0 0 auto',
    paddingRight: 0,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  },
  content: {
    flex: '1 1 auto',
    overflowY: 'auto',
    width: '100%',
    height: 'calc(100vh - 56px)',
    marginTop: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      marginTop: 48,
      height: 'calc(100vh - 48px)'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100vh - 64px)'
    },
    transition: theme.transitions.create('margin-top', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    })
  }
})

const RJSHeaderLayout = props => {
  const {
    hidden,
    relative,
    relativeHeight,
    overflow,
    contentToolbar,
    secondaryToolbar,
    secondaryToolbarHeight,
    operations,
    children,
    classes,
    theme,
    ...rest 
  } = props

  let toolbarComputedStyle = {
    display: 'block',
    position:'fixed',
    zIndex: theme.zIndex.appBar+1
  }
  const secondaryToolbarProps = {
    ...secondaryToolbarProperties,
    height: secondaryToolbarHeight || secondaryToolbarProperties.height
  }
  let contentComputedStyle = {overflow : overflow || 'auto'}
  if (relative) {
    toolbarComputedStyle = {
      ...toolbarComputedStyle,
      position:'relative',
      zIndex: 0,
      boxShadow: '0px 0px'
    }
    contentComputedStyle = {
      ...contentComputedStyle,
      marginTop: 0,
      maxHeight: relativeHeight
    }
  }
  if (secondaryToolbar && !hidden) {
    contentComputedStyle = {
      height: `calc(100vh - ${secondaryToolbarProps.height}px)`,
      marginTop: secondaryToolbarProps.height,
      ...contentComputedStyle
    }
  }
  if (hidden) {
    toolbarComputedStyle = {
      display: 'none'
    }
    contentComputedStyle = {
      marginTop: 0,
      ...contentComputedStyle,
      height: '100vh'
    }
  }
  if (!children) {
    contentComputedStyle = {
      ...contentComputedStyle,
      height: 0
    }
  }

  return (
    <div className={classes.root}>

      <div className={classes.toolbar} style={toolbarComputedStyle}>
        <CustomToolbar
          secondary={secondaryToolbar}
          secondaryProps={secondaryToolbarProps}
          customContent={contentToolbar}
          operations={operations || []}
          relative={relative}
          {...rest}
        />
      </div>
      
      <div className={classes.content} style={contentComputedStyle}>
        {children}
      </div>

    </div>
  )
}

RJSHeaderLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  hidden: PropTypes.bool,
  relative: PropTypes.bool,
  relativeHeight: PropTypes.number,
  operations: PropTypes.array,
  title: PropTypes.string,
  overflow: PropTypes.string,
  updateSearchQuery: PropTypes.func,
  contentToolbar: PropTypes.node,
  loading: PropTypes.bool
}

RJSHeaderLayout.defaultProps = {
  relative: false
}

export default withStyles(styles, {withTheme: true})(RJSHeaderLayout)
