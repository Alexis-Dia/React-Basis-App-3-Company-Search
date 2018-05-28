import React, { Component } from 'react'
import Gm from './Gm'
import './MapView.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Route, Redirect } from 'react-router'
import pic1 from './1.png'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import option1 from './investors';
import filter from 'lodash/filter';

class HomeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: null,
      data1: '',
      data2: '',
      data3: ''
    }
  }

  handleMarkerClick = (index) => {
    this.setState({ active: index })
  }

  handleDelete = () => {
    if (this.state.active === null) { return }
    const points = this.state.points.slice()
    points.splice(this.state.active, 1)
    this.setState({ active: null, points })
    this.props.delete(this.state.points[this.state.active].id)
  }

  handleBoundsChanged = () => {
    const bounds = this.map.getBounds()
    const minLat = bounds.getSouthWest().lat()
    const minLng = bounds.getSouthWest().lng()
    const maxLat = bounds.getNorthEast().lat()
    const maxLng = bounds.getNorthEast().lng()

    const params = { minLat, minLng, maxLat, maxLng }

    if (this.state.fetch) {
      clearTimeout(this.state.fetch)
    }
    this.fetch(params)
    // this.setState({
    //   // fetch: setTimeout(() => {
    //   //   this.fetch(params)
    //   // }, 200)
    //   333: this.fetch(params)
    // })
  }

  componentWillMount() {
      console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc0', this.props.mapData)
      if (this.props.mapData.data.data !== null) {
          console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc00')
          this.setState({ data1: this.props.mapData.data.data[0] })
          this.setState({ data2: this.props.mapData.data.data[1] })
          this.setState({ data3: this.props.mapData.data.data[2] })
      }
  }

  componentWillReceiveProps (nextprops) {
      console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1')
    if (nextprops !== this.props) {
      console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc2')
      this.setState({ active: nextprops.mapData })
    }

  }

  seed = () => {
    const bounds = this.map.getBounds()
    const latitude = bounds.getCenter().lat()
    const longitude = bounds.getCenter().lng()
    this.props.seed({ latitude, longitude })
  }

  fetch = (params) => {
    this.props.fetch(params || {
      minLat: 59.3001454302915,
      maxLat: 59.5001454302915,
      minLng: 18.0052783802915,
      maxLng: 18.1652783802915
    })
    this.setState({ active: null })
  }

  increment = () => {
    this.props.onGetData({ numberOfElements: 12 })
  }

  render = () => {
    const { points } = this.state
    var indexes = []
    var indexes2 = []
    var indexes3 = []
    var wage = ''


      if(this.props.mapData.data.data !== null) {
          //const indexes = option1.findIndex(data => data.industry === this.props.mapData.data.data[0])

          console.log('dddddddd',this.props.mapData.data.data)

          if (this.props.mapData.data.data[0] !== "") {
              indexes = filter(option1,
                  {
                      industry: this.props.mapData.data.data[0]
                  })
          }
          if (this.props.mapData.data.data[0] === "") {
              indexes = option1
          }

          console.log('indexes = ', indexes)

          if (this.props.mapData.data.data[1] !== "") {
              console.log('a2',this.props.mapData.data.data[1])
              indexes2 = filter(indexes,
                  {
                      country: this.props.mapData.data.data[1]
                  })
          }
          if (this.props.mapData.data.data[1] === "") {
            console.log('b2',this.props.mapData.data.data[1])
            indexes2 = indexes
          }
          console.log('indexes2 = ', indexes2)

          console.log('03',this.props.mapData.data.data[2],'03')
          if (this.props.mapData.data.data[2] !== "") {
              console.log('if (this.props.mapData.data.data[2] === 1) {', this.props.mapData.data.data[2])
              if (this.props.mapData.data.data[2] == 0) {
                  console.log('111 0')
                  wage = '0 - 9999$'
                  indexes3 = filter(indexes2, data => data.ammount < 10000)
              }
              if (this.props.mapData.data.data[2] == 1) {
                  console.log('111 1')
                  wage = '10000 - 99999$'
                  indexes3 = filter(indexes2, data => data.ammount < 100000
                      && data.ammount > 10000)
              }
              if (this.props.mapData.data.data[2] == 2) {
                  console.log('111 2')
                  wage = '100000 - 999999$'
                  indexes3 = filter(indexes2, data => data.ammount < 1000000
                      && data.ammount > 100000)
              }
          }
          if (this.props.mapData.data.data[2] === "") {
            console.log('b3',this.props.mapData.data.data[2])
            indexes3 = indexes2
          }


          console.log('indexes:::', indexes3)
    }


    return (
      <div>
        <div className="header-awesome-grid-style-1">
          <div></div>
          <div>
              {(this.props.mapData.data.data !== null ) ?
                  <MuiThemeProvider>
                      {!(this.props.mapData.data.data[0] === "" && this.props.mapData.data.data[1] == "" && wage === "" ) && (
                    <Paper style={{
                        padding: 10,
                        margin: 20,
                        textAlign: 'center',
                        display: 'inline-block',
                    }}>

                            <h6>{this.props.mapData.data.data[0] !== "" && ('Industry: ')}{this.state.data1} {this.props.mapData.data.data[1] !== "" && (' Region: ')}{this.state.data2} {wage !== "" && (' Amount of money: ')}{wage}</h6>

                    </Paper>
                        )}
                  </MuiThemeProvider>
                  : <div></div>}
          </div>
          <div></div>
        </div>
        <MuiThemeProvider>
        <div className="main-awesome-grid-style-1">
              {this.props.mapData.data.data !== null && option1 !== null && (indexes3.map((ob) =>
                  <div className="card-awesome-grid-style-1">
                    <Card>
                      <CardMedia
                          overlay={<CardTitle title={ob.name} subtitle={ob.industry + ', ' + ob.country + ', ' + ob.ammount + '$'} />}
                      >
                        <img  src={pic1} alt="" />
                      </CardMedia>
                    </Card>
                  </div>
              ))}

            {/*<Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>

          <div className="card-awesome-grid-style-1">
            <Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
            </Card>
          </div>

          <div className="card-awesome-grid-style-1">
            <Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
            </Card>
          </div>

          <div className="card-awesome-grid-style-1">
            <Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
            </Card>
          </div>

          <div className="card-awesome-grid-style-1">
            <Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
            </Card>
          </div>

          <div className="card-awesome-grid-style-1">
            <Card>
              <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img  src={pic1} alt="" />
              </CardMedia>
            </Card>
          </div>*/}
        </div>

        </MuiThemeProvider>

          { this.props.mapData.data.data !== null &&
        <div className="footer-awesome-grid-style-1">
          <div></div>
          <div>
            <MuiThemeProvider>
              <RaisedButton
                  label="LOAD MORE"
                  primary={false}
                  style={{margin: '12'}}
                  buttonStyle={{backgroundColor: '#dfffe7'}}
              />
            </MuiThemeProvider>
          </div>
          <div></div>
        </div>}

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    mapData: state.mapData.info || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: (data) => dispatch({ type: 'SEARCH_FETCH', data }),
    seed: (data) => dispatch({ type: 'MAP_SEED', data }),
    delete: (id) => dispatch({ type: 'MAP_DELETE_POINT', id })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
