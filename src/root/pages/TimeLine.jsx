import { Link } from "react-router-dom"
import Challenges from "./Challenges"
import ProfileHeader from "../../components/helper/ProfileHeader"
import TopChallenges from "./TopChallenges"






const TimeLine = ({user}) => {
  return (
    <>
          <ProfileHeader user={user} title={"CHALLENGE TIMELINE"}/>
          <TopChallenges user={user}/>
    </>

  )
}

export default TimeLine