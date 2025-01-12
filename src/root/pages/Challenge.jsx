import React from 'react'
import { useParams } from 'react-router-dom';

const Challenge = () => {

    const  challenge_id  = useParams().id;

  return (
    <div>challenge</div>
  )
}

export default Challenge