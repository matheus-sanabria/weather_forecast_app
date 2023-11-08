import { useState } from 'react';
import './App.css';

function Search(props) {/// função Buscar(propriedades)

    const [city,setCity] = useState('');// constantante cidade, definirCidade = usar estado vazio

    function detectSearch(e){// funcao detectar busca (evento)
        e.preventDefault();//
        // setCity('');

        let currentValue = document.querySelector('input[name=detectSearch').value;// valorAtual = campo input com nome detectarBusca
        
        // alert(currentValue);
        /*
            fazer requisicao API depois
        */
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=10e1aefc4ce8ed4c9639291173b05700&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // destruction, estamos criando dicionario com os dados de resposta da requisicao
            const {main, name, sys, weather, wind} = data;
            if(sys !== undefined){
                console.log(sys.country);

                if(weather !== undefined){
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    weather[0]["icon"]}.svg`;
                    setCity(`
                    
                    <div class="searchResult">
                        <div class="container">

                            <h3>Live weather in ${name}, ${sys.country} 
                                <img style={{width="40px"; height="40px"; margin="10px"}} src="${icon}" />
                            </h3>
                            <div class="grid-container">

                                <div class="item item1">
                                    <img width="120" height="120" src="${icon}">
                                </div>

                                <div class="item item2">
                                    <span class="">${main.temp}°</span>
                                </div>

                                <div class="item item3">
                                    <h4>City</h4>
                                    <div class="content-wapper">
                                        <div>🌐</div>
                                        <div>${name}</div>
                                    </div>
                                </div>  

                                <div class="item item5">
                                    <h4>Pressure</h4>
                                    <div class="content-wapper">
                                        <div></div>
                                        <div>${main.pressure}hPa</div>
                                    </div>
                                </div>

                                <div class="item item4">
                                    <h4>Country</h4>
                                    <div class="content-wapper">
                                        <div></div>
                                        <div>${sys.country}</div>
                                    </div>
                                </div>

                                
                                <div class="item item6">
                                    <h4>Wind</h4>
                                    <div class="content-wapper">
                                        <div>${wind.deg} Degrees 
                                        
                                        Speed ${wind.speed}m/s</div>
                                    </div>
                                </div>

                                <div class="item item7">
                                    <h4>Description</h4>
                                    <div class="content-wapper">
                                        <div></div>
                                        <div>${weather[0]['main']}</div>
                                    </div>
                                </div>

                                <div class="item item8">
                                    <h4>Sensation</h4>
                                    <div class="content-wapper">
                                        <div></div>
                                        <div>${main.feels_like}°</div>
                                    </div>
                                </div>  

                                <div class="item item9">
                                    <h4>Humidity</h4>
                                    <div class="content-wapper">
                                        <div>💧</div>
                                        <div>${main.humidity}%</div>
                                    </div>
                                </div>

                                <div class="item item10">
                                    <h4>Temperature</h4>
                                    <div class="content-wapper">
                                        <div>
                                            <i class="fa-solid fa-arrow-up" style="color: #cf0c0c;"></i> ${main.temp_max}°
                                            <br/>
                                            <i class="fa-solid fa-arrow-down" style="color: #3881ff;"></i> ${main.temp_min}°
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                        
                        </div>

                    </div>
    
                    `);
                    /*
                        
                        <div class="_flex _justify-center _align-center">
                        <img width="120" height="120" src="${icon}">
                        <span class="">${main.temp}°</span>
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
                                <th class="text-right">${main.feels_like}°</th>
                            </tr>
                            <tr>
                                <th class="text-left">Humidity:</th>
                                <th class="text-right">💧${main.humidity}%</th>
                            </tr>
                            <tr>
                                <th class="text-left">Minimum Temperature:</th>
                                <th class="text-right">${main.temp_min}°</th>
                            </tr>
                            <tr>
                                <th class="text-left">Maximum Temperature:</th>
                                <th class="text-right">${main.temp_max}°</th>
                            </tr>
                            <tr>
                                <th class="text-left">Pressure:</th>
                                <th class="text-right">${main.pressure}hPa</th>
                            </tr>
                            <tr>
                            <th class="text-left">Wind:</th>
                            <th class="text-right">Direction ${wind.deg} Degrees | Speed ${wind.speed}m/s</th>
                        </tr>
                            
                        </tbody>
                    </table>

                        */        
                    
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
                <h2>Search the weather in any city in the world 🌎</h2>
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
                <div style={{padding:'10px'}}>No results</div>
        }

        


    </div>/* search */
  );
}

export default Search;