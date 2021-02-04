const axios = require('axios');
let defaults = require('./defaults');

const productsResource = {
    all: () => {
        return axios({
            ...defaults,
            method: 'GET'
        })
    }, 
    detail: (idProduct) => {
        return axios({
            ...defaults,
            method: 'GET',
            url: `${url}/${idProduct}`
        })
    }
}