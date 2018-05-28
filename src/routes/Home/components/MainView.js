import React, { Component } from 'react'
import SliderView from './SliderView/SliderView'
import GridView from './GridView/GridView'
import MapView from './MapView/MapView'
import FooterView from './FooterView/FooterView'
import MenuView from './MenuView/MenuView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
            <div className="main-header2">
                <div className="main-header3">
                    <GridView />
                </div>
                <div className="main-header4">
                    <SliderView />
                </div>
            </div>
            {/*          <GridView />
          <MapView />
          <FooterView />*/}
        </div>
      </div>
    )
  }

}
