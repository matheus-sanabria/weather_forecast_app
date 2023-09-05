import { useState } from 'react';
import './App.css';

function Search(props) {

    const [city,setCity] = useState('');

    function detectSearch(e){
        e.preventDefault();
        // setCity('');

        let currentValue = document.querySelector('input[name=detectSearch').value;
        
        // alert(currentValue);
        /*
            fazer requisicao API depois
        */
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=10e1aefc4ce8ed4c9639291173b05700&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // destruction, estamos criando dicionario com os dados de resposta da requisicao
            const {main, name, sys, weather} = data;
            if(sys !== undefined){
                console.log(sys.country);

                if(weather !== undefined){
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    weather[0]["icon"]}.svg`;
                    setCity(`
                    
                    <div class="searchResult">
                        <div class="container">
                            <h3>Tempo real em ${name}, ${sys.country} 
                                <img style={{width="40px"; height="40px"; margin="10px"}} src="${icon}" />
                            </h3>
                        
                            <div class="_flex _justify-center _align-center">
                                <img width="120" height="120" src="${icon}">
                                <span class="">${main.temp}C°</span>
                            </div>
                            
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th class="text-left">City:</th>
                                        <th class="text-right">${name}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Country:</th>
                                        <th class="text-right">${sys.country}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Description:</th>
                                        <th class="text-right">${weather[0]['description']}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Sensation:</th>
                                        <th class="text-right">${main.feels_like}C°</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Humidity:</th>
                                        <th class="text-right">💧${main.humidity}%</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Minimum Temperature:</th>
                                        <th class="text-right">${main.temp_min}C°</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Maximum Temperature:</th>
                                        <th class="text-right">${main.temp_max}C°</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Pressure:</th>
                                        <th class="text-right">${main.pressure}hPa</th>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
    
                    `);
                    console.log(weather[0]['description']);

                }
            }else{
                setCity('');
            }
            console.log(data)
        })
    }
  return (
    <div className="search">
        <div className='searchWeather'>
            <div className="container">
                <h2>Search for the city you want to know the forecast 🌞</h2>
                <form onSubmit={(e)=>detectSearch(e)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder={props.placeholder} onKeyUp={detectSearch} name="detectSearch" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>{/* container */}
        </div>{/* searchWeather */}
        {
            (city !== '')?
                <div dangerouslySetInnerHTML={{__html: city}}/>:
                <div style={{padding:'10px'}}>Sem resultados</div>
        }

        


    </div>/* search */
  );
}

export default Search;