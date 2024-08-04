import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";

function Form({route,method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoadig] = useState(false)
    const navigate = useNavigate()
    
    const name = method === "login" ? "Login" : " Register" ;

    const handleSubmit = async (e) =>{
        setLoadig(true);
        e.preventDefault()

        try { 
            const res = await api.post(route,{username,password});
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            }
            else{
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        }finally{
            setLoadig(false);
        }
    };

    return <form onSubmit = {handleSubmit} className="form-container">
       <div className="container rounded border bg-info-subtle border-primary my-5">
          <div className=" row text-center bg-info border-bottom border-primary"><h1 className="text-dark fst-italic">{name}</h1></div>
          <div className=" col-6">
          <div class="input-group my-3">
             <span className="input-group-text bg-info border border-info " id="inputGroup-sizing-default">Username</span>
             <input type="text" className="form-control border border-info" value={username} onChange={(e)=> setUsername(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
         </div>
         <div class="input-group my-3">
             <span className="input-group-text bg-info border border-info" id="inputGroup-sizing-default">Password</span>
             <input type="password" className="form-control border border-info" value={password} onChange={(e)=> setPassword(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
         </div>
         <button type="submit" name='button' className="form-button btn btn-success my-3">{name}</button>
          </div>

      </div>
    </form>
}

export default Form;