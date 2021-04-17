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

        console.log('New rule added')
    }

    return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', height: '100%'}}>
            <label>
                Phone number:
                <input type="text" name="phoneNum" onChange={handleChange} />
            </label>

            <label>
                <input type="text" name="hour" onChange={handleChange} />
                :
                <input type="text" name="minute" onChange={handleChange} />

                <select name="isAM" id="dropdown" onChange={handleChange}>
                    <option value={true}>AM</option>
                    <option value={false}>PM</option>
                </select>
            </label>

            <select name="msgType" id="msgType" onChange={handleChange} >
                <option value="raw">Raw Message</option>
                <option value="reddit">Subreddit</option>
            </select>

            <label>
                Msg Text/Subreddit
                <input type="text" name="txtMsg" onChange={handleChange} />
            </label>

            <button onClick={submitForm}>
                Submit
            </button>

            <span>
                {JSON.stringify(state)}
            </span>
        </div>
    )
}
