import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./CreatePoint.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        {/* <img src={logo} alt="" /> */}
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço do mapa</span>
          </legend>
          <Map center={[-23.5407043, -46.6419712]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-23.5407043, -46.6419712]} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" />
              <span>Teste</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CreatePoint;
