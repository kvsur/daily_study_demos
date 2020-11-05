// import React from 'react'

export default function composeProviders(...providers) {
    return ({ children}) => providers.reduce((pre, { provider: Provider, value }) => <Provider value={value}>{pre}</Provider>, children)
}
