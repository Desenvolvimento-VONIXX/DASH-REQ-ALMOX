import React, {  useState,useEffect } from "react";
import Select from "react-select";
import { JX } from "../../lib/JX";



function FormNovoItem() {
    const [itens, setItens] = useState([]); 
    const [codprod, setCodprod] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [selectedCodprod, setSelectedCodprod] = useState(null); 
  
    useEffect(() => {
      mostrarItens(); 
    }, []);
  
    const mostrarItens = async () => {
      const query = "SELECT PRO.CODPROD, PRO.DESCRPROD FROM TGFPRO PRO WHERE CODGRUPOPROD = 6002800";
  
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
  
        setCodprod(codProdArray);
        setItens(itensArray); 
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
  
   
    const handleCodprodChange = (selectedOption) => {
      setSelectedCodprod(selectedOption); 
      setSelectedProduct(itens.find((item) => item.value === selectedOption?.value) || null); 
      console.log("Código selecionado:", selectedOption);
    };
  
    
    const handleProductChange = (selectedOption) => {
      setSelectedProduct(selectedOption); 
      setSelectedCodprod(codprod.find((item) => item.value === selectedOption?.value) || null); 
      console.log("Produto selecionado:", selectedOption);
    };


    const insereNaIte = (e) =>{
         let dadoIte = [];
         
         dadoIte.push({
            CODEMP: 1,
            CODPROD:codprod,
            QTDNEG:qtdneg,
            NUNOTA: nunota
         })

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
        </form>
      </>
    );
  }

export default FormNovoItem;

