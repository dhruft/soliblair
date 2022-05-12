import Nav from './components/NavFull'
import Game from './Game'
import Leaderboard from './Leaderboard'
import Info from './Info'

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import db from './firebase.js';
import { getDocs, addDoc, query, orderBy, limit, collection, deleteDoc, doc } from 'firebase/firestore'

import { useState, useEffect } from 'react';

const scoresRef = collection(db, "scores");
const dailyRef = collection(db, "daily");

function App() {

  const [leaderboard, changeLb] = useState([]);
  const [dailyLb, changeDailyLb] = useState([]);
  const [lowest, changeLowest] = useState();
  const [lowestDaily, changeDailyLowest] = useState();

  useEffect(() => {
    startResets();
  },[])

  const checkInsert = async (score) => {
    let newLb = await updateLeaderboard();
    let newDailyLb = await updateDaily();
    return [newLb.length >= 10 ? (score > newLb[9].score) : true, newDailyLb.length >= 10 ? score > newDailyLb[9].score : true];
  }

  const insert = async (name, score) => {
      await addDoc(scoresRef, { name: name, score: score });
  }

  const insertDaily = async (name, score) => {
      await addDoc(dailyRef, { name: name, score: score });
  }

  const updateLeaderboard = async () => {
    const rawdataq = query(scoresRef, orderBy("score"), limit(10));
    const rawdata = await getDocs(rawdataq);
    var allData = rawdata.docs.map((doc) => ({ name: doc.data().name, score: doc.data().score }));
    allData.sort((a, b) => b.score - a.score);
    allData = allData.slice(0, 10);
    changeLowest(allData.length > 0 ? allData[allData.length - 1].score : 0)
    
    changeLb(allData)
    return allData
  }

  const updateDaily = async () => {
    const rawdataq = query(dailyRef, orderBy("score"), limit(10));
    const rawdata = await getDocs(rawdataq);
    var allData = rawdata.docs.map((doc) => ({ name: doc.data().name, score: doc.data().score }));
    allData.sort((a, b) => b.score - a.score);
    allData = allData.slice(0, 10);
    changeDailyLowest(allData.length > 0 ? allData[allData.length - 1].score : 0)

    changeDailyLb(allData)
    return allData
  }

  const startResets = async () => {
    var today = new Date();
    var midnight = new Date();
  
    midnight.setDate( today.getDate() + 1 )
    midnight.setHours( 0 )
    midnight.setMinutes( 0 )
    midnight.setSeconds( 0 )
    midnight.setMilliseconds( 0 )
  
    setTimeout(() => {
      console.log("resetting")  

      getDocs(dailyRef).then((docs)=>{
        docs.docs.forEach((docObj) => {
          deleteDoc(doc(db, "daily", docObj.id))
        })
      })
  
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