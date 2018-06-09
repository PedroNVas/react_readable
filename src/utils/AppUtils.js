import SubjectIcon from '@material-ui/icons/Subject'
import React from 'react'
import react from '../static/images/react.png'
import redux from '../static/images/redux.png'
import udacity from '../static/images/udacity.png'

export function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1)
}

export function getDate (timestamp) {
  return new Date(timestamp * 1000).toDateString().slice(0, 10).replace(/-/g, '')
}

export function getTime (timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString()
}

export function firstLetter (string) {
  return string[0].toUpperCase()
}

export function uuid () {
  let uuid = '', i, random
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}

export const categoryLogo = (category, height, logoStyle) => {
  const pixelHeight = `${height}px`
  switch (category) {
    case 'react':
      return <img src={react} height={pixelHeight} alt='Still React logo' style={logoStyle} />

    case 'redux':
      return <img src={redux} height={pixelHeight} alt='Still React logo' style={logoStyle} />

    case 'udacity':
      return <img src={udacity} height={pixelHeight} alt='Still Udacity logo' style={logoStyle} />

    case 'all':
    default:
      return <SubjectIcon style={{...logoStyle, fontSize: (height - 5)}} />
  }
}