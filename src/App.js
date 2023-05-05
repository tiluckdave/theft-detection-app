import './App.css';
import GaugeChart from 'react-gauge-chart'
import {useState, useEffect} from 'react';

function App() {
  const [theft, setTheft] = useState(true);
  const [current, setCurrent] = useState(0);
  const [voltage, setVoltage] = useState(0);

  // make an api call to get the theft value from this api https://theft-api-2.tiluckdave.repl.co/theft
  // if the theft value is true, set theft to true
  useEffect(() => {
    setInterval(() => {
    fetch('https://theft-api-2.tiluckdave.repl.co/voltage')
    .then(response => response.json())
    .then(data => {
      setVoltage(parseFloat(data))
      }
    )
    fetch('https://theft-api-2.tiluckdave.repl.co/current')
    .then(response => response.json())
    .then(data => {
      setCurrent(parseFloat(data))
      }
    )
    fetch('https://theft-api-2.tiluckdave.repl.co/theft')
    .then(response => response.json())
    .then(data => {

        setTheft(data)

      }
    )
    }, 1000)
  }, [])


  return (
    <div className="App">
      <div className="title">
        <h1>Smart Meter</h1>
      </div>
      
      <div>
      <GaugeChart
              id="gauge-chart8"
              nrOfLevels={3}
              style={{width: 400, height: 180, margin:0, padding: 0}}
              colors={['#5BE12C', '#F5CD19', '#EA4228']}
              arcWidth={0.2}
              percent={current}
              formatTextValue={value => value + ' mA'}
              />
              <h2>Current</h2>
              </div>
            <div>
      <GaugeChart
              id="gauge-chart9"
              nrOfLevels={3}
              style={{width: 400, height: 180, margin:0, padding: 0}}
              marginInPercent={0.05}
              colors={['#5BE12C', '#F5CD19', '#EA4228']}
              arcWidth={0.2}
              percent={voltage/100}
              formatTextValue={value => value + ' V'}
              />
              <h2>Voltage</h2>
              </div>
              {theft &&
            <div className="theft">
              Theft Detected!
            </div> } 
    </div>
  );
}

export default App;
