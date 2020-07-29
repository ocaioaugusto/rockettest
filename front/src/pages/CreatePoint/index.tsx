import React, { useEffect, useState, ChangeEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./CreatePoint.css";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import api from "../../services/api";
import Axios from "axios";

interface IDataItem {
  id: number;
  title: string;
  image_url: string;
}

interface IUf {
  id: number;
  sigla: string;
  nome: string;
}

interface ICity {
  id: number;
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<IDataItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  })
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [uf, setUf] = useState<IUf[]>();
  const [selectedUf, setSelectedUf] = useState("");
  const [cities, setCities] = useState<ICity[]>();
  const [selectedCity, setSelectedCity] = useState("");
  const [initialMapPosition, setInitialMapPosition] = useState<
    [number, number]
  >([0, 0]);
  const [selectedMapPosition, setSelectedMapPosition] = useState<
    [number, number]
  >([0, 0]);

  useEffect(() => {
    api.get("items").then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialMapPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    ).then((res) => setUf(res.data));
  }, []);

  useEffect(() => {
    if (selectedUf) {
      Axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      ).then((res) => setCities(res.data));
    }
  }, [selectedUf]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value})
  };

  const handleSelectItem = (id: number) => {
    setSelectedItem([...selectedItem, id ])
  }

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
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço do mapa</span>
          </legend>
          <Map
            center={initialMapPosition}
            zoom={15}
            onClick={(e: LeafletMouseEvent) =>
              setSelectedMapPosition([e.latlng.lat, e.latlng.lng])
            }
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedMapPosition} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedUf(e.target.value)
                }
              >
                <option value="0">Selecione</option>
                {uf &&
                  uf.map((state: IUf) => (
                    <option value={state.id}>{state.nome}</option>
                  ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCity(e.target.value)
                }
              >
                <option value="0">Selecione</option>
                {cities &&
                  cities.map((city: ICity) => (
                    <option value={city.id}>{city.nome}</option>
                  ))}
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
            {items.map((item) => (
              <li 
                className={selectedItem.includes(item.id) ? "selected" : ""} 
                key={item.id} 
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CreatePoint;
