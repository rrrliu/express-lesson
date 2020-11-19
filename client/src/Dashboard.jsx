import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Dashboard() {
  const [reviews, setReviews] = React.useState();
  const [user, setUser] = React.useState();
  const [loggedOut, setLoggedOut] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/reviews');
        setReviews(res.data.reviews);
        setUser(res.data.user);
      } catch (err) {
        console.log({ err });
        setLoggedOut(true);
      }
    }
    fetchData();
  }, []);

  if (loggedOut) {
    return <Redirect to="/login" />;
  }

  if (!reviews) {
    return <div>Loading</div>;
  }

  return (
    <div>
      Hi {user}!
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, i) => (
            <tr key={i}>
              <td>{review.class}</td>
              <td>{review.review_year}</td>
              <td>{review.rating}</td>
              <td>{review.review_text} / 10</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={async () => {
          await axios.post('/logout');
          setLoggedOut(true);
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
