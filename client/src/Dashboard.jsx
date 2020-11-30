import React from 'react';
import axios from 'axios';
import { UserContext } from './Context';

function Dashboard() {
  const [reviews, setReviews] = React.useState();
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/reviews');
        setReviews(res.data);
      } catch (reviewsErr) {
        console.log({ err: reviewsErr });
      }
    }
    fetchData();
  }, []);

  async function handleLogout() {
    try {
      await axios.post('/logout');
      setUser(null);
    } catch (logoutErr) {
      console.log({ err: logoutErr });
    }
  }

  if (!reviews) {
    return <div>Loading</div>;
  }

  return (
    <div>
      Hi {user.username}!
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
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Dashboard;
