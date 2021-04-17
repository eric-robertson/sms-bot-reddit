import React, { useState } from 'react'

const AddPhone = () => {
    const [state, setState] = useState({'isAM': true, 'msgType': 'Raw'})

    const handleChange = ({ target }) => setState({ ...state, [target.name]: target.value })

    const submitForm = () => {
        console.log('Submitting form')
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
                <option value="Raw">Raw Message</option>
                <option value="Subreddit">Subreddit</option>
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

export default AddPhone