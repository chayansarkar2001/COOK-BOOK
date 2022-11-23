import {useState} from "react"
import {useGlobalContext} from "../context"
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const Search = ()=>{
  const [text,setText] = useState('')
  const {setSearchTerm,fetchMeals} = useGlobalContext();
  
  function handleChange(event) {
    setText(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if(text){
      setSearchTerm(text)
      setText('')
    }
  }
  function handleSupriseBtn(){
    setSearchTerm('')
    setText('')
    fetchMeals(randomMealUrl)
  }
  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter your meal' value={text} onChange={handleChange} className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster' onClick={handleSupriseBtn}>Suprise Me!</button>
      </form>
    </header>
  )
}
export default Search