import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import './styles/lb.scss'

const Leaderboard = ({ updateLeaderboard, updateDaily, leaderboard, dailyLb }) => {

    const [RLB, changeRLB] = useState([]);
    const [dRLB, changedRLB] = useState([]);
    const [loading, updateLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            if (dailyLb.length===0) {
                updateDaily().then((data) => changedRLB(data)).then(()=>console.log('data fetched'));
            } else {
                changedRLB(dailyLb)
            }
            
            if (leaderboard.length === 0) {
                updateLeaderboard().then((data) => changeRLB(data)).then(()=>console.log('data fetched'));
            } else {
                changeRLB(leaderboard)
            } 
        }

        fetchData().catch(console.error).then(()=>updateLoading(false))

    }, []);

    return (
    <div>
        
        <div className="headers">
            <h2 className="title">All-Time Leaderboard</h2>
            <h2 className="title">Daily Leaderboard</h2>
        </div>
        <div className="lbcontainer">
            <Table striped bordered hover className="table">
                <thead className="header">
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && [0,1,2,3,4,5,6,7,8,9].map((num) => {
                        if (RLB.length > num) {
                            return (
                                <tr>
                                <td>{num+1}</td>
                                <td>{RLB[num].name}</td>
                                <td>{RLB[num].score}</td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr>
                                <td>{num+1}</td>
                                <td>N/A</td>
                                <td>0</td>
                                </tr>
                            )
                        }
                        
                    })}
                </tbody>
            </Table>
            <Table striped bordered hover className="table">
            <thead className="header">
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {!loading && [0,1,2,3,4,5,6,7,8,9].map((num) => {
                    if (dRLB.length > num) {
                        return (
                            <tr>
                            <td>{num+1}</td>
                            <td>{dRLB[num].name}</td>
                            <td>{dRLB[num].score}</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                            <td>{num+1}</td>
                            <td>N/A</td>
                            <td>0</td>
                            </tr>
                        )
                    }
                    
                })}
            </tbody>
            </Table>
        </div>

        </div>
    )
}

export default Leaderboard
