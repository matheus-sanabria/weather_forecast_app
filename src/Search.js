function Search(props) {

    function detectSearch(e){
        e.preventDefault();
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
            if(sys !== undefined)
                console.log(sys.country);
            if(weather !== undefined)
                console.log(weather[0]['description']);
            console.log(data)
        })
    }
  return (
    <div className="search">
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
        </div>
    </div>
  );
}

export default Search;