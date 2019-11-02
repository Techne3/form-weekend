import React from 'react';

class About extends React.Component {
    constructor(){
        super();
        this.state={
            pageTitle: 'The about page'
        }
    }

    componentDidMount() {
        this.setState({
            pageTitle: 'CDM about page'
        })
    }
    
	render() {
		return (
			<div>
				<h2>{this.state.pageTitle}</h2>
			</div>
		);
	}
}

export default About;
