import React, { Component } from 'react'
import './FooterView.scss'
import Linkedin from 'react-icons/lib/fa/linkedin'
import GitHub from 'react-icons/lib/fa/github'
import FcebookOficial from 'react-icons/lib/fa/facebook-official'

export default class FooterView extends Component {

  render = () => {
    return (
      <div>
        <div className='footer'>
          <div>
            <div className='grid'>

              <div className='grid1'>
                <h5>Something Here:</h5>
              </div>

              <div className='grid2'>
                <div >
                  <h5>Our contacts:</h5>
                  <ul>
                    <li><Linkedin size={18} color='#00ccff'/>sample</li>
                    <li><GitHub color='#00ccff'/>sample</li>
                    <li><FcebookOficial color='#00ccff'/>sample</li>
                  </ul>
                </div>
              </div>

              <div className='grid2'>
                <h5>Site Map:</h5>
                <ul>
                  <li> sample</li>
                  <li> sample</li>
                  <li> sample</li>
                </ul>
              </div>

              <div>
                <div>

                  {/*                                    <a href="#">
                                        <i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                                    </a>

                                    <a href="#">
                                        <i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                                    </a>
                                    <script type="text/javascript" src="custom.js"></script>
                                    <a href="#">
                                        <i class="fa fa-instagram fa-2x" aria-hidden="true"></i>
                                    </a>

                                    <a href="#">
                                        <i class="fa fa-snapchat-square fa-2x" aria-hidden="true"></i>
                                    </a>

                                    <a href="#">
                                        <i class="fa fa-vimeo-square fa-2x" aria-hidden="true"></i>
                                    </a>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
