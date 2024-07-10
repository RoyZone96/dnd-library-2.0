import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AccountPage (){
  const [bookmarks, setBookmarks] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error('There was an error fetching the bookmarks:', error);
      }
    };
  
    fetchBookmarks();
  }, [token]);


  return (
    <div className='scroll-container'>
      <h2>My Bookmarks</h2>
      {bookmarks.map(bookmark => (
        <div key={bookmark.url}>
          {/* Implement functionality to remove a bookmark if needed */}
        </div>
      ))}
    </div>
  );
};