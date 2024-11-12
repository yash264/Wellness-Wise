import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Aboutus = () => {

  const projects = [
    {
      title: "Gurmeet Singh Rathor",
      description: "Design & Development",
      imgUrl: projImg1,
      link:'https://github.com/Guri9368'
    },
    {
      title: "Harshit Pandey",
      description: "ML & Development",
      imgUrl: 'https://github.blog/wp-content/uploads/2023/01/1200x640-2.png?fit=1200%2C640',
      link:'https://github.com/harshit1142'
    },
    {
      title: "Lakshit Rajput",
      description: " Backend Development",
      imgUrl: 'https://github.blog/wp-content/uploads/2023/01/1200x640-2.png?fit=1200%2C640',
      link:'https://github.com/lakshitrajput'
    },
    {
      title: "Yash Pandey",
      description: "Design & Development",
      imgUrl: 'https://github.blog/wp-content/uploads/2023/01/1200x640-2.png?fit=1200%2C640',
      link:'https://github.com/yash264'
    },

  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>About Us</h2>
                <p>Meet the team behind WellNavi</p>
                
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
