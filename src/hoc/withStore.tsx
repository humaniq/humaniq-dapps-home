import React, { useMemo } from 'react'

const withStore = (Store: any, Component: any) => ({ ...props }) => {
  const store = useMemo(() => {
    return new Store()
  }, [])

  return <Component store={ store } { ...props }/>
}

export default withStore