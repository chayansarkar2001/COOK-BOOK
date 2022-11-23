import {useGlobalContext} from '../context'
import {BsHandThumbsUp} from 'react-icons/bs'
const Meal = ()=>{
  
  const {allmeals,loading,selectMeal,addToFavorites} = useGlobalContext()
  
  // console.log('type of allmeals',allmeals)
  
  if(loading){
    return <section className='section'>
      <h3>Loading...</h3>
    </section>
  }
  if(allmeals.length<1){
    return <section className="section">
      <h4>No Item Found</h4>
    </section>
  }
  return <section className="section-center">
    {allmeals.meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      return <article key={idMeal} className="single-meal" >
        <img src={image} className="img" onClick={()=>{selectMeal(idMeal,false)}}/>
        <footer>
          <h5>{title}</h5>
          <button className='like-btn' onClick={()=>{addToFavorites(idMeal)}}><BsHandThumbsUp /></button>
        </footer>
      </article>
    })}
  </section>
}
export default Meal