import { useEffect, useState } from 'react';
import { JX } from "../../lib/JX";
import FormTrocar from '../Forms/FormTrocar';


function TableItens({nota, situacao}){

    const [itens, setItens] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentComponent, setCurrentComponent] = useState("table");
    const [refresh, setRefresh] = useState(null);

    useEffect(()=>{
        mostrarItens();
        setRefresh(false);
    },[refresh])

 

    const mostrarItens = async (e) =>{
        let query = "SELECT ITE.CODPROD, PRO.DESCRPROD, ITE.QTDNEG, ITE.SEQUENCIA "
        +" FROM TGFITE ITE, TGFPRO PRO "
        +"WHERE PRO.CODPROD=ITE.CODPROD AND NUNOTA = "+nota

        
        try {
            const result = await JX.consultar(query);
            const itensArray = result.map((item) => ({
              codprod: item.CODPROD,
              nome: item.DESCRPROD,
              qtd: item.QTDNEG,
              sequencia: item.SEQUENCIA,
              nota:nota
            }));
      
            setItens(itensArray); 
          } catch (error) {
            console.error('Erro ao carregar dados:', error);
          }
    }

    const trocarItem = (rowData) =>{
        console.log(rowData);
        setSelectedRow(rowData);
        setCurrentComponent("form");


    }


    return (
        <>
            {currentComponent === "table" && (
                <div className="overflow-x-auto max-h-[72vh] overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nota</th>
                                <th scope="col" className="px-6 py-3">Cod. Produto</th>
                                <th scope="col" className="px-6 py-3">Produto</th>
                                <th scope="col" className="px-6 py-3">Quantidade</th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map((row, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50">
                                  
                                    <td className="px-6 py-4">{nota}</td>
                                    <td className="px-6 py-4">{row.codprod}</td>
                                    <td className="px-6 py-4">{row.nome}</td>
                                    <td className="px-6 py-4">{row.qtd}</td>
                                    <td className="px-6 py-4 hidden">{row.sequencia}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            className={`focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-1.5 flex items-center space-x-1 ${situacao ===1 ? "hidden":""}`}
                                            onClick={() => trocarItem(row)}
                                        >
                                            <span className="hidden sm:block">Trocar</span>
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {currentComponent === "form" && (
                <FormTrocar
                    
                    prodTrocado={selectedRow} 
                    onBack={() => {
                        setCurrentComponent("table");
                        setRefresh(true); // Atualiza o estado para disparar o useEffect
                    }}
                />
            )}
        </>
    );
};

export default TableItens;