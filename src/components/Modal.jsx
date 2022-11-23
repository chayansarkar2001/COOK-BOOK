import {useGlobalContext} from "../context"
const Modal = ()=>{
  const {selectedMeal,setShowModal} = useGlobalContext()
  const {strMealThumb:image,strMeal:title,strSource:source,strInstructions:text,strYoutube:youtube} = selectedMeal
  return (
    <aside onClick={()=>{setShowModal(false)}} className="modal-overlay">
      <div className="modal-container outline-primary" onClick={(e)=>{e.stopPropagation()}} >
        <img src={image} alt={title} className='img modal-img' />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{text}</p>
          <a href={source} target='_blank'>Original Source</a>
          <a href={youtube} target='_blank'>Youtube</a>
          <button className="btn btn-hipster close-btn" onClick={()=>{setShowModal(false)}}>Close</button>
        </div>
      </div>
    </aside>
  )
}
export default Modal