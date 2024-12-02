import React, {  useState,useEffect } from "react";
import Select from "react-select";
import { JX } from "../../lib/JX";




function FormItens({nota,closeForm}) {
  const handleBackToTable = () => {
    
    closeForm(); // Chama a função passada como prop
};

    const [itens, setItens] = useState([]); //lista para o select de decrprod
    const [codprod, setCodprod] = useState([]); //lista para o selct de codprod
    const [listaProdutos, setLista] = useState([]); //lista para pegar o codvol e valor unitario
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [selectedCodprod, setSelectedCodprod] = useState(""); 
    const [estoque, setEstoque] = useState("");
    const [novoQtd, setNovoQtd] = useState("");
    const [novoCodprod, setNovoCodprod] = useState("");
    
    useEffect(() => {
      mostrarItens(); 
    }, []);
  
    const mostrarItens = async () => {
      const query = " SELECT PRO.CODPROD, PRO.DESCRPROD, PRO.CODVOL  "
      +" ,ROUND(CUS.ENTRADASEMICMS,2) AS VALORUNIT ,EST.ESTOQUE  "
      +"  FROM TGFPRO PRO  "
      +" JOIN TGFEST EST ON EST.CODPROD = PRO.CODPROD AND EST.CODLOCAL = 1140000  "
      +" JOIN TGFCUS CUS ON CUS.CODPROD = PRO.CODPROD AND CUS.CODEMP = 1 AND DTATUAL =  "
      +"  (SELECT MAX(DTATUAL) FROM TGFCUS WHERE CODPROD = PRO.CODPROD AND CODEMP =1 ) "
      +" WHERE USOPROD IN ('B','I','C') AND PRO.ATIVO = 'S'  "
      +" AND PRO.CODPROD = (SELECT TOP 1 CODPROD FROM TGFCUS WHERE TGFCUS.CODPROD = PRO.CODPROD) "
      +"  AND CUS.ENTRADASEMICMS IS NOT NULL ";
  
      try {
        const result = await JX.consultar(query); 
        
  
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
        const listaGeralProdutos = result.map((item) => ({
            CODPROD: item.CODPROD,
            DESCRPROD: item.DESCRPROD,
            CODVOL: item.CODVOL,
            VALORUNIT:item.VALORUNIT,
            ESTOQUE:item.ESTOQUE
        }));


        setCodprod(codProdArray);
        setItens(itensArray); 
        setLista(listaGeralProdutos);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
  
    
    const handleCodprodChange = (selectedOption) => {
      setSelectedCodprod(selectedOption); 
      setSelectedProduct(itens.find((item) => item.value === selectedOption?.value) || null); 
      setNovoCodprod(selectedOption.value);
      setEstoque(listaProdutos.find((item) => item.CODPROD === selectedOption.value)?.ESTOQUE)   
    };
  
    
    const handleProductChange = (selectedOption) => {
      setSelectedProduct(selectedOption); 
      setSelectedCodprod(codprod.find((item) => item.value === selectedOption?.value) || null); 
      setNovoCodprod(selectedOption.value);
      setEstoque(listaProdutos.find((item) => item.CODPROD === selectedOption.value)?.ESTOQUE)   
    };

    const handleQtdChange = (e) => {
      setNovoQtd(e.target.value); 
    };

    const salvarDados = async (e) =>{

      if((novoCodprod == null || novoCodprod == "") || (novoQtd == "" || novoQtd == null)){
        alert("Escolha o produto e digite a quantidade.");
      }else if (novoQtd > estoque || estoque <=0){
        alert("Estoque insuficiente.")
      }else{
        
        const produto = listaProdutos.find((item) => item.CODPROD == novoCodprod)
        const vlrTotal = parseFloat(produto.VALORUNIT) * novoQtd;
        //console.log("nota="+nota+"NOVO QTD= "+novoQtd+"  CODPROD= "+novoCodprod +" produto="+produto.VALORUNIT+" vlrTotal "+vlrTotal);
        let dadosIte = [];


        dadosIte.push({
            CODEMP:1,
            NUNOTA:nota,
            CODPROD:novoCodprod,
            CODLOCALORIG:1140000,
            CODVOL:produto.CODVOL,
            RESERVA:"S",
            ATUALESTOQUE:1,
            QTDNEG:novoQtd,
            VLRTOT:vlrTotal,
            CODVEND:0,
            VLRDESC:0,


        })



        await JX.salvar(dadosIte[0], "ItemNota", [{}])
        .then((result) => {
          alert('Produto cadastrado com sucesso.');
          handleBackToTable();
        })
        .catch((error) => {
          alert('Não foi possível cadastrar o produto, tente novamente em alguns minutos.')
          handleBackToTable();
        });
      
       //console.log("JX.SALVAR="+result.status+"  JX"+result);
      



      }
      

    }
  
    return (
      <>
        <form>
          <div className="flex space-x-4 mt-2">
            {/* Select de Código */}
            <div className="w-1/4">
              <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                Cód. Produto
              </label>
              <Select
                id="novoCodprod"
                options={codprod} 
                value={selectedCodprod} // Vincula ao estado
                onChange={handleCodprodChange} 
                placeholder="Digite para buscar..." 
                isClearable 
              />
            </div>
  
            {/* Select de Produto */}
            <div className="w-1/4">
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

            <div className="w-1/4">
              <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                Estoque 
              </label>
              <input
              disabled
                type="number"
                id="novoQtd"
                value={estoque}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                
              />
            </div>
  
            {/* Campo de Quantidade */}
            <div className="w-1/4">
              <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                Quantidade
              </label>
              <input
                type="number"
                id="novoQtd"
                value={novoQtd}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                onChange={handleQtdChange}
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

