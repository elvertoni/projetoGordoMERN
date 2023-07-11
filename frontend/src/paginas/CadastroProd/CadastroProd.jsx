import React, { useState } from 'react';
import './CadastroProd.css';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import axios from 'axios';

function CadastroProd() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');



    function EnviandoBancoProd() {



        const formData = {
            name: document.getElementById('nameProd').value,
            descricao: document.getElementById('descricaoProd').value,
            preco: document.getElementById('precoProd').value,
            qtd: document.getElementById('qtdProd').value,
            imgProduto: document.getElementById('urlProd').value
        };



        axios.post('http://localhost:3005/produtos', formData)
            .then(response => {

                alert('Dados enviados com sucesso')
                setName('');
                setDescription('');
                setPrice('');
                setQuantity('');
                setImageUrl('');

                // Faça qualquer manipulação adicional ou redirecionamento após o envio dos dados
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
    }

    return (
        <div className="containerCadProd">
            <div className="cardCadProd">
                <div className="cabecalhoCadProd">
                    <h1 className='iconCadProd'><FontAwesomeIcon icon={faKeyboard} /></h1>
                    <h1 className='iconCadProd'>Cadastro de Produtos</h1>
                    <div className='centralizeButton'>
                        <div className="buttonCadProd">
                            <NavLink to="/" className="button-link">Produtos</NavLink>
                        </div>
                    </div>
                </div>
                <div className="input-groupCadProd">
                    <div className="input-boxCadPro">
                        <label htmlFor="nameProd">Nome do Produto</label>
                        <input
                            id="nameProd"
                            type="text"
                            name="nameProd"
                            placeholder="Digite o nome do Produto"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-boxCadPro">
                        <label htmlFor="descricaoProd">Insira a descrição</label>
                        <input
                            id="descricaoProd"
                            type="text"
                            name="description"
                            placeholder="Digite a Descrição"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="input-boxCadPro">
                        <label htmlFor="precoProd">Insira o valor</label>
                        <input
                            id="precoProd"
                            type="number"
                            name="precoProd"
                            placeholder="Insira o Valor"
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="input-boxCadPro">
                        <label htmlFor="qtdProd">Insira a quantidade</label>
                        <input
                            id="qtdProd"
                            type="number"
                            name="qtdProd"
                            placeholder="Insira a Quantidade"
                            required
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="input-boxCadPro">
                        <label htmlFor="urlProd">Insira a URL da Imagem</label>
                        <input
                            id="urlProd"
                            type="url"
                            name="urlProd"
                            placeholder="Insira a URL da imagem"
                            required
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </div>



                    <div className="continue-button">
                        <button type="submit" onClick={EnviandoBancoProd} > Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroProd;