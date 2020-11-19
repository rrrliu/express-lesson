import React from 'react';
import axios from 'axios';

function Dashboard() {
  const [reviews, setReviews] = React.useState();
  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/reviews');
      console.log(res.data);
      setReviews(res.data);
    }
    fetchData();
  }, []);

  if (!reviews) {
    return <div>Loading</div>;
  }

  return (
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
  );
}

export default Dashboard;
