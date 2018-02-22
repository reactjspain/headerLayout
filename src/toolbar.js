import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Operation from './operation'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Input from 'material-ui/Input'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Search from 'material-ui-icons/Search'
import FindInPage from 'material-ui-icons/FindInPage'
import Close from 'material-ui-icons/Close'
import Reply from 'material-ui-icons/Reply'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import { transformColor } from './utils/helpers'

const sizeDifferenceLimit = 'sm'

const styles = theme => ({
  /* Bar */
  appBar: {
    width: '-webkit-fill-available'
  },
  toolbar: {
    justifyContent: 'center'
  },

  /* Operations and Content */
  leftOperations: {
  },
  content: {
    display: 'flex',
    overflow: 'hidden',
    flex: 1
  },
  rightOperations: {
  },

  /* Content */
  mainInfo: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    marginRight: theme.spacing.unit
  },
  search: {
    height: '100%',
    [theme.breakpoints.up(sizeDifferenceLimit)]: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing.unit*2,
      marginRight: theme.spacing.unit*2
    }
  },
  operations: {
    display: 'flex',
    alignItems: 'center'
  },

  /* Title */
  mainInfoText: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flex: 1
  },
  mainInfoTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  mainInfoDescription: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 12,
    lineHeight: '1.2em'
  },
  progress: {
    margin: `0 ${theme.spacing.unit*2}px`
  },

  /* Search */
  searchBar: {
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 0,
    top: theme.spacing.unit*1.5,
    left: theme.spacing.unit*2,
    zIndex: theme.zIndex.appBar,
    maxWidth: `calc(100% - ${theme.spacing.unit*10}px)`,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.sharp
    })
  },
  searchBarSearchIcon: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    zIndex: 5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    width: theme.spacing.unit*4.5,
    height: theme.spacing.unit*4.5
  },
  searchBarInput: {
    flex: 1,
    outline: 'none',
    border: 'none',
    fontSize: 14,
    paddingLeft: theme.spacing.unit*5,
    paddingRight: theme.spacing.unit*4
  },
  searchBarCloseIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    paddingRight: theme.spacing.unit,
    width: theme.spacing.unit*3.5,
    height: theme.spacing.unit*3.5,
    cursor: 'pointer'
  },
  searchOperation: {
    [theme.breakpoints.up(sizeDifferenceLimit)]: {
      display: 'none'
    }
  }
})

let Operations = props => {
  const { operations, color, smallMode, classes } = props

  return (
    <div className={classes.operations}>
      {operations.map(operation => 
        <Operation key={operation.id} smallMode={smallMode} color={color} {...operation} />
      )}
    </div>
  )
}

Operations.propTypes = {
  classes: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired
}

Operations = withStyles(styles)(Operations)

