import { useNavigate } from "react-router-dom"
import "./logout.css"
export default function Logout(){
    const navigate=useNavigate()
    const handlelogout=()=>{
        navigate('/');
    }
    return (
      <div>
        <button type="button" className="logout-button" onClick={handlelogout}>
          Logout
        </button>
      </div>
    );
}