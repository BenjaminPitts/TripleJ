//import React, {Component} from 'react'
//import Show from './components/Show'

class App extends React.Component {
    state = {
        page: 'main',
        number: 0,
        reviews:[]
    }
    setPage = (goto) => {
  		if (goto === 'main') {
  			this.setState({
  				page: 'main'
  			});
  		} else if (goto === 'reviews') {
  			this.setState({
  				page: 'reviews'
  			});
  		} else if (goto === 'pics') {
  			this.setState({
  				page: 'pics'
  			});
  		} else if (goto === 'pricing') {
        this.setState({
          page: 'pricing'
        })
      }
  	};

    componentDidMount = () => {
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
        event.preventDefault();
        axios.post(
            '/api/reviews',
            {
                name:this.state.newReviewName,
                comments:this.state.newReviewComment,
                pics:this.state.newReviewPics
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
    changeNewReviewPics = (event) => {
      this.setState({
        newReviewPics:event.target.value
      })
    }

    deleteReview = (event) => {
        axios.delete('/api/reviews/' + event.target.value).then(
            (response) => {
                this.setState({
                    reviews:response.data
                })
            }
        )

    }

    updateReview = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/api/reviews/' + id,
            {
                name:this.state.updateReviewName,
                comments:this.state.updateReviewComment,
                pics:this.state.updateReviewPics
            }
        ).then(
            (response) => {
                this.setState({
                    reviews:response.data,
                    name:'',
                    comments:'',
                    pics:''
                })
            }
        )
        event.target.reset()
        //window.location.reload(false);
    }

    changeUpdateReviewName = (event) => {
        this.setState(
            {
                updateReviewName:event.target.value
            }
        )
    }

    changeUpdateReviewComment = (event) => {
        this.setState(
            {
                updateReviewComment:event.target.value
            }
        )
    }

    changeUpdateReviewPics = (event) => {
      this.setState(
        {
          updateReviewPics:event.target.value
        }
      )
    }

    render = () => {
      const { page } = this.state;
      if (page === 'reviews'){
        return <div className='main' id='top'>
        <h1>TripleJ Reviews</h1>
        <br />
            <div className='container'>
                {
                    this.state.reviews.map(
                        (review, index) => {
                            return <div className='box' key={index}>

                            <img src={review.pics} /><br />
                            <div className='innerBox'>
                                <h4>--{review.name}<br />
                                <i>'{review.comments}'</i><br /><br />
                                Posted: {new Date(review.created_at).toLocaleDateString("en-US")}</h4><br />
                                <details><summary>Edit Post</summary>
                                <h5>Must Fill Out All Fields</h5>
                                <form id={review.id} onSubmit={this.updateReview}>
                                    <input onKeyUp={this.changeUpdateReviewName} type="text" placeholder='name' /><br/>
                                    <input id='comments' onKeyUp={this.changeUpdateReviewComment} type="text" placeholder='comments'/><br/>
                                    <input onKeyUp={this.changeUpdateReviewPics} type='text' placeholder='img URL'/><br />

                                    <input type="submit" value="Update Review"/><br />
                                    <button className='delete' value={review.id} onClick={this.deleteReview}>DELETE REVIEW</button>
                                </form>
                                </details>
                                </div>
                            </div>
                        }
                    )
                }
            </div>
            <h2>Post A Review</h2>
            <form onSubmit={this.createReview}>
                <input onKeyUp={this.changeNewReviewName} type="text" placeholder="name" /><br/>
                <input id ='comments' onKeyUp={this.changeNewReviewComment} type="text" placeholder="comments" /><br/>
                <input onKeyUp={this.changeNewReviewPics} type='text' placeholder='image URL' /><br />
                <input type="submit" value="Create New Review" />
            </form><br />

            <div className='link' onClick={()=> this.setPage('main')}>
            Back Home</div>
        </div>
      } else if (page === 'pics') {
        return (
          <div className='container'>
          <h2>Pics Test Page</h2><br />
          <div className='innerPicBox'>
          <div className='results'>
          <h4>Before:</h4>
          <h4>After:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/Ni4r2aP.jpeg' />
          <img src='https://i.imgur.com/dTYQkcJ.jpg' />
          </div>
          <div className='description'>
          This is a description of the job
          </div>
          </div>
          <br />

          <div className='innerPicBox'>
          <div className='results'>
          <h4>Before:</h4>
          <h4>After:</h4>
          </div>
          <div className='picBox'>
          <img src='https://i.imgur.com/Gwb3pm5.jpg' />
          <img src='https://i.imgur.com/ijWIK1w.jpg' />
          </div>
          <div className='description'>
          This is a description of the job
          </div>
          </div>
          <br />
          <div className='link' onClick={()=> this.setPage('main')}>
          Back Home</div>
          </div>
        )
      } else if (page === 'pricing') {
        return (
          <div>
          <h2>Pricing Test Page</h2>
          <h4> We use <a href='#'> xyz </a> brand of paint and our rates are negotiable depending on the circumstances:</h4>
          <h3>Indoor: $$$/sq foot</h3>
          <h3>Outdoor: $$$/sq foot</h3><br />
          <h4>Email us at
          <a href='mailto:example@gmail.com'> example@gmail.com </a>
          for a customized quote!</h4><br /><br /><br /><br />
          <div className='link' onClick={()=> this.setPage('main')}>
          Back Home</div>
          </div>
        )
      } else if (page === 'main') {
        return (
          <div>
          <h1>TripleJ Logo</h1><br />
          <header>
          <div className='link' onClick={()=> this.setPage('pics')}>
          Pics</div>
          <div className='link' onClick={()=> this.setPage('pricing')}>
          Quotes</div>
          <div className='link' onClick={()=> this.setPage('reviews')}>
          Reviews</div>
          </header>
          <div className='jj'>
          <img src='https://i.imgur.com/qtRPx3H.jpg' />
          </div>
          <h2><p>this is who we are and this is our mission</p></h2>
          <p><i>we are solid dudes that are good at painting things</i></p>
          <br /><br />
          <div className='footer'>
          <a href='https://www.facebook.com/Triple-J-Painting-108220707802538/?ref=page_internal'>FB</a>
          <a href='#'>IG</a>
          <a href='#'>Twitter</a>
          <a href='#'>LinkedIn</a></div>
          </div>
        )
      }

    }
}

ReactDOM.render(
    <App></App>,

    document.querySelector('main')
)
