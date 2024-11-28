import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { JX } from "../../lib/JX";
import ModalNovaRequisicao from "../Modal/NovaRequisicao";


function TableRequisicao() {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(()=>{
        carregaDados();
        
    },[])

    const carregaDados = async (e) => {
        let query = "SELECT CAB.NUNOTA, CAB.CODPARC,PAR.NOMEPARC "
        +"FROM TGFCAB CAB JOIN TGFPAR PAR ON CAB.CODPARC= PAR.CODPARC "
        +"WHERE CAB.STATUSNOTA = 'L' AND CODTIPOPER = 1000  "
        +"AND CAB.NUNOTA NOT IN (SELECT TOP 1 NUNOTAORIG FROM TGFVAR VA WHERE VA.NUNOTAORIG = CAB.NUNOTA) "
        
        
        try {
            const result = await JX.consultar(query);
            const formattedValues = result.map((item) => ({
              id: item.NUNOTA,
              nome: item.NOMEPARC,
              email: "teste@gmail.com",
              produto: "Fone de ouvido",
            }));
      
            setValues(formattedValues); // Atualiza o estado com os valores formatados
          } catch (error) {
            console.error('Erro ao carregar dados:', error);
          }
    }


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleButtonClick = (rowData) =>{
        
        setShowModal(true);
        setSelectedRow(rowData)
    }

    return (
        <div className="relative shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-700">Requisições</h2>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="block w-1/3 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <div className="overflow-x-auto max-h-[72vh] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nota</th>
                            <th scope="col" className="px-6 py-3">Solicitante</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((row, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4">{row.id}</td>
                                <td className="px-6 py-4">{row.nome}</td>
                                <td className="px-6 py-4">{row.email}</td>
                                <td className="px-6 py-4">{row.produto}</td>
                                <td className="px-6 py-4">

                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-1.5 flex items-center space-x-1"
                                    onClick={() => handleButtonClick(row)}
                                >
                                    <FaPlus />
                                    <span className="hidden sm:block"></span>
                                </button>

                                </td>
                            </tr>
                        ))}

                                        {showModal && (
                                                <ModalNovaRequisicao
                                                onClose={() => setShowModal(false)}
                                                rowData={selectedRow?.id}
                                                />
                                            )}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default TableRequisicao;
