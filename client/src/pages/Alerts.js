import {useState, useEffect} from 'react';
import { api } from '../utils/api';

import AlertForm from '../components/AlertForm';
import AlertList from '../components/AlertList';
import './Alerts.css';

function Alerts() {

    const [alerts, setAlerts] = useState([]);
  
    // Fetch alerts when component mounts
    useEffect(() => {
      fetchAlerts();
    }, []);
  
    // Get all alerts from the backend
    const fetchAlerts = async () => {
      try {
        const data = await api.get('/alert');
        setAlerts(data);
      } catch (err) {
        console.log('Error', err);
      }
    };

    // Add new alert and refresh the list
    const addNewAlert = async (alertData) =>{
        try{
            await api.post('/alert', alertData);
            fetchAlerts();
        }catch(error){
            console.log('Wasnt able to add new alert try again');
        }
    };

    // Delete alert by ID and refresh the list
    const deleteAlert = async (alertId) =>{
        try{
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