import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null);

  const fetchVideos = (uri) => (
    fetch(uri)
    .then(res => res.json())
    .then(data => setVideos(data))
  );

  useEffect(() => {
    fetchVideos('http://localhost:3001/');
  }, []);

  const playVideoHandler = (fileName) => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    setActiveVideo(fileName)
  }

  return ( 
    <div className="home-wrapper">
      {
        activeVideo && 
        <div className="active-video">
          <div className="wrapper">
            <video src={`http://localhost:3001/play_video?id=${activeVideo}`} autoPlay controls frameBorder="0" allowFullScreen></video>
          </div>
        </div>
      }
      <ul className="video-list-wrapper">
        {
          videos.length 
          ? videos.map(file => {
            return file.split('.').pop() === 'mp4' 
              && ( <li key={file}>
                    <div className="thumb-wrapper" onClick={() => playVideoHandler(file)}>
                      <video src={`http://localhost:3001/play_video?id=${file}`} >
                        <source src={`http://localhost:3001/play_video?id=${file}`} type="video/mp4" />
                        <source src={`http://localhost:3001/play_video?id=${file}`} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="thumb-body">
                      <h3 className="thumb-title">Title Placeholder</h3>
                      <p className="author">Author Placeholder</p>
                    </div>
                  </li>
                );
            })
          : <li className="empty-video-text-wrapper">
            <p>Oppps! Seems like you didn't upload any video yet?</p>
          </li>
        }
      </ul>
    </div>
  );
}
 
export default Home;