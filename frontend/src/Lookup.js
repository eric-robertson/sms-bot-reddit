import React, { useState } from 'react'
import * as API from './api'

const data = [{"phone-number":"9736108434","trigger-time":1,"id":"e1ec4004c6b34729b819a8ff8a3d3a47","rule":{"type":"reddit","subreddit":"me_irl"}}]

async function requestResults ( search, callback ) {
    if ( search.length != 10 ) return;
    let data = await API.request('lookupNumber', { phone : search  })
    callback( data.data )
}   

function resultListing ( data ) {
    return <div className='numberResult'>
        <div className='phoneNumber' >
            #{data['phone-number']}
        </div>
        <div>
            {data['trigger-time']}
        </div>
        {JSON.stringify(data)}
    </div>
}

export default () => {
    
    const [text, setText] = useState('')
    const [results, setResults] = useState(data)

    let classes = ['search']
    if ( text.length > 0 ) classes.push('active')

    let changeText = (e) => {
        setText(e.target.value)
        requestResults(e.target.value, setResults )
    }

    return <div >
        <input className={classes.join(' ')} placeholder="Lookup by phone-number" onChange={changeText} />
        <div>
            {results.map((v,key)=><div key={key}>
                {resultListing(v)}
            </div>)}
        </div>        

    </div>

}