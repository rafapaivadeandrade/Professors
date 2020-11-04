import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiCamera } from "react-icons/fi";
import "./styles.css";
const ProfileDropZone = ({ onFileUploaded, image }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileurl = URL.createObjectURL(file);
      setSelectedFile(fileurl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="profileDropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFile ? (
        <div>
          <img src={selectedFile} alt="Profile"></img>
          <div
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              overflow: "hidden",
              backgroundColor: "#04d361",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 300,
              top: 110,
              width: 30,
              height: 30,
            }}
          >
            <FiCamera
              style={{
                color: "#fff",
                fontSize: 15,
                marginLeft: 8,
                marginTop: 6.5,
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={`http://192.168.15.10:3333/uploads/${image}`}
            alt="Profile"
          ></img>
          <div
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              overflow: "hidden",
              backgroundColor: "#04d361",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 300,
              top: 115,
              width: 30,
              height: 30,
            }}
          >
            <FiCamera
              style={{
                color: "#fff",
                fontSize: 15,
                marginLeft: 8,
                marginTop: 6.5,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDropZone;
