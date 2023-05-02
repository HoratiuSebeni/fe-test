import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_FILMS } from '../graphql/queries';
import MovieInfo from './movieInfo';
import { Container, Card, Table, Modal } from 'react-bootstrap';

const Movies = () => {
  const [movieInfoModal, setMovieInfoModal] = useState(null);
  const { loading, error, data } = useQuery(GET_ALL_FILMS);

  //Create objects whit styling information
  const styles = {
    cardTableHeader: {
      background: "linear-gradient(45deg, #000000, #FFD700)", 
      boxShadow: "0 5px 10px rgba(0,0,0,.2)", 
      border: "0", 
      position: "absolute", 
      paddingTop: "0.75%", 
      paddingBottom: "0.75%", 
      fontSize: "150%", 
      width: "92%", 
      marginLeft: "4%", 
      marginRight: "4%", 
      zIndex: "1"
    },
    cardTableBody: {
      boxShadow: "0 5px 10px rgba(0,0,0,.2)", 
      position: "absolute", 
      width: "100%", 
      paddingTop: "2%", 
      marginTop: "2%"
    },
    themeColor: {
      color: "#BDB76B"
    }
  };

  let tableMovieRows = 0;

  //Calculate years old
  function oldYears(date) {
    const releaseDate = new Date(date);
    const curentDate = new Date(Date.now());
    let years = (curentDate.getFullYear() - releaseDate.getFullYear());

    if (!(curentDate.getMonth() > releaseDate.getMonth()) && curentDate.getDate() < releaseDate.getDate()) {
      --years;
    }
    return parseInt(years);
  }

  if (loading) {
    return <p className="mx-auto text-center align-middle">Loading...</p>;
  }

  if (error) {
    return <p className="mx-auto text-center align-middle">Error : {error.message}</p>;
  }

  return (<>
    <Container className="col d-flex justify-content-center" style={{position: "relative"}}>
      <Card center className="fw-bold text-center text-white col d-flex justify-content-center" style={styles.cardTableHeader}>
        Films
      </Card>
      <Card style={styles.cardTableBody}>
        <Card.Body>
          <Table responsive="sm" hover striped>
            <caption>
              Star Wars Films
            </caption>
            <thead style={styles.themeColor}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Released</th>
                <th scope="col">Director</th>
                <th scope="col">From release date</th>
              </tr>
            </thead>
            <tbody>
              {data.allFilms.films.map(film => 
                <tr key={film.id}>
                  <th scope="row" style={styles.themeColor}>{++tableMovieRows}</th>
                  <td onClick={() => setMovieInfoModal(film.id)} className='fw-semibold'>{film.title}</td>
                  <td>{film.releaseDate}</td>
                  <td>{film.director}</td>
                  <td>{oldYears(film.releaseDate)} years </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
      
    {movieInfoModal && <Modal show="true" backdrop="static">
      <MovieInfo id={movieInfoModal} close={() => setMovieInfoModal(null)}/>
    </Modal>}
  </>);
}

export default Movies;