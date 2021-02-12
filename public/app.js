
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
        <h1>TripleJ Logo</h1>
            <div className='container'>
                {
                    this.state.reviews.map(
                        (review, index) => {
                            return <div className='innerPicBox' key={index}>
                            <div className='innerBox'>
                                <h4>-{review.name}<br />
                                <i>'{review.comments}'</i><br /><br />
                                Posted: {new Date(review.created_at).toLocaleDateString("en-US")}</h4><br />
                                </div>
                            </div>
                        }
                    )
                }
            </div><br />
            <h2>Post A Review:</h2>
            <form onSubmit={this.createReview}>
                <input onKeyUp={this.changeNewReviewName} type="text" placeholder="name" /><br/>
                <textarea id='textarea' onKeyUp={this.changeNewReviewComment} type="text" placeholder="comments" /><br/>
                <input type="submit" value="Create New Review" />
            </form><br />
            <div className='link' onClick={()=> this.setPage('main')}>
            Back To Main</div>
        </div>
      } else if (page === 'pics') {
        return (
          <div className='main'>
          <h1>TripleJ Logo</h1>
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
          <div>
          <h1>TripleJ Logo</h1><br />
          <h2>We serve the greater Denver Metro area and are fully insured.<br />Our rates are competitive, negotiable, and we specialize in:</h2><br /><br />
          <h2>Residential</h2>
          <h2>Commercial</h2>
          <h2>Interior</h2>
          <h2>Exterior</h2>
          <h2>Trim</h2>
          <h2>Molding</h2>
          <h2>Gutters</h2>
          <br /><br />
          <h2>Call us today at (720) 688-9469 or</h2>
          <h2>email us at
          <a href='mailto:jjjpaintco@gmail.com'> jjjpaintco@gmail.com </a>
          for a free quote!</h2><br /><br />
          <br /><br /><br />
          <div className='link' onClick={()=> this.setPage('main')}>
          Back To Main</div>
          </div>
        )
      } else if (page === 'main') {
        return (
          <div className='main'>
          <h1>TripleJ Logo</h1>
          <i>contact us today for a free quote</i>
          <div className='top'>
          <h2>(720) 688-9469</h2>
          <h2><a href='jjjpaintco@gmail.com'>jjjpaintco@gmail.com
          </a></h2>
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
          <i>'Our mission is to provide the highest quality painting services in our industry paired with customer service that is unparalleled. To uphold this standard, we stand behind every job we complete – we stake our reputation on your satisfaction.'
          </i></div></h2>
          <div className='jj'>
          <img src='https://i.imgur.com/y4bCHG6.jpg?1' />
          </div>
          <h2><div className='mission'>We can help improve the curb appeal of your home or business.
          <i>'At Triple J, customer satisfaction is not just a tag-phrase for us, it's what we base our entire philosophy on. Our customers come first, from valuing their time and budget to providing the highest level of quality in every project we complete. Our commitment to quality in our work and integrity is what differentiates us from the competition.'
          </i></div></h2><br /><br />
          <div className='footer'>
          <a href='https://www.facebook.com/Triple-J-Painting-108220707802538/'><img src='https://i.imgur.com/OSayseb.jpg' /></a>
          <a href='https://nightwraith.bandcamp.com/'><img src='https://i.imgur.com/5jW494e.jpg' /></a>
          <a href='https://www.linkedin.com/in/benjaminjackpitts/'><img src='https://i.imgur.com/mxMlI7y.jpg' /></a></div>
          </div>
        )
      }
    }
}

ReactDOM.render(
    <App></App>,
  document.querySelector('main')
)
