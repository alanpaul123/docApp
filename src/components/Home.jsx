import React, { useEffect, useState } from "react";
import Cardpart from "./Cardpart";
import { Box, Modal, TextField, colors } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const firebaseConfig = {
//   apiKey: "AIzaSyDS8jyp6wBNXtYt2e5sJmIysIHjdCj5j_M",
//   authDomain: "document-app-e99c4.firebaseapp.com",
//   projectId: "document-app-e99c4",
//   storageBucket: "document-app-e99c4.appspot.com",
//   messagingSenderId: "460856384474",
//   appId: "1:460856384474:web:2f59fdb0c628aaa3ca3ee3",
//   measurementId: "G-ZT2PN5LQVJ",
// };

const firebaseConfig = {
    apiKey: "AIzaSyDNPVMi575Bk1zU45xuJqduEwyZqG2jBkM",
    authDomain: "dapp-e7205.firebaseapp.com",
    projectId: "dapp-e7205",
    storageBucket: "dapp-e7205.appspot.com",
    messagingSenderId: "711591219697",
    appId: "1:711591219697:web:b2214583e1eaaa2e883450",
    measurementId: "G-Y58BCCRSLR"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState([]);

  //docs
  const fetchDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "documents"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [documents]);

  const handleAddDocument = async () => {
    try {
      await addDoc(collection(db, "documents"), { title, content: "" });
      fetchDocuments();
      handleClose();
      toast.warning("Document Successfully Added !!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding document");
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, "documents", docId));
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  //modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  return (
    <>
      <div className=" d-flex flex-column justify-content-center align-items-center bigb">
        <h1>Document App</h1> <br />
        <div className="justify-content-center align-items-center">
          <button onClick={handleOpen} className="btn btn-success">
            + ADD DOC
          </button>
        </div>
        <div
          className="d-flex align-items-center p-3 mt-2 w-100 smb "
          style={{ alignItems: "center" }}
        >
          {documents.map((doc) => (
            <Cardpart
              key={doc.id}
              id={doc.id}
              title={doc.title}
              content={doc.content}
              onDelete={() => handleDeleteDocument(doc.id)}
              className="card"
            />
          ))}
        </div>
      </div>
      {/* modal */}
      <Modal
        className="d-flex justify-content-center align-items-center "
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="d-flex justify-content-center flex-column sb p-3">
          <div>
            <TextField
              className="w-100"
              id="outlined-basic"
              label="Enter the title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="text-center mt-3">
            <button
              onClick={handleAddDocument}
              className="btn btn-primary mt-4 p-2 rounded fw-bolder fs-3"
            >
              ADD
            </button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Home;
