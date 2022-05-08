import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import './styles/lb.scss'

const Leaderboard = ({ updateLeaderboard }) => {

    const [RLB, changeRLB] = useState([]);
    const [loading, updateLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            updateLeaderboard().then((data) => changeRLB(data)).then(()=>console.log('data fetched'));
        }

        fetchData().catch(console.error).then(updateLoading(false));

    }, []);

    return (
        <div>
            <Table striped bordered hover className="table">
            <thead>
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
                            <td>placeholder</td>
                            <td>0</td>
                            </tr>
                        )
                    }
                    
                })}
            </tbody>
            </Table>
        </div>
    )
}

export default Leaderboard
