import React, { useState } from 'react'

const style = {
    container : {
        width: 400,
    },
    result : {

    }
}

export default () => {
    
    const [text, setText] = useState('')

    let classes = ['search']
    if ( text.length > 0 ) classes.push('active')

    return <div style={style.container}>
        <input className={classes.join(' ')} placeholder="Lookup by phone-number" onChange={e=>setText(e.target.value)} />
        <div style={style.result}>
            a
        </div>        

    </div>

}