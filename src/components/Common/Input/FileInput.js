import React, { useState } from 'react';
import './Input.css'

const FileInput = ({accept, id, fileHandleFun, text}) => {
    const [fileSelected , setFileSelected]=useState("")
  
    const onChange =(e)=>{
      setFileSelected(e.target.files[0].name);
      fileHandleFun(e.target.files[0]); 
      console.log(e.target.files);
    };

  return (
    <>
      <label
       htmlFor={id} 
       className={`custom-input ${!fileSelected ? "label-input" : "active"}`}  >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>

      <input type="file" 
      accept={accept}
      id={id} 
      style={{ display: "none" }}
      onChange={onChange}/>
    </>
  );
}

export default FileInput;
