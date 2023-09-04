import { useState } from 'react';
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

                    <div>
    
                    <p>Temperatura: ${main.temp}C°</p>
    
                    <p>Pais: ${sys.country}</p>
    
                    <p>Cidade: ${name}</p>
    
                    <p>Descrição: ${weather[0]['description']}</p>
    
                    <img src="${icon}" />
    
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
        <div className='SearchResult'>

        </div>{/* SearchResult */}

        {
            (city !== '')?
                <div dangerouslySetInnerHTML={{__html: city}}/>:
                <div>Sem resultados</div>
        }

    </div>/* search */
  );
}

export default Search;