import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delAsync,  updateAsync } from './cartSlice'
import './Cart.css'

export function Cart () {
  const items= useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const handleChange=(e,id)=>{
    console.log(e.target.value);
    dispatch(updateAsync({id,change:{quantity:+e.target.value}}))
  }
  return (
    <div>
       <h1>Cart Items</h1>
      {items.map(item=>
     
        <div class='card'>
        <img src={item.thumbnail} alt={item.title} style={{ width: '100%' }} />
        <h1>{item.title} </h1>
        <p>Brand:{item.brand}</p>
        <p >Price:{item.price} </p>
        <p>Description:{item.description} </p>
        <div className='quantity'>
        Quantity
        <select  value={item.quantity} onChange={(e)=>handleChange(e,item)}>
           <option value={1}>1</option>
           <option value={2}>2</option>
           <option value={3}>3</option>
        </select>
        </div>
        <p>
          <button onClick={()=>dispatch(delAsync(item.id))}>Delete</button>
        </p>
      </div>

      )}
      <h1>Total:{items.reduce((acc,item)=>item.price*item.quantity+acc,0)}</h1>
    </div>
  )
}
