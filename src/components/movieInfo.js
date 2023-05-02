import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_FILM_INFO } from '../graphql/queries';
import { Modal, ListGroup } from 'react-bootstrap';

const MovieInfo = ({ id, close }) => {

  const { loading, error, data } = useQuery(GET_FILM_INFO, {
    variables: {
      id
    }
  });

  const styles = {
    modalHeader: {
      background: "linear-gradient(45deg, #000000, #FFD700)", 
      boxShadow: "0 5px 10px rgba(0,0,0,.2)"
    },
    themeColor: {
      color: "#BDB76B"
    }
  };

  if (loading) {
    return <p className="mx-auto text-center align-middle">Loading...</p>;
  }

  if (error) {
    return <p className="mx-auto text-center align-middle">Error : {error.message}</p>;
  }

  return <>
    <Modal.Header closeButton onClick={close} className='text-white' style={styles.modalHeader}>
      <Modal.Title className="fs-3">
        {data.film.title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="fs-15">
      <div name="crawl">
        <ul>
          <li className="fw-bold" style={styles.themeColor}>
            The opening crawl:
          </li>
        </ul>
        <p className="fst-italic">
          "{data.film.openingCrawl}"
        </p>
      </div>
      <div name="planets">
        <ul>
          <li className="fw-bold" style={styles.themeColor}>
            List of Planets:
          </li>
        </ul>
        <ListGroup as="ol" numbered variant="flush">
          {data.film.planetConnection.planets.map(planet => 
            <ListGroup.Item as="li" key={planet.name}>
              {planet.name}
            </ListGroup.Item>
          )}    
        </ListGroup>
      </div>
    </Modal.Body>
  </>;
}

export default MovieInfo;