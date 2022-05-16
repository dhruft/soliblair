import '../styles/navbar.scss';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Warning from './Warning'

const NavFull = () => {
  const [warning, updateWarning] = useState(false);
  const [link, changeLink] = useState('')

  const navigate = useNavigate();
  const handleClose = (num, newLink) => {
    updateWarning(false)
    if (num) navigate("/" + newLink)
  }

  const handleNav = (newLink) => {
    const curr = window.location.pathname;
    
    if (newLink.length===0 && curr==="/soliblair/") {
      console.log("skipped")
    } else if (curr==="/soliblair/") {
      changeLink(newLink)
      updateWarning(true)
    } else {
      navigate("/" + newLink)
    }
  }

  return (
    <div className="fullnav">
        <div className="brand" onClick={()=>handleNav('')}>Soli-Blair</div>
        <div className="navCont">
          <div className="direct" onClick={()=>handleNav('')}>Play</div>
          <div className="direct" onClick={()=>handleNav('leaderboard')}>Leaderboard</div>
          <div className="direct" onClick={()=>handleNav('info')}>Info</div>
        </div>
      <Warning warning={warning} handleClose={handleClose} link={link}/>
    </div>
  )
}

export default NavFull
