
class App extends React.Component {
    state = {
        page: 'main',
        reviews:[]
    }
    setPage = (goto) => {
  		if (goto === 'main') {
  			this.setState({
  				page: 'main'
  			})
        ReactDOM.findDOMNode(this).scrollIntoView()
  		} else if (goto === 'reviews') {
  			this.setState({
  				page: 'reviews'
  			})
  		} else if (goto === 'pics') {
  			this.setState({
  				page: 'pics'
  			})
  		} else if (goto === 'services') {
        this.setState({
          page: 'services'
        })
      }
  	}

    componentDidMount = () => {
      ReactDOM.findDOMNode(this).scrollIntoView()
        axios.get('/api/reviews').then(
            (response) => {
                this.setState({
                    reviews:response.data
                })
                //console.log(this.state.reviews)
            }
        )
    }

    createReview = (event) => {
        event.preventDefault()
        axios.post(
            '/api/reviews',
            {
                name:this.state.newReviewName,
                comments:this.state.newReviewComment,
            }
        ).then(
            (response) => {
                this.setState({
                    reviews:response.data
                })
            }
        )
        event.target.reset()
    }

    changeNewReviewComment = (event) => {
        this.setState({
            newReviewComment:event.target.value
        });
    }

    changeNewReviewName = (event) => {
        this.setState({
            newReviewName:event.target.value
        });
    }

    render = () => {
      const { page } = this.state
      if (page === 'reviews'){
        return <div className='main'>
        <div className='top'>
        <div id='head'><h3>(720)688-9469</h3></div>
        <img className='logo' src='https://i.imgur.com/kS4Vf3q.jpg?1' onClick={()=> this.setPage('main')} />
        <div id='head'><a href='mailto:jjjpaintco@gmail.com'>jjjpaintco@gmail.com
        </a></div>
        </div><br />
            <div className='container'>
                {
                    this.state.reviews.map(
                        (review, index) => {
                            return <div className='innerPicBox' key={index}>
                            <div className='innerBox'>
                                <h4>-{review.name}<br />
                                <i>'{review.comments}'</i><br /><br />
                                Posted: {new Date(review.created_at).toLocaleDateString("en-US")}</h4>
                                </div>
                            </div>
                        }
                    )
                }
            </div><br />
            <div className='innerPicBox' id='review-box'><h2>Post A Review:</h2>
            <form onSubmit={this.createReview}>
                <input onKeyUp={this.changeNewReviewName} type="text" placeholder="name" id='form-input'/><br/>
                <textarea id='textarea' onKeyUp={this.changeNewReviewComment} type="text" rows='10' placeholder="comments" /><br/>
                <input type="submit" value="Create New Review" />
            </form></div><br />
            <div className='link' onClick={()=> this.setPage('main')}>
            Back To Main</div>
        </div>
      } else if (page === 'pics') {
        return (
          <div className='main'>
          <div className='top'>
          <div id='head'><h3>(720)688-9469</h3></div>
          <img className='logo' src='https://i.imgur.com/kS4Vf3q.jpg?1' onClick={()=> this.setPage('main')} />
          <div id='head'><a href='mailto:jjjpaintco@gmail.com'>jjjpaintco@gmail.com
          </a></div>
          </div><br />
          <div className='innerPicBox'>
          <div className='results'>
          <h4>Before:</h4>
          <h4>After:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/7ErfHFN.jpg' />
          <img src='https://i.imgur.com/2J2kRw9.jpg' />
          </div>
          <div className='description'>
          <i>flawless results regardless of previous condition</i>
          </div>
          </div>
          <br />

          <div className='innerPicBox'>
          <div className='results'>
          <h4>Before:</h4>
          <h4>After:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/NGgbqxW.jpg' />
          <img src='https://i.imgur.com/73LHWLL.jpg' />
          </div>
          <div className='description'>
          <i>professional techniques and quick cleanup</i>
          </div>
          </div>
          <br />

          <div className='innerPicBox'>
          <div className='results'>
          <h4>Before:</h4>
          <h4>After:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/AxKaR2l.jpg' />
          <img src='https://i.imgur.com/hX6WbcW.jpg' />
          </div>
          <div className='description'>
          <i>fresh trim and siding make a stunning impact</i>
          </div>
          </div>

          <br />
          <div className='innerPicBox'>
          <div className='results'>
          <h4>Interior:</h4>
          <h4>Exterior:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/QnBri1U.jpg' />
          <img src='https://i.imgur.com/7MHBThu.jpg' />
          </div>
          <div className='description'>
          <i>breathe new life into your home</i>
          </div>
          </div>

          <br />
          <div className='innerPicBox'>
          <div className='results'>
          <h4>Interior:</h4>
          <h4>Exterior:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/RL8xcVr.jpg' />
          <img src='https://i.imgur.com/cO4sRWP.jpg' />
          </div>
          <div className='description'>
          <i>offering a wide range of services</i>
          </div>
          </div>

          <br />
          <div className='innerPicBox'>
          <div className='results'>
          <h4>Business:</h4>
          <h4>Residence:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/lAOCcSe.jpg' />
          <img src='https://i.imgur.com/t1EMY5P.jpg' />
          </div>
          <div className='description'>
          <i>a quick and easy way to add value to your property</i>
          </div>
          </div>

          <br />
          <div className='link' onClick={()=> this.setPage('main')}>
          Back To Main</div>
          </div>
        )
      } else if (page === 'services') {
        return (

          <div className='listBox'>
          <div className='top'>
          <div id='head'><h3>(720)688-9469</h3></div>
          <img className='logo' src='https://i.imgur.com/kS4Vf3q.jpg?1' onClick={()=> this.setPage('main')} />
          <div id='head'><a href='mailto:jjjpaintco@gmail.com'>jjjpaintco@gmail.com
          </a></div>
          </div><br />
          <div className='innerPicBox'><h2>We serve the greater Denver-Metro area and are fully insured. Our rates are competitive, negotiable, and we specialize in the following:</h2></div><br />
          <div className='innerPicBox'>
          <div className='picBox'>
          <div className='list'>
          <h2><li>Residential</li>
          <li>Commercial</li>
          <li>Interior</li>
          <li>Exterior</li>
          <li>Trim</li>
          <li>Molding</li>
          <li>Gutters</li></h2>
          </div>
          <img src='https://i.imgur.com/vIttDYs.jpg' />
          </div>
          </div>

          <br /><br />
          <div className='innerPicBox'><h2>Call us today at:<br />(720)688-9469<br /><br />
          or email us at:<br />
          <a href='mailto:jjjpaintco@gmail.com' id='email'> jjjpaintco@gmail.com </a>
          <br />for a free quote!</h2></div><br />
          <br /><br /><br />
          <div className='link' onClick={()=> this.setPage('main')}>
          Back To Main</div>
          </div>
        )
      } else if (page === 'main') {
        return (
          <div className='main'>
          <div className='top'>
          <div id='head'><h3>(720)688-9469</h3></div>
          <img className='logo' src='https://i.imgur.com/kS4Vf3q.jpg?1' />
          <div id='head'><a href='mailto:jjjpaintco@gmail.com'>jjjpaintco@gmail.com
          </a></div>
          </div>
          <header>
          <div className='link' onClick={()=> this.setPage('services')}>
          Services</div>
          <div className='link' onClick={()=> this.setPage('pics')}>
          Images</div>
          <div className='link' onClick={()=> this.setPage('reviews')}>
          Reviews</div>
          </header>
          <div className='jj'>
          <img src='https://i.imgur.com/qtRPx3H.jpg' /></div>
          <h2><div className='mission'>We are a small business with big goals!
          <i>'Our mission is to provide the highest quality painting services in our industry paired with customer service that is unparalleled. We stand behind every job we complete and we stake our reputation on your satisfaction!'
          </i></div></h2>
          <div className='jj'>
          <img src='https://i.imgur.com/y4bCHG6.jpg?1' />
          </div>
          <h2><div className='mission'>We can help improve the curb appeal of your home or business.
          <i>'At Triple J, customer satisfaction is not just a catch-phrase for us, it's what we base our entire philosophy on. Our customers come first, from valuing their time and budget to providing the highest level of quality in every project we complete. Our commitment to hard work and integrity is what differentiates us from the competition.'
          </i></div></h2><br /><br /><br />
          <div className='footer'>
          <a href='https://www.facebook.com/Triple-J-Painting-108220707802538/' target='_blank'><img src='https://i.imgur.com/br1AdKl.png' id='icon1' className='icon' /></a>
          <a href='https://www.instagram.com/triple_j_painting/' target='_blank'><img src='https://i.imgur.com/I0uryE6.png' id='icon2' className='icon' /></a>
          <a href='https://www.linkedin.com/in/benjaminjackpitts/' target='_blank'><img src='https://i.imgur.com/HJL6IBU.png' id='icon3' className='icon' /></a></div>
          </div>
        )
      }
    }
}

ReactDOM.render(
    <App></App>,
  document.querySelector('main')
)
