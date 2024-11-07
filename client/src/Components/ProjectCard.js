import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProjectCard = ({ title, description, imgUrl,link }) => {
  return (
    <Col size={12} sm={6} md={4}>
    <Link to={link} target="_blank" style={{ textDecoration: "none" }}>
      <div className="proj-imgbx">
        <img src={imgUrl} style={{ width: "100%", height: "340px" }}/>
        <div className="proj-txtx text-white">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
      </Link>
    </Col>
  )
}
