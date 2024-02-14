import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function DeviceControl() {
  const { deviceid } = useParams();
  // const { deviceid } = device._id;
  const [lightState, setLightState] = useState(false);
  const [fanState, setFanState] = useState(false);
  const [miscLoadState, setMiscLoadState] = useState(false);

  // Function to toggle the state of the light
  const toggleLightState = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/devicetoggle/${deviceid}/light`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state: !lightState })
      });
      if (response.ok) {
        setLightState(!lightState);
      } else {
        console.error('Failed to toggle light state');
      }
    } catch (error) {
      console.error('Error toggling light state:', error);
    }
  };

  // Function to toggle the state of the fan
  const toggleFanState = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/devicetoggle/${deviceid}/fan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state: !fanState })
      });
      if (response.ok) {
        setFanState(!fanState);
      } else {
        console.error('Failed to toggle fan state');
      }
    } catch (error) {
      console.error('Error toggling fan state:', error);
    }
  };

  // Function to toggle the state of the miscellaneous load
  const toggleMiscLoadState = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/devicetoggle/${deviceid}/misc-load`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state: !miscLoadState })
      });
      if (response.ok) {
        setMiscLoadState(!miscLoadState);
      } else {
        console.error('Failed to toggle miscellaneous load state');
      }
    } catch (error) {
      console.error('Error toggling miscellaneous load state:', error);
    }
  };

  return (
    <div>
      <h3>Device Control</h3>
      <button onClick={toggleLightState}>{lightState ? 'Turn Off Light' : 'Turn On Light'}</button>
      <button onClick={toggleFanState}>{fanState ? 'Turn Off Fan' : 'Turn On Fan'}</button>
      <button onClick={toggleMiscLoadState}>{miscLoadState ? 'Turn Off Misc Load' : 'Turn On Misc Load'}</button>
    </div>
  );
}

export default DeviceControl;
