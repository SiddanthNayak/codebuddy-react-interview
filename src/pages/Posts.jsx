import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Posts = () => {
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
    const data = await response.json();
    setPosts(data.data.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="bg-light">
      <Container>
        <Row className="justify-content-center">
          {posts
            ? posts.map(post => (
                <Col className="post-card" key={post.id} lg={4} md={6} sm={12}>
                  <div className="post">
                    <p>ID: {post.id}</p>
                    <h5>First Name: {post.firstName}</h5>
                    <h5>Last Name: {post.lastName}</h5>
                    <p>Write up: {post.writeup}</p>
                    <img src={post.avatar} alt="avatar" />

                    <img src={post.image} alt="placeholder" />
                  </div>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
