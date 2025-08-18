import React from 'react'

const LoadingOverlay = () => {
  return (
    <div style={{
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(255,255,255,0.7)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <div className="spinner" />
  </div>
  )
}

export default LoadingOverlay