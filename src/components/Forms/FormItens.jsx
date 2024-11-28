import React, {  useState,useEffect } from "react";
import Select from "react-select";
import { JX } from "../../lib/JX";




function FormItens({nota}) {

    const [itens, setItens] = useState([]); 
    const [codprod, setCodprod] = useState([]);
    const [listaProdutos, setLista] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [selectedCodprod, setSelectedCodprod] = useState(null); 
    
    useEffect(() => {
      mostrarItens(); 
    }, []);
  
    const mostrarItens = async () => {
      const query = " SELECT PRO.CODPROD, PRO.DESCRPROD, PRO.CODVOL "
      +" ,(SELECT ROUND(ENTRADASEMICMS,2) FROM TGFCUS WHERE CODPROD = PRO.CODPROD AND CODEMP =1  "
      +" AND DTATUAL = (SELECT MAX(DTATUAL) FROM TGFCUS WHERE CODPROD = PRO.CODPROD AND CODEMP =1 )) AS VALORUNIT "
      +" FROM TGFPRO PRO  "
      +" WHERE USOPROD IN ('B','I','C') AND ATIVO = 'S' "
      +" AND PRO.CODPROD = (SELECT TOP 1 CODPROD FROM TGFCUS WHERE TGFCUS.CODPROD = PRO.CODPROD) ";
  
      try {
        const result = await JX.consultar(query); 
        console.log("RESULT = ", result);
  
        // Itens com nomes
        const itensArray = result.map((item) => ({
          value: item.CODPROD,
          label: item.DESCRPROD,
        }));
  
        // Itens apenas com códigos
        const codProdArray = result.map((item) => ({
          value: item.CODPROD,
          label: item.CODPROD,
        }));
        const listaProdutos = result.map((item) => ({
            CODPROD: item.CODPROD,
            DESCRPROD: item.DESCRPROD,
            CODVOL: item.CODVOL,
            VALORUNIT:item.VALORUNIT
        }));


        setCodprod(codProdArray);
        setItens(itensArray); 
        setLista(listaProdutos);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
  
    // Atualiza ambos os selects ao mudar o código
    const handleCodprodChange = (selectedOption) => {
      setSelectedCodprod(selectedOption); // Atualiza o código selecionado
      setSelectedProduct(itens.find((item) => item.value === selectedOption?.value) || null); // Sincroniza com o produto
      console.log("Código selecionado:", selectedOption);
    };
  
    // Atualiza ambos os selects ao mudar o produto
    const handleProductChange = (selectedOption) => {
      setSelectedProduct(selectedOption); // Atualiza o produto selecionado
      setSelectedCodprod(codprod.find((item) => item.value === selectedOption?.value) || null); // Sincroniza com o código
      console.log("Produto selecionado:", selectedOption);
    };


    const salvarDados = async (e) =>{

        let dadosIte = [];

        dadosIte.push({
            CODEMP:1,
            NUNOTA:2580720,
            CODPROD:5022056,
            CODLOCALORIG:1140000,
            CODVOL:"UN",
            RESERVA:"S",
            ATUALESTOQUE:1,
            QTDNEG:1
        })

       const result = await JX.salvar(dadosIte[0],"ItemNota",[{}]);
       console.log("JX.SALVAR=",result)

    }
  
    return (
      <>
        <form>
          <div className="flex space-x-4 mt-2">
            {/* Select de Código */}
            <div className="w-1/3">
              <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                Cód. Produto
              </label>
              <Select
                options={codprod} 
                value={selectedCodprod} // Vincula ao estado
                onChange={handleCodprodChange} 
                placeholder="Digite para buscar..." 
                isClearable 
              />
            </div>
  
            {/* Select de Produto */}
            <div className="w-1/3">
              <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                Produto Trocado
              </label>
              <Select
                options={itens} 
                value={selectedProduct} // Vincula ao estado
                onChange={handleProductChange} 
                placeholder="Digite para buscar..." 
                isClearable 
              />
            </div>
  
            {/* Campo de Quantidade */}
            <div className="w-1/3">
              <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                Quantidade
              </label>
              <input
                type="text"
                id="novoQtd"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
              />
            </div>
          </div>

          <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5"
                    onClick={salvarDados}
                >
                    Salvar
                </button>
        </form>
      </>
    );
  }

export default FormItens;

