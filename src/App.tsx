import { useState, useEffect } from "react"
import ProductList from "./components/product-list"
import Login from "./components/Login"
import ProductRegistration from "./components/product-registration"
import { ProductUpdate } from "./components/product-update"
import Cookies from "js-cookie"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  coastprice?: number;
  lastpurchase?: Date;
  lastupdate?: Date;
  categories?: {
    name: string;
  };
  supplier?: {
    name: string;
  };
}

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [auth, setAuth] = useState(false)
  const [activeContent, setActiveContent] = useState("view");


  useEffect(() => {
    fetchProducts()

    if (Cookies.get('auth') === 'true') {
      setAuth(true);
    }
  }, []);

  //Função para buscar produtos da API usando fetch
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response =  await fetch("https://api-estoque-d5wc.onrender.com/products", {
        method: "GET"
      })
      
      if(!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setProducts(result.data || [])

    } catch(err) {
      setError("Erro ao buscar os produtos. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const insertProducts = async (newProduct : Product) => {
    setLoading(true)
    try {
      const response = await fetch("https://api-estoque-d5wc.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct)
      })
      console.log(newProduct)
      const result = await response.json()

      if(!response.ok) {
        throw new Error(result.error || "Erro ao inserir o produto")
      }

      console.log("Produto inserido com sucesso:", result);

    } catch(err) {
      console.error("Erro ao inserir o produto:", err)
    }
  }

  const updateProducts = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`https://api-estoque-d5wc.onrender.com/products/${updatedProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          amount: updatedProduct.amount,
          price: updatedProduct.price,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error updating product");
      }
  
      // Atualiza o estado local
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
  
      return true;
    } catch (err) {
      console.error("Error updating:", err);
      return false;
    }
  };
  
  
  const deleteProducts = async (productId: string) => {
    try {
      const response = await fetch(`https://api-estoque-d5wc.onrender.com/products/${productId}`, {
        method: "DELETE",
      })
      if(!response.ok) {
        throw new Error("Error deleting product")
      }
      
      await fetchProducts() // Add this line to refresh the list
      return true
      
    } catch (err) {
      console.error("Error deleting:", err)
      return false
    }
  }
  
  const authenticateUser = async (email: string, password: string) => {
    try {
      const response = await fetch('https://api-estoque-d5wc.onrender.com/autenticacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha na autenticação');
      }

      const data = await response.json();
      console.log('Login bem-sucedido:', data);

      // Marca o usuário como autenticado
      Cookies.set('auth', 'true', { expires: 1 });
      setAuth(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erro ao autenticar o usuário:', err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Ajusta a altura para ocupar a tela inteira
        }}
        className="relative"    
      >
        {auth ? (
          <div className="mx-auto px-12 pt-12 bg-white rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Stock Management System</h1>
            <SidebarProvider>
              <AppSidebar setActiveContent={setActiveContent}/>
            </SidebarProvider>
              <div className="mt-4">
                {activeContent === "view" && (
                  isLoading ? <p>Loading...</p> : 
                  error ? <p className="text-red-500">{error}</p> : 
                  <ProductList
                    products={products}
                    onDelete={async (productId) => {
                      const success = await deleteProducts(productId);
                      if (success) {
                        setProducts((prevProducts) =>
                          prevProducts.filter((product) => product.id !== productId)
                        );
                      }
                    }}
                  />
                )}
                {activeContent === "register" && (
                  <ProductRegistration addProduct={insertProducts} />
                )}
                {activeContent === "update" && (
                  <ProductUpdate products={products} onUpdate={updateProducts} />
                )}
                {activeContent === "search" && (
                  <p>Função de busca será implementada futuramente.</p>
                )}
                {activeContent === "settings" && (
                  <p>Configurações em breve.</p>
                )}
              </div>
          </div>
        ) : (
          <Login onLogin={authenticateUser} error={error}/>
        )}
      </div>
    </>
  );
}

export default App 
