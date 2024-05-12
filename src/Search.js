import { useState } from 'react'; // Importa a função 'useState' do React, que permite adicionar estado a componentes funcionais.
import './App.css'; // Importa o arquivo de estilo CSS para o componente.

function Search(props) { // Declaração do componente 'Search' que recebe 'props' como parâmetro.

    const [city,setCity] = useState(''); // Declaração de um estado 'city' e da função 'setCity' para atualizar esse estado, inicializados com um valor vazio.

    function detectSearch(e){ // Declaração da função 'detectSearch' que será chamada ao enviar o formulário.
        e.preventDefault(); // Impede o comportamento padrão do formulário de ser acionado (recarregar a página).

        let currentValue = document.querySelector('input[name=detectSearch').value; // Obtém o valor do campo de entrada de pesquisa.

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=10e1aefc4ce8ed4c9639291173b05700&units=metric`; // Constrói a URL da API do OpenWeatherMap com a cidade pesquisada.
        fetch(url) // Realiza uma solicitação para a API usando a URL construída.
        .then(response => response.json()) // Converte a resposta da API para JSON.
        .then(data => { // Manipula os dados recebidos da API.
            const { // Destructuring dos dados para extrair os campos necessários.
                main, // Temperatura principal 
                name, // Nome da cidade
                sys, // 
                weather, // Clima 
                wind // Vento
            } = data; // Dados encapsulados
            if(sys !== undefined){ // Verifica se os dados do objeto 'sys' são definidos.
                if(weather !== undefined){ // Verifica se os dados do objeto 'weather' são definidos.
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`; // Constrói a URL do ícone do clima.
                    setCity(` <!-- Atualiza o estado 'city' com uma string HTML contendo os dados do clima. -->
                    <div class="searchResult">
                        <div class="container">
                            <h3>
                                Live weather in ${name}, ${sys.country} <!-- Exibe cidade e pais -->
                                <img style={{width="40px"; height="40px"; margin="10px"}} src="${icon}" /><!-- Exibe icone descritivo do clima -->
                            </h3>
                            <div class="grid-container">
                            <div class="item item1">
                            <img width="120" height="120" src="${icon}">
                        </div>
                        <div class="item item2">
                            <span class="">${main.temp}°</span><!-- Exibe temperatura atual -->
                        </div>
                        <div class="item item3">
                            <h4>City</h4>
                            <div class="content-wapper">
                                <div>🌐</div>
                                <div>${name}</div><!-- Exibe cidade -->
                            </div>
                        </div>  
                        <div class="item item5">
                            <h4>Pressure</h4>
                            <div class="content-wapper">
                                <div></div>
                                <div>${main.pressure}hPa</div><!-- Exibe pressão -->
                            </div>
                        </div>
                        <div class="item item4">
                            <h4>Country</h4>
                            <div class="content-wapper">
                                <div></div>
                                <div>${sys.country}</div><!-- Exibe país -->
                            </div>
                        </div>
                        <div class="item item6">
                            <h4>Wind</h4>
                            <div class="content-wapper">
                                <div>${wind.deg} Degrees 
                                Speed ${wind.speed}m/s</div><!-- Exibe velocidade do vento -->
                            </div>
                        </div>
                        <div class="item item7">
                            <h4>Description</h4>
                            <div class="content-wapper">
                                <div></div>
                                <div>${weather[0]['main']}</div><!-- Exibe descrição do clima -->
                            </div>
                        </div>
                        <div class="item item8">
                            <h4>Sensation</h4>
                            <div class="content-wapper">
                                <div></div>
                                <div>${main.feels_like}°</div><!-- Exibe sensação térmica -->
                            </div>
                        </div>  
                        <div class="item item9">
                            <h4>Humidity</h4>
                            <div class="content-wapper">
                                <div>💧</div>
                                <div>${main.humidity}%</div><!-- Exibe porcentagem de umidade -->
                            </div>
                        </div>
                        <div class="item item10">
                            <h4>Temperature</h4>
                            <div class="content-wapper">
                                <div>
                                    <i class="fa-solid fa-arrow-up" style="color: #cf0c0c;"></i> ${main.temp_max}°<!-- Exibe temperatura máxima -->
                                    <br/>
                                    <i class="fa-solid fa-arrow-down" style="color: #3881ff;"></i> ${main.temp_min}°<!-- Exibe temperatura mínima -->
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                    `);
                }
            }else{
                setCity(''); // Caso os dados do objeto 'sys' não sejam definidos, limpa o estado 'city'.
            }
            console.log(data); // Registra os dados recebidos da API no console.
        });
    }

  return (
    <div className="search"> {/* // Retorna a estrutura do componente 'Search'.*/}
        <div className='searchWeather'>
            <div className="container">
                <h2>Search the weather in any city in the world 🌎</h2>{/* Título do formulário de pesquisa.*/}
                <form onSubmit={(e)=>detectSearch(e)}>{/* Formulário de pesquisa com evento de envio. */}
                    <div className="input-group mb-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder={props.placeholder} //
                            onKeyUp={detectSearch} // Ao soltar tecla detectarBusca 
                            name="detectSearch" // nome detectarBusca
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit">Search</button>{/* Botão de pesquisa. */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {
            (city !== '')? /* Renderização condicional para exibir os dados do clima ou uma mensagem de 'Nenhum resultado'. */
                <div dangerouslySetInnerHTML={{__html: city}}/>:
                <div className='no-results' style={{padding:'10px'}}>No results</div>
        }
    </div>
  );
}

export default Search; // Exporta o componente 'Search' para ser utilizado em outros componentes ou arquivos.