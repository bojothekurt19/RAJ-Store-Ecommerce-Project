import '../index.css'

export default function LoadingBox() {
  return (
    <>
      <div className="loading-design">
        <img src="raj.png" className="logo-loading" />

        <div className="spinner-all">
          <div
            className="spinner-grow"
            role="status"
            style={{ animationDuration: '3s' }}
          ></div>
        </div>
      </div>
    </>
  )
}
