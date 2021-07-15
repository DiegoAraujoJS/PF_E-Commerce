import React from 'react'
import ClassCards from '../classCards/ClassCards'
import "./ClassConteiner.css"

export default function ClassContainer() {
    return (
        <div className="ContainerGral">
            <div className="containerCategorias">
             <div className="py-3">
          <h5 className="font-weight-bold">Categorias</h5>
          <ul className="list-group">
              <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">  Primaria <span className="badge badge-primary badge-pill">328</span> </li>
              <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Secundaria <span className="badge badge-primary badge-pill">112</span> </li>
              <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Terciario <span className="badge badge-primary badge-pill">32</span> </li>
              <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Universitario <span className="badge badge-primary badge-pill">48</span> </li>
          </ul>
          <div className="py-3">
          <h5 className="font-weight-bold"> Edad</h5>
          <form className="brand">
              <div className="form-inline d-flex align-items-center py-1"> <label className="tick">6-9<input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-1"> <label className="tick">9-12 <input type="checkbox" /> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-1"> <label className="tick">12-15 <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-1"> <label className="tick">15-17 <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-1"> <label className="tick">18- <input type="checkbox"/> <span className="check"></span> </label> </div>
          </form>
      </div>
      <div className="py-3">
          <h5 className="font-weight-bold">Calificación</h5>
          <form className="rating">
              <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star">🌟</span><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <input type="checkbox"/> <span className="check"></span> </label> </div>
              <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <input type="checkbox"/> <span className="check"></span> </label> </div>
          </form>
      </div>



      </div>
      </div>
      

            {/* <SearchBar /> */}
            <ClassCards />
        </div>
    )
}
