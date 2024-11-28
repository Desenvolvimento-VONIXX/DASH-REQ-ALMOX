import React, { useRef, useState,useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { JX } from "../../lib/JX";
import { get } from "http";
import FormNovoItem from "../Forms/FormNovoItem";




function FormTrocar({item, onBack}) {

    const [searchTerm, setSearchTerm] = useState("");

 

    return (
        <>
            <form>
                <div className="flex space-x-4 mt-2">
                <div className="w-1/3">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Cód. Produto
                        </label>
                        <input
                            disabled
                            type="text"
                            value={item?.codprod}
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                        />
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Produto a ser Removido
                        </label>
                        <input
                            disabled
                            type="text"
                            value={item?.nome}
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                        />
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                            Quantidade
                        </label>
                        <input
                        disabled
                        value={item?.qtd}
                            type="text"
                            id="small-input-2"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                </div>

                

                <FormNovoItem />
               
                <button
                            type="button"
                            onClick={onBack}
                            className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Cancelar
                        </button>
                <button type="button" 
                onClick={() => setShowFormItens(true)}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5"> Salvar</button>

            </form>

        </>
    )
}

export default FormTrocar;