class CustomToolbar extends Component {
  state = {
    searchQuery: '',
    showSearchInput: false,
    searchInputFocused: false,
    smallMode: false
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.onResize)
    this.updateSmallMode(this.props.theme)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.updateSmallMode(this.props.theme)
  }

  updateSmallMode = theme => {
    const width = window.innerWidth
    if (width >= theme.breakpoints.width(sizeDifferenceLimit)) {
      this.setState({smallMode: false, showSearchInput: true})
    } else {
      this.setState({smallMode: true, showSearchInput: false})
    }
  }

  updateSearchQuery = searchQuery => {
    this.setState({searchQuery})
    this.props.updateSearchQuery(searchQuery)
  }

  render = () => {
    const {
      title,
      relative,
      backgroundColor,
      description,
      operations,
      updateSearchQuery,
      customContent,
      secondary,
      secondaryProps,
      loading,
      classes,
      theme 
    } = this.props
    const { showSearchInput, searchQuery, searchInputFocused, smallMode } = this.state

    const background = backgroundColor ? backgroundColor : theme.palette.primary.main
    const color = '#FFFFFF' //TODO GETTING FROM background
    
    let appBarComputedStyle = {
      
    }
    let toolbarComputedStyle = {}
    let contentComputedStyle = {color}
    let searchBarComputedStyle = {    
      background: transformColor(background, searchInputFocused ? 24 : 16)
    }
    const descriptionComputedStyle = {
      ...contentComputedStyle,
      color: transformColor(color, -24)
    }

    /* COLORS */
    if (backgroundColor) {
      toolbarComputedStyle = {
        ...toolbarComputedStyle,
        background
      }
    }

    /* WHEN SEARCH APPEARS */
    if (showSearchInput) {
      if (smallMode) {
        searchBarComputedStyle = {
          ...searchBarComputedStyle,
          width: '100%',
          display: 'flex'
        }
      } else {
        searchBarComputedStyle = {
          ...searchBarComputedStyle,
          position: 'relative',
          display: 'flex',
          top: 0,
          left: 0,
          width: searchInputFocused || relative ? '100%' : '90%',
          maxWidth: searchInputFocused || relative ? 300 : 240
        }
        if (relative) {
          searchBarComputedStyle = {
            ...searchBarComputedStyle,
            transition: 'none'
          }
        }
      }
    }

    /* OPERATIONS */
    const leftOperations = operations.filter(operation => !operation.right)
    let rightOperations = operations.filter(operation => operation.right)

    /* IS SECONDARY TOOLBAR */
    if (secondary && secondaryProps) {
      appBarComputedStyle = {
        ...appBarComputedStyle,
        height: secondaryProps.height,
        background: theme.palette[secondaryProps.color][secondaryProps.tone]
      }
      toolbarComputedStyle = {
        ...toolbarComputedStyle,
        minHeight: secondaryProps.height,
        paddingLeft: theme.spacing.unit * (leftOperations.filter(op => !op.hidden).length ? 1 : 3),
        paddingRight: theme.spacing.unit * (rightOperations.filter(op => !op.hidden).length ? 1 : 3)
      }
      contentComputedStyle = {
        ...contentComputedStyle,
        marginBottom: 0,
        color: theme.palette[secondaryProps.fontColor][secondaryProps.fontTone]
      }
      searchBarComputedStyle = {
        ...searchBarComputedStyle,
        top: smallMode ? theme.spacing.unit/2 : 0,
        left: smallMode ? theme.spacing.unit*2 : 0,
        background: theme.palette[secondaryProps.color][secondaryProps.tone]  
      }
    }

    /* SEARCH ICON IN SMALL MODE */
    if (updateSearchQuery && smallMode) {
      if (showSearchInput) {
        rightOperations = [
          {
            id:'undo',
            description: 'Leave search',
            icon:Reply,
            color:contentComputedStyle.color,
            right:true,
            onClick:() => {
              this.setState({showSearchInput: false, searchQuery: ''})
              updateSearchQuery('')
            }
          }
        ]
      } else {
        rightOperations = [
          {
            id:'search-small',
            description: 'Search',
            icon:secondary ? FindInPage : Search,
            color:contentComputedStyle.color,
            right:true,
            onClick:() => {
              this.setState({showSearchInput: true})
              document.getElementById('searchInput').focus()
            }
          },
          ...rightOperations
        ]
      }
    }
    
    return (
      <AppBar position="static" className={classes.appBar} style={appBarComputedStyle}>
        <Toolbar disableGutters={smallMode} className={classes.appBar} style={toolbarComputedStyle}>

          <div className={classes.leftOperations}>
            <Operations
              operations={leftOperations}
              smallMode
              color={contentComputedStyle.color}
            />
          </div>

          <div className={classes.content}>
            {customContent !== undefined && customContent}
            {customContent === undefined &&
              <React.Fragment>
                {title &&
                  <div className={classes.mainInfo}>
                    <div className={classes.mainInfoText}>
                      <Typography
                        className={classes.mainInfoTitle}
                        style={contentComputedStyle}
                        type={secondary ? 'subheading' : 'title'}
                      >
                        {title}
                      </Typography>
                      <Typography
                        className={classes.mainInfoDescription}
                        style={descriptionComputedStyle}
                      >
                        {description}
                      </Typography>
                    </div>
                    {loading &&
                      <div className={classes.progress}>
                        <CircularProgress size={20} thickness={7} color="accent" />
                      </div>
                    }
                  </div>
                }

                {updateSearchQuery &&
                  <div className={classes.search}>
                    <div className={classes.searchBar} style={searchBarComputedStyle}>
                      <Search
                        className={classes.searchBarSearchIcon}
                        style={contentComputedStyle}
                      />
                      <Input
                        id="searchInput"
                        classes={{
                          root: classes.searchBarInput
                        }}
                        style={contentComputedStyle}
                        onFocus={() => this.setState({searchInputFocused: true})}
                        onBlur={() => this.setState({searchInputFocused: false})}
                        placeholder="Search"
                        disableUnderline={secondary ? false : true}
                        value={searchQuery}
                        onChange={event => this.updateSearchQuery(event.target.value)}
                      />
                      {searchQuery && 
                        <Close
                          size={20}
                          className={classes.searchBarCloseIcon}
                          style={contentComputedStyle}
                          onClick={ () => this.updateSearchQuery('')}
                        />
                      }
                    </div>
                  </div>
                }
              </React.Fragment>
            }
          </div>

          <div className={classes.rightOperations}>
            <Operations
              operations={rightOperations}
              smallMode={smallMode || relative}
              color={contentComputedStyle.color} 
            />
          </div>

        </Toolbar>
      </AppBar>
    )
  }
}

CustomToolbar.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  title: PropTypes.string,
  updateSearchQuery: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  secondary: PropTypes.bool
}

CustomToolbar.defaultProps = {
  loading: false,
  secondary: false
}

export default withStyles(styles, {withTheme: true})(CustomToolbar)
