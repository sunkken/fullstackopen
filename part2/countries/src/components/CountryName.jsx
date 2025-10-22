const CountryName = ({ name, showInfo }) => {
    return (
        <li>
            {name} 
            <button onClick={showInfo} style={{marginLeft: '5px'}}>Show</button>     
        </li>
    )
}

export default CountryName