function Search(props) {

    function detectSearch(){
        let currentValue = document.querySelector('input[name=detectSearch').value;
        // alert(currentValue);
        /*
            fazer requisicao API depois
        */
    }
  return (
    <div className="search">
        <div className="container"> 
            <h2>Search for the city you want to know the forecast</h2>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder={props.placeholder} onKeyUp={detectSearch} name="detectSearch" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                
                <div class="input-group-append">
                    <button class="btn btn-success" type="button">Search</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Search;