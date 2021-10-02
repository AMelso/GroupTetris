import React from 'react'
import { Icon } from 'semantic-ui-react'

const ForumDetails = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <article className="fourms">
                    <h2>NSTP Annual Federal Tax Refresher Course</h2>
                    <ul>
                        <li><Icon name="user"/> By : Debra Shelby</li>
                        <li><Icon name="comment"/> 12</li>
                        <li><Icon name="calendar alternate"/> 21 Sep, 2021</li>
                    </ul>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </article>
            </div>
            <div className="col-md-12">
            <div className="comments-container">
		<h2>Comments</h2>
{/* comment forum list from bootsnip */}
		<ul id="comments-list" className="comments-list">
			<li>
				<div className="comment-main-level">
					
					<div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>
					
					<div className="comment-box">
						<div className="comment-head">
							<h6 className="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
							<span>hace 20 minutos</span>
							<Icon name="reply"/>
							<Icon name="heart"/>
						</div>
						<div className="comment-content">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
						</div>
					</div>
				</div>
				<ul className="comments-list reply-list">
					<li>
						<div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
						<div className="comment-box">
							<div className="comment-head">
								<h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
								<span>hace 10 minutos</span>
								<Icon name="reply"/>
							<Icon name="heart"/>
							</div>
							<div className="comment-content">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
							</div>
						</div>
					</li>

					<li>
						
						<div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>
					
						<div className="comment-box">
							<div className="comment-head">
								<h6 className="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
								<span>hace 10 minutos</span>
								<Icon name="reply"/>
							<Icon name="heart"/>
							</div>
							<div className="comment-content">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
							</div>
						</div>
					</li>
				</ul>
			</li>

			<li>
				<div className="comment-main-level">
					<div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
					<div className="comment-box">
						<div className="comment-head">
							<h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
							<span>hace 10 minutos</span>
							<Icon name="reply"/>
							<Icon name="heart"/>
						</div>
						<div className="comment-content">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>

    <div className="comment-form">
        <h3>Post Your Comment</h3>
    <form>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">
                                Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter name" required="required" />
                        </div>
                        <div class="form-group">
                            <label for="email">
                                Email Address</label>
                            <div class="input-group">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span>
                                </span>
                                <input type="email" class="form-control" id="email" placeholder="Enter email" required="required" /></div>
                        </div>
                        <div class="form-group">
                            <label for="subject">Title</label>
                            <input type="text" class="form-control" id="email" placeholder="Title" required="required" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">
                                Comment</label>
                            <textarea name="comment" id="comment" class="form-control" rows="8" cols="25" required="required"
                                placeholder="Comment"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary pull-right" id="btnContactUs">
                            Post Comment</button>
                    </div>
                </div>
                </form>
        
    </div>
            </div>
        </div>
    )
}

export default ForumDetails
