import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import './App.css';
import {db, auth } from './firebase'
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/Common/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import PodcastPage from './pages/Podcast';
import Podcastdetails from './pages/PodcastDetails';
import CreateAnEpisode from './pages/CreateAnEpisode';

function App() {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(()=>{
      const unSubcribeAuth = onAuthStateChanged(auth,(user)=>{
        if(user){
         const unsubscribeSnapshot =onSnapshot(
          doc(db,"users",user.uid),

          (userDoc)=>{
            if(userDoc.exists()){
              const userData=userDoc.data();
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid,
                  profileImageUrl:userData.profileImageUrl,
                })
              );
            }
          },
          (error)=>{
            console.log("Error fetching user data: ",error);
          }
         );
         return () =>{
          unsubscribeSnapshot(); 
         }
         //clean up function to remove event listener when component is dismounted
        } 
      })
      return ()=>{
        unSubcribeAuth();
      }
  },[]);
  return (
    <div className="App">
      <ToastContainer />
    <Router>
      <Routes>
      <Route path="/" element={user ? <Navigate to="/profile" /> : <SignUpPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/start-a-podcast" element={<CreateAPodcast/>} />
          <Route path="/podcast" element={<PodcastPage/>} />
          <Route path="/podcast/:id" element={<Podcastdetails/>} />
          <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode/>} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
