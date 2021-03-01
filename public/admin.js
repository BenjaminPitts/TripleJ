class Admin extends React.Component {
    state = {
        reviews:[]
    }

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
            }
        ).then(
            (response) => {
                this.setState({
                    reviews:response.data,
                    name:'',
                    comments:'',
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

    render = () => {
        return <div className='main' id='top'>
        <div className='top'>
        <div id='head'><h2>ADMIN PAGE</h2></div>
        <img className='logo' src='https://i.imgur.com/kS4Vf3q.jpg?1' />
        <div id='head'><h2>ADMIN PAGE</h2></div>
        </div>
            <div className='container'>
                {
                    this.state.reviews.map(
                        (review, index) => {
                            return <div className='innerPicBox' key={index}>
                            <div className='innerBox'>
                                <h4>-{review.name}<br />
                                <i>'{review.comments}'</i><br /><br />
                                Posted: {new Date(review.created_at).toLocaleDateString("en-US")}</h4><br />
                                <details className='details'><summary>Edit Post</summary>
                                <h5><i>(Must Fill Out All Fields)</i></h5>
                                <form id={review.id} onSubmit={this.updateReview}>
                                    <input onKeyUp={this.changeUpdateReviewName} type="text" placeholder='name' /><br/>
                                    <textarea id='textarea' onKeyUp={this.changeUpdateReviewComment} type="text" placeholder='comments'/><br/>
                                    <br />
                                    <input type="submit" value="Update Review"/><br />
                                    <button className='delete' value={review.id} onClick={this.deleteReview}>DELETE REVIEW</button>
                                </form>
                                </details>
                                </div>
                            </div>
                        }
                    )
                }
            </div><br /><br />
            <a href='/'><div className='link'>
            Back To Main</div></a>
        </div>
    }
}

ReactDOM.render(
    <Admin></Admin>,
    document.querySelector('section')
)
