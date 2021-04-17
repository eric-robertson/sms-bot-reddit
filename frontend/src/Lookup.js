import React, { useState } from 'react'
import * as API from './api'

async function requestResults ( search, callback ) {
    if ( search.length < 10) callback(false)
    else if ( search.length != 10 ) callback([])
    else {
        let data = await API.request('lookupNumber', { phone : search  })
        callback( data.data )
    }
}   

function resultListing ( data, click ) {
    let d_min =  data['trigger-time'] - (new Date().getTimezoneOffset() * 60) ;

    let hour = ("" + Math.floor(d_min / ( 60 * 60))).padStart(2,'0')
    let min = ("" + Math.floor((d_min % (60 * 60))/60)).padStart(2, '0')

    let textContent = '';
    if (data.rule.type == 'reddit'){
        textContent = `Top image from r/${data.rule.subreddit}`
    }
    if (data.rule.type == 'raw'){
        textContent = `Raw message "${data.rule.msg}"`
    }

    return <div className='numberResult' onMouseUp={click}>
        <div className='phoneNumber' >
            ({data['phone-number'].substring(0,3)})-{data['phone-number'].substring(3,6)}-{data['phone-number'].substring(6)}
        </div>
        <div className='time'>
            Sends @ {hour}:{min}
        </div>
        <div className="textContent">
            {textContent}
        </div>
    </div>
}

export default () => {
    
    const [text, setText] = useState('')
    const [results, setResults] = useState(false)

    let classes = ['search']
    if ( text.length > 0 ) classes.push('active')

    let changeText = (e) => {
        setText(e.target.value)
        requestResults(e.target.value, setResults )
    }

    let remove = async ( id )=> {
        await API.request('deleteRule', { id : id  })
        requestResults(text, setResults )
    }


    return <div>
        <input className={classes.join(' ')} placeholder="Lookup by phone-number" onChange={changeText} />
        <div className="resultsLabel">
            Click to remove a rule
        </div>
        { results && <div>
            {results.map((v,key)=><div key={key} style={{marginBottom: 20}}>
                {resultListing(v, () => remove(v.id))}
            </div>)}
            {results.length == 0 ? <div>No rules for that number</div> : ''}
        </div>       } 
        
    </div>

}