import React, {useContext,useEffect,useState} from 'react';
const AppContext = React.createContext();
import axios from 'axios';


const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' 
const AppProvider = ({children})=> {
  const [allmeals,setMeals]=useState([])
  const [loading,setLoading] = useState(false)
  const [searchTerm,setSearchTerm]= useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal,setSelectedMeal] = useState(null)
  const [favorites,setFavorites] = useState(getFavoritesFromLocalStroage)
  const fetchMeals = async (url)=>{
    setLoading(true)
    try {
      const {data} = await axios(url)
      console.log('data of data:',data)
      if(data.meals !== null){
        setMeals(data)
        
      }else{
        setMeals([])
      }
    }
    catch (error) {
      console.log("error",error.response)
    } 
    setLoading(false)
    
  }
function getFavoritesFromLocalStroage() {
  let favorites = localStorage.getItem('favorites')
  if(favorites){
    favorites = JSON.parse(favorites)
  }else{
    favorites = []
  }
  return favorites
}
function addToFavorites(id) {
  let present = favorites.find((el)=>el.idMeal===id)
  if(present) return
  const new_meal= allmeals.meals.find((el)=>el.idMeal===id)
  const updatedFavorites = [...favorites,new_meal]
  setFavorites(updatedFavorites)
  localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
}
function removeFromFavorites(id) {
  const updatedFavorites = favorites.filter((el)=>el.idMeal!==id)
  setFavorites(updatedFavorites)
  localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
}
function selectMeal(id,favorites_item){
  let meal;
  if(favorites_item){
    meal = favorites.find((el)=>el.idMeal===id)
  }else{
    meal = allmeals.meals.find((el)=>el.idMeal===id)
  }
  setSelectedMeal(meal)
  setShowModal(true)
}
  useEffect(()=>{
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  },[searchTerm])
  
  return(
    <AppContext.Provider value={{allmeals,loading,setSearchTerm,fetchMeals,showModal,setShowModal,selectedMeal,selectMeal,addToFavorites,removeFromFavorites,favorites}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
export {AppContext,AppProvider}