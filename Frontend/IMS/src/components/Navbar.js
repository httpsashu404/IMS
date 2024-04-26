import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      <navBar className="navbar navbar-expand-lg bg-secondary border-bottom">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/"><b>{props.title}</b></a>
              </li>
            </ul>
            <form action='https://www.google.com/search' className="d-flex" role="search" autoComplete='off'>
              <input className="form-control me-2" name='q' type="search" placeholder="Search...." aria-label="Search" />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form>
          </div>
        </div>

      </navBar>
    </div>
  )
}
