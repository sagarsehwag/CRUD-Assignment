import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { addPost } from "../actions/postActions";

class AddPost extends Component {
	state = { title: "", body: "" };

	onFormSubmit = (event) => {
		event.preventDefault();
		const postData = { post: { ...this.state } };
		this.props.addPost(postData).then((response) => {
			console.log(response.message);
			this.setState({ redirect: true, _id: response._id });
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={`/posts/${this.state._id}`} />;
		}

		return (
			<div className="p-4 my-4 jumbotron">
				<form onSubmit={this.onFormSubmit}>
					<div className="form-group">
						<label htmlFor="title">Tite</label>
						<input
							type="text"
							id="title"
							className="form-control"
							placeholder="Enter Title"
							value={this.state.title}
							onChange={(e) => this.setState({ title: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<input
							type="text"
							id="body"
							className="form-control"
							placeholder="Enter Body"
							value={this.state.body}
							onChange={(e) => this.setState({ body: e.target.value })}
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.postObject.post,
		posts: state.postObject.posts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (postData) => dispatch(addPost(postData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddPost);
