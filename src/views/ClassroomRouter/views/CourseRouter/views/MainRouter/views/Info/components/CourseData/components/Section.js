import React, { Component } from 'react';
import Entry from './Entry'

class Section extends Component {
	render() {
        let { name, description, entries, courseId } = this.props;
		return (
			<div>
				<h3> <strong> {name} </strong> </h3>
                <p>{description}</p>
                <ul
					style={{
						listStyleType: 'none'
					}}
				>
	                {entries.map((entry, i) => {
	                	if (!entry ){
	                		return (
	                			<li key={i}>Problem with entry</li>
							)
	                	}
	                	return (
	                		<li key={i}>
		                        <Entry 
		                            name={entry.name}
		                            type={entry.type}
		                            content={entry.content}
		                            id={entry._id}
		                            courseId={courseId}
		                            access={entry.access}
		                        />
		                    </li>
		                )
	                })}
	            </ul>
			</div>
		);
	}
}

export default Section