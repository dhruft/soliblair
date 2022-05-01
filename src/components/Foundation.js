import Card from './Card';
import '../styles/foundation.scss';

const Foundation = () => {
  return (
    <div className="column">
        <div className="spacer"/>
        <Card flower="spade" number={1} hidden={false} className="card"/>
    </div>
  )
}

export default Foundation
