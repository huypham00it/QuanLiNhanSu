import React from 'react';

const Loading = () => {
    const l1 = {
        "--value": '1'
    }
    const l2 = {
        "--value": '2'
    }
    const l3 = {
        "--value": '3'
    }
    const l4 = {
        "--value": '4'
    }
    const l5 = {
        "--value": '5'
    }
    return (
        <div className="loading-container">
            <div className="loading">
                <div style={l1}></div>
                <div style={l2}></div>
                <div style={l3}></div>
                <div style={l4}></div>
                <div style={l5}></div>
            </div>
        </div>
    )
}

export default Loading;