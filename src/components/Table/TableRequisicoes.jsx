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
        let query = " SELECT CAB.NUNOTA, CAB.NUMNOTA, CAB.CODPARC,PAR.NOMEPARC, EMP.NOMEFANTASIA,CUS.DESCRCENCUS "
        +"  ,CASE WHEN NAT.CODNAT = 0 THEN 'SEM NATUREZA' ELSE NAT.DESCRNAT END AS DESCRNAT "
        +" FROM TGFCAB CAB JOIN TGFPAR PAR ON CAB.CODPARC= PAR.CODPARC "
        +" JOIN TSIEMP EMP ON CAB.CODEMP = EMP.CODEMP"
        +" JOIN TGFNAT NAT ON CAB.CODNAT = NAT.CODNAT "
        +" JOIN TSICUS CUS ON CUS.CODCENCUS = CAB.CODCENCUS "
        +" WHERE CAB.STATUSNOTA = 'L' AND CODTIPOPER = 1000  "
        +" AND (CAB.NUNOTA NOT IN (SELECT TOP 1 NUNOTAORIG FROM TGFVAR VA WHERE VA.NUNOTAORIG = CAB.NUNOTA) "
        +" OR CAB.NUNOTA IN (SELECT TOP 1 NUNOTA FROM  AD_ASSINATURAALMOX WHERE AD_ASSINATURAALMOX.NUNOTA = CAB.NUNOTA)) ";

        
        
        try {
            const result = await JX.consultar(query);
            const formattedValues = result.map((item) => ({
              id: item.NUNOTA,
              numnota:item.NUMNOTA,
              codparc:item.CODPARC,
              nome: item.NOMEPARC,
              empresa:item.NOMEFANTASIA,
              natureza: item.DESCRNAT,
              centro: item.DESCRCENCUS,
            }));
      
            setValues(formattedValues); 
          } catch (error) {
            console.error('Erro ao carregar dados:', error);
          }
    }

    const filterData = (term) => {
        return values.filter(
          (item) =>
            item.id.toString().includes(term) || 
            item.nome.toLowerCase().includes(term.toLowerCase()) 
        );
      };

      const solicitacoesPesquisadas = filterData(searchTerm);

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
                            <th scope="col" className="px-6 py-3">Num. Único</th>
                            <th scope="col" className="px-6 py-3">Num. Nota</th>
                            <th scope="col" className="px-6 py-3">Cód. Parc.</th>
                            <th scope="col" className="px-6 py-3">Solicitante</th>
                            <th scope="col" className="px-6 py-3">Empresa</th>
                            <th scope="col" className="px-6 py-3">Natureza</th>
                            <th scope="col" className="px-6 py-3">Centro</th>
                            <th scope="col" className="px-6 py-3"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoesPesquisadas.map((row, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4">{row.id}</td>
                                <td className="px-6 py-4">{row.numnota}</td>
                                <td className="px-6 py-4">{row.codparc}</td>
                                <td className="px-6 py-4">{row.nome}</td>
                                <td className="px-6 py-4">{row.empresa}</td>
                                <td className="px-6 py-4">{row.natureza}</td>
                                <td className="px-6 py-4">{row.centro}</td>
                                <td className="px-6 py-4">

                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-1.5 flex items-center space-x-1"
                                    onClick={() => handleButtonClick(row)}
                                >
                                    
                                    <span className="hidden sm:block">Alterar</span>
                                </button>

                                </td>
  

                            </tr>
                        ))}

                                        {showModal && (
                                                <ModalNovaRequisicao
                                                onClose={() => setShowModal(false)}
                                                rowData={selectedRow?.id}
                                                codparc={selectedRow?.codparc}
                                                />
                                            )}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default TableRequisicao;
