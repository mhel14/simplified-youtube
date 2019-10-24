import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([])

  // const handleSubmit = (e) => e.preventDefault();

  return ( 
    <div className="upload-wrapper">
      <FilePond allowMultiple={true} files={files} onupdatefiles={setFiles} name={"file"} server="http://localhost:3001/upload"/>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="author" placeholder="Author" />
        <FilePond allowMultiple={true} files={files} onupdatefiles={setFiles} name={"file"} server="http://localhost:3001/upload"/>
        <button className="submit-btn" >Submit</button>
      </form> */}
    </div>
  );
}
 
export default Upload;