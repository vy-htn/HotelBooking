import React from "react";
import '../css/guestinfo.css';
function GuestInfo(){
    return(
        <div>
            
          <h2>Hotel Booking Form</h2>
          <div className="form-container">
          <form className="guest-details">
            <fieldset>
              <legend>Guest Information:</legend>

              First name:<br/>
              <input type="text" name="firstname"/><br/>
              Last name:<br/>
              <input type="text" name="lastname"/><br/>
              Email:<br/>
              <input type="text" name="email"/><br/>
              Phone:<br/>
              <input type="text" name="phone"/><br/>
              Personal requests:<br/>
              <textarea name="requests" rows="4" cols="50"></textarea>
            </fieldset>
            <br/>
          
            <br/>
            <input type="submit" value="Continue"/>
          </form>
          <form className="stay-details">
              <legend>Stay details:</legend>
          </form>
          </div>
        </div>
    );
}
export default GuestInfo;