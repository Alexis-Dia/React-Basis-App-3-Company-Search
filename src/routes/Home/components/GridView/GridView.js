import React, { Component } from 'react'
import { connect } from 'react-redux'
import './GridView.scss'
import LoadingBar from 'react-redux-loading-bar'
import option1 from './option1';
import option2 from './option2';
import option3 from './option3';
import map from 'lodash/map';
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router'
import Arrowdownward from 'material-ui/svg-icons/navigation/arrow-downward';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router'

class GridView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      gridData: null,
        textfield1: false,
        textfield2: false,
        textfield3: false,
        data1: '',
        data2: '',
        data3: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({gridData: nextProps.gridArr});
  }

  componentWillMount () {
    this.props.onGetData({numberOfElements: 4});
  }

  componentWillUnmount () {
    console.log("componentWillUnmount()");
  }

  shouldComponentUpdate () {
    console.log("shouldComponentUpdate()");
    return true;
  }

  componentWillUpdate () {
    console.log("componentWillUpdate()");
  }

  componentDidUpdate () {
    console.log("componentDidUpdate()");
  }

  increment = () => {
    //this.i = this.i + 1;
    console.log("componentWillReceiveProps() increment ");
    this.props.onGetData({numberOfElements: 12});
  }

  decrement = () => {
    console.log("componentWillReceiveProps() decrement ");
    this.props.onGetData({numberOfElements: 8});
  }

    onClick = (e) => {
        //this.props.history.push(`/Items`)
        console.log('aaaaaaaaaaa')
        return <Redirect to='/Items'/>
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('aaaaaaaaaaa', this.state)

        this.props.onGetData({data: [this.state.data1, this.state.data2, this.state.data3]});
        browserHistory.push("Items")

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log('eee', e)
        console.log('eee', e.target.name)
        console.log('eee', e.target.value)
        if (e.target.name === 'Industry') {
            this.setState({ textfield1: true });
            this.setState({ data1: e.target.value });
        } else if (e.target.name === 'Region') {
            this.setState({ textfield2: true });
            this.setState({ data2: e.target.value });
        } else {
            this.setState({ textfield3: true });
            this.setState({ data3: e.target.value });
        }
    }

  render = () => {

      const options1 = map(option1, (val, key) =>
          <option key={val} value={val}>{key}</option>
      )

      const options2 = map(option2, (val, key) =>
          <option key={val} value={val}>{key}</option>
      )

      const options3 = map(option3, (val, key) =>
          <option key={val} value={val}>{key}</option>
      )
console.log('optio1',options1)
    return (
      <div>
        <div className="main-form-grid-style-1">
          <div></div>
          <div className="form-main-page-syle-1">

              <div className="font-open-sans-syle-1"><h3>Discover The Right</h3></div>
              <h3>Investors For Your Startup</h3>
              <div className="search-client-text-field-style-1">
                <label className="control-label">Industry</label>
                <div>
                  <select
                      /*value={this.state.timezone}*/
                      name="Industry"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      >
                    <option value="" >Search Industry</option>
                     {options1}
                  </select>
                </div>
              </div>

              <div className="search-client-text-field-style-1">
                <label className="control-label">Region</label>
                <div>
                  <select
                      /*value={this.state.timezone}*/
                      name="Region"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}>
                    <option value="" >Search Region</option>
                      {options2}
                  </select>
                </div>
              </div>

              <div className="search-client-text-field-style-1">
                <label className="control-label">Amount of Money</label>
                <div>
                  <select
                      /*value={this.state.timezone}*/
                      name="Ammount of Money"
                      type="text"
                      className="form-control"
                      onChange={this.onChange}>
                    <option value="" >Search</option>
                      {options3}
                  </select>
                </div>
              </div>

              <div className="search-client-text-field-style-1">
                <div className="form-group">

{/*                    <button disabled={ this.state.textfield1 === false || this.state.textfield2 === false || this.state.textfield3 === false } className="btn btn-primary btn-lg" >
                      Search
                    </button>*/}
                      <MuiThemeProvider>
                        <RaisedButton
                            //disabled={ this.state.textfield1 === false || this.state.textfield2 === false || this.state.textfield3 === false }
                            label="Search"
                            primary={false}
                            style={{margin: '12'}}
                            onClick={this.onSubmit}
                            buttonStyle={{backgroundColor: '#dfffe7'}}
                          />
                      </MuiThemeProvider>

                </div>
              </div>

          </div>

          <div></div>
        </div>
          <div className="scroll-down-main-style-1">
              <div className="scroll-down-main-style-2">
                  <div  className="scroll-down-main-style-3">
                      <MuiThemeProvider>
                          <IconButton iconStyle={{fill: '#000000'}}>
                              <Arrowdownward/>
                          </IconButton>
                      </MuiThemeProvider>
                  </div>
                  <div  className="scroll-down-main-style-4">
                      SCROLL DOWN
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gridArr: state.gridData.points
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetData: (data) => dispatch({ type: 'SEARCH_FETCH', data })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);

