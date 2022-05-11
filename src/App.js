import Nav from './components/NavFull'
import Game from './Game'
import Leaderboard from './Leaderboard'
import Info from './Info'

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import db from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

import { useState, useEffect } from 'react';

function App() {

  const [leaderboard, changeLb] = useState([]);
  const [dailyLb, changeDailyLb] = useState([]);

  useEffect(() => {
    startResets();
  },[])

  const checkInsert = async (score) => {
    let newLb = await updateLeaderboard();
    let newDailyLb = await updateDaily();
    return [newLb.length >= 10 ? score > newLb[9].score : true, newDailyLb.length >= 10 ? score > newDailyLb[9].score : true];
  }

  const insert = async (name, score) => {

      let newLb = leaderboard;
      newLb.push({
        name,
        score
      });
      changeLb(newLb);
      
      try {
          await addDoc(collection(db, "scores"), {content: [name, score]});
      } catch (e) {
          console.error("Error adding document: ", e);
      }
  }

  const insertDaily = async (name, score) => {
    let newLb = dailyLb;
    newLb.push({
      name,
      score
    });
    changeDailyLb(newLb)

    try {
      await addDoc(collection(db, "daily"), {content: [name, score]});
  } catch (e) {
      console.error("Error adding document: ", e);
  }
  }

  const updateLeaderboard = async () => {
    let lb = [];

    const querySnapshot = await getDocs(collection(db, "scores"));
    querySnapshot.forEach((doc) => {
      const content = doc.data().content;
      lb.push({
        name: content[0],
        score: content[1]
      })
    });

    lb.sort((val1, val2) => val2.score - val1.score);

    const newLb = lb.slice(0,10)
    changeLb(newLb)
    return newLb
  }

  const updateDaily = async () => {
    let lb = [];

    const querySnapshot = await getDocs(collection(db, "daily"));
    querySnapshot.forEach((doc) => {
      const content = doc.data().content;
      lb.push({
        name: content[0],
        score: content[1]
      })
    });

    lb.sort((val1, val2) => val2.score - val1.score);

    const newLb = lb.slice(0,10)
    changeDailyLb(newLb)
    return newLb
  }

  const startResets = async () => {
    console.log("starting")
    var today = new Date();
    var midnight = new Date();
  
    midnight.setDate( today.getDate() + 1 )
    midnight.setHours( 9 )
    midnight.setMinutes( 0 )
    midnight.setSeconds( 40 )
    midnight.setMilliseconds( 0 )
    console.log((midnight.getTime() - today.getTime())%86400000)
  
    setTimeout(() => {
      console.log("resetting")  

      db.collection("daily").get().then(
        (snap) => snap.forEach(async (doc) => {
          console.log(doc)
          await deleteDoc(doc.ref.delete());
        })
      )
  
      startResets()
    }, (midnight.getTime() - today.getTime())%86400000)
  }

  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/soliblair/leaderboard" element={<Leaderboard updateLeaderboard={updateLeaderboard} updateDaily={updateDaily}
          leaderboard={leaderboard} dailyLb={dailyLb}/>} />
          <Route path="/soliblair/info" element={<Info />}/>
          <Route exact path="/soliblair" element={<Game insert={insert} insertDaily={insertDaily} checkInsert={checkInsert}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;