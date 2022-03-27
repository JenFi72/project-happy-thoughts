import React, { useEffect, useState } from 'react'

import Footer from 'components/Footer'
import ThoughtForm from 'components/ThoughtForm'
import ThoughtItem from 'components/ThoughtItem';
import { roundToNearestMinutes } from 'date-fns';

const API_URL="https://happy-thoughts-technigo.herokuapp.com/thoughts"
const LIKES_URL =(thoughtId) =>
`https://happy-thoughts-technigo.herokuapp.com/thoughts/${thoughtId}/like`;


export const App = () => {

  const [thoughts, setThoughts] = useState([])
  const [newThought, setNewThought] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  fetchThoughts()
 }, []) 

  const fetchThoughts = () => {
  setLoading(true)
  fetch(API_URL)
  .then((res) => res.json())
  .then((data) => setThoughts(data))
  .finally(() => setLoading(false))  
  }

 const handleFormSubmit = (event) => {
 event.preventDefault()
 }

 const options = { 
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({ message: "hello world" }),
 }

 fetch(API_URL, options)
 .then((res) => res.json())
 .then((data) => {
 fetchThoughts()
 setNewThought('') 
 })

const handleLikesIncrease = (thoughtId) => {
const options = {
 method: 'POST',
  }

  fetch(LIKES_URL(thoughtId), options)
  .then((res) => res.json())
   .then((data) => {
 fetchThoughts()
   })

 }



  return (
    <div className="container">
  
      <ThoughtForm
        onFormSubmit={handleFormSubmit}
        newThought={newThought}
        setNewThought={setNewThought}
      />

      {thoughts.map((thought) => (
      <ThoughtItem
        key={thoughts._id}
        thought={thought}
        onLikesIncrease={handleLikesIncrease}
      />
      ))}
    </div>
 





 

);
};