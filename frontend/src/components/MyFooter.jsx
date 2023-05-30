import { Container, Row, Col } from 'react-bootstrap';

function MyFooter() {
  return (
    <div className="mt-auto py-3 " style={{backgroundColor:'#6aac28' , width:'100%'}}>
      <Container>
        {/* <Row>
          <Col>
            Video Highlight
          </Col>
        </Row> */}
        <Row>
          <Col md={6}>
            <p>Highlight &copy; {new Date().getFullYear()}</p>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyFooter;