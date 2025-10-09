import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
function Board() {
    const [temp,setcout] = useState(0);
    const Sum = () => {
        setcout(temp+1);
    }
    return (
        <div>
            <button className='btn border-bg-green' id='btn' onClick={Sum}>{temp}</button>
            <div className='container'>dajfhadiksfjdikfadjsfkadnfkadfansdgjarnboviawnobvindsaviiehrvjdasnvnaknvodansivornwevjasdjvnaoierhngnvjdasvadnsjkvwev</div>
        </div>
    );
}
export default Board;