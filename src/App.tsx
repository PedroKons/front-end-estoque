import { useState, useEffect } from "react";
import ProductList from "./components/product-list";
import ProductRegistration from "./components/product-registration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductUpdate } from "./components/product-update";

export interface Product {
  id: string
  name: string
  amount: number
  price: number
}

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  //Função para buscar produtos da API usando fetch
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response =  await fetch("http://localhost:3333/products", {
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
      const response = await fetch("http://localhost:3333/products", {
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

  const updateProducts = async (updatedProduct : Product) => {
    try {
      const response =  await fetch(`http://localhost:3333/products/${updatedProduct.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct)
      })
      if(!response.ok) {
        throw new Error("Erro ao atualizar o produto")
      }

      const result = await response.json()
      console.log("Produto atualizado: ", result)
    } catch(err) {
      console.error("Erro no update:", err)
    }
  }
  
  const deleteProducts = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3333/products/${productId}`, {
        method: "DELETE",
      })
      if(!response.ok) {
        throw new Error("Erro ao excluir o produto")
        
      }
      const result = await response.json()
      console.log("Produto excluído:", result)
    } catch (err) {
      console.error("Erro no delete:", err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Management System</h1>
      <Tabs defaultValue='view'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value="view">View Products</TabsTrigger>
          <TabsTrigger value="register">Register Product</TabsTrigger>
          <TabsTrigger value="update">Update/Delete Product</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && <ProductList products={products} />}
        </TabsContent>
        <TabsContent value="register">
          <ProductRegistration addProduct={insertProducts} />
        </TabsContent>
        <TabsContent value="update">
          <ProductUpdate 
            products={products}
            onUpdateProduct={(products) => updateProducts(products)}
            onDeleteProduct={(id) => deleteProducts(id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
