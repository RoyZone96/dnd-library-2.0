import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AccountPage (){
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await axios.get('/api/bookmarks');
      setBookmarks(response.data);
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      <h2>My Bookmarks</h2>
      {bookmarks.map(bookmark => (
        <div key={bookmark.id}>
          <h3>{bookmark.title}</h3>
          <p>{bookmark.description}</p>
          {/* Implement functionality to remove a bookmark if needed */}
        </div>
      ))}
    </div>
  );
};