import {useState, useEffect} from 'react';
import { api } from '../utils/api';

import AlertForm from '../components/AlertForm';
import AlertList from '../components/AlertList';
import './Alerts.css';

function Alerts() {

    const [alerts, setAlerts] = useState([]);
  
    useEffect(() => {
      fetchAlerts();
    }, []);
  
    const fetchAlerts = async () => {
      try {
        const data = await api.get('/alert');
        setAlerts(data);
      } catch (err) {
        console.log('Error', err);
      }
    };

    const addNewAlert = async (e) =>{
        try{
            let alertData = e;
            await api.post('/alert', alertData);
            fetchAlerts();
        }catch(error){
            console.log('Wasnt able to add new alert try again');
        }
    };

    const deleteAlert = async (e) =>{
        try{
            let alertId = e;
            await api.delete(`/alert/${alertId}`);
            fetchAlerts();
        }catch(error){
            console.log('Wasnt able to delete alert');
        }
    }

  return (
    <div className='alerts-container'>
        <div className="alert-form-container">
            <AlertForm addAlert={addNewAlert}/>
        </div>
        <div className="alerts-list-container">
            <AlertList  alerts={alerts} onDeleteAlert={deleteAlert}/>
        </div>
    </div>
  );
}

export default Alerts;