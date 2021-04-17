import React, { useState } from 'react'
import * as API from './api'

export default () => {
    const [state, setState] = useState({'isAM': true, 'msgType': 'raw'})
    const handleChange = ({ target }) => setState({ ...state, [target.name]: target.value })

    const submitForm = async () => {
        // Calculate number of seconds from hours/mins/am
        let numHours = (state.isAM === true) ? parseInt(state.hour) : parseInt(state.hour) + 12
        let numSeconds =  numHours * 60 * 60
        numSeconds += parseInt(state.minute) * 60

        let d = new Date();
        d.setHours(0); d.setMinutes(0); d.setSeconds(numSeconds);
        numSeconds = d.getUTCHours() * (60 *60) + d.getUTCMinutes() * (60) 

        // Create payload based on reddit/raw type
        let payload = { type: state.msgType }
        
        if (state.msgType === 'raw')
            payload.msg = state.txtMsg
        else
            payload.subreddit = state.txtMsg

        // Make API call
        let data = await API.request('createRule', {
            number: state.phoneNum,
            time: numSeconds,
            payload
        })

        alert( 'New rule added!' )
        window.location.reload();
    }

    return (
        <div style={{display: 'relative', paddingTop: 200, width: 600, margin: 'auto'}}>
        <div style={{fontSize: 15, color: 'grey', marginTop: 40}}>
            Enter a phone number and an aproximate time for message to be sent
            </div>
            <div>
                <input className="phone-box" placeholder="Phone Number" type="text" name="phoneNum" onChange={handleChange} />
                <input  className="time-box" type="text" name="hour" onChange={handleChange} placeholder='01' />
                :
                <input   className="time-box"type="text" name="minute" onChange={handleChange} placeholder='23'  />

                <select className='dropdown' name="isAM" id="dropdown" onChange={handleChange}>
                    <option value={true}>AM</option>
                    <option value={false}>PM</option>
                </select>
            </div>
            <div style={{fontSize: 15, color: 'grey', marginTop: 40}}>
            Send either a raw message or the top post from a given subreddit
            </div>
            <div style={{margin: 20 }}>
                <select className='dropdown' name="msgType" id="msgType" onChange={handleChange} >
                    <option value="raw">Raw Message</option>
                    <option value="reddit">Subreddit</option>
                </select>
            </div>
            <div>
                {state.msgType=='raw' ? 
                    <textarea className='textfield' placeholder="Message to be sent" type="text" name="txtMsg" onChange={handleChange} />
                    : <input  className='textfield2' placeholder="r/me_irl" type="text" name="txtMsg" onChange={handleChange} />
                }
            </div>

            <button onClick={submitForm} className="button">
                Create Rule!
            </button>

        </div>
    )
}
