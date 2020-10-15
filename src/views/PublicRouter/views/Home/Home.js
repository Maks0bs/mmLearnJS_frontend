import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'
import {Link} from "react-router-dom";

/**
 * The home page of mmLearnJS. It is displayed to the user when
 * they first enter the website through a direct link.
 * Sometimes users might be redirected here (e. g. on log out)
 *
 * @memberOf components.views.public
 * @component
 */
class Home extends Component {

    render() {
        return (
        	<div className="container my-3">
	            <div className="row">
		            <div className="col md-auto">
						<h1>Welcome to mmLearnJS</h1>
						<p>
							Visit the {}
							<a
								href="https://github.com/Maks0bs/mmLearnJS_frontend"
								target="_blank"
							>
								Github repo
							</a> {}
							for this project to view code and docs of the website.
						</p>
						<p>
							The best way to experience the website is to {}
							<Link to={`/signup`}><strong>Create an account</strong></Link> {}
							and to visit the <Link to={`/classroom`}><strong>classroom</strong></Link>
						</p>
						<p>
							Use the button in the top right corner (navigation menu if on mobile)
							to sign in and check out the main part of the website for authenticated users.
							If you don't want to create your own account, here are credentials for
							sample predefined accounts:
							<table className="table table-info table-hover m-2 w-50" style={{display: 'table'}}>
								<thead>
									<tr>
										<td/>
										<th scope="col">Teacher account</th>
										<th scope="col">Student account</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Email</th>
										<td>m@m.com</td>
										<td>ms@m.com</td>
									</tr>
									<tr>
										<th scope="row">Password</th>
										<td>passw1</td>
										<td>passw2</td>
									</tr>
								</tbody>
							</table>
						</p>
						<p><b>The password for signing in as a teacher is "testpass"</b></p>
						<p>
							See the <Link to="/classroom/courses"><strong>course list</strong></Link> to explore
							the most interesting part of the website. After you log in as a student,
							try enrolling in some courses and participating in exercises or exploring
							the course content
						</p>

						<p>
							After you log in as a teacher, you can edit the courses you created in a
							lot of various ways. As the course creator you have a special
							right to invite other teachers to your course.
						</p>
						<p>
							You can subscribe to courses if you are enrolled in them. You will receive news about
							updates in the course. You can view these updates in the {}
							<Link to={`/classroom/dashboard`}><strong>dashboard</strong></Link>
						</p>
						<p>
							Try viewing and editing your profile (access it through the navigation bar)
						</p>
						<p>
							If you don't perform any actions while logged in, the authentication cookie
							will expire in 10 minutes and you will be logged out
						</p>
						<h2>News</h2>
		                <NewsFeed />
		            </div>
					<h1>
						<span style={{color: 'blue'}}>m</span>
						<span style={{color: 'green'}}>m</span>
						<span style={{color: '#72c2c2'}}>Learn</span>
						<span style={{color: '#b0cf19'}}>JS</span>
					</h1>
	            </div>
	        </div>
        );
    }
}

export default Home