import React, { Component } from 'react';
import Entry from './Entry'

class Section extends Component {
	render() {
        let { name, description, entries, courseId } = this.props;
		return (
			<div>
				<h3>{name}</h3>
                <p>{description}</p>
                <div className="ml-4">
	                {entries.map((entry, i) => {
	                	if (!entry ){
	                		return null;
	                	}
	                	return (
	                		<div key={i}>
		                        <Entry 
		                            name={entry.name}
		                            type={entry.type}
		                            content={entry.content}
		                            id={entry._id}
		                            courseId={courseId}
		                            access={entry.access}
		                        />
		                    </div>
		                )
	                })}
	            </div>
			</div>
		);
	}
}

export default Section