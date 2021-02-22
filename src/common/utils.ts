'use strict'
import { nanoid } from 'nanoid'

function getRandomId() : string{
    return nanoid();
}

export {
    getRandomId
}