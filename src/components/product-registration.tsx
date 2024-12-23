import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from '../App'
import React, { useState } from "react"

interface ProductRegistrationProps {
    addProduct: (newProduct: Product) => void; // Função recebida como prop para inserir o produto
  }

const ProductRegistration = ({addProduct}: ProductRegistrationProps) => {
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [price, setPrice] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newProduct: Product = {
            id,
            name,
            amount: parseFloat(amount),
            price: parseFloat(price)
        }

        addProduct(newProduct)

        setId("");
        setName("");
        setAmount("");
        setPrice("");
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="id" >ID</Label>
            <Input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />    
        </div>
        <div>
            <Label htmlFor="name" >Product Name</Label>
            <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />    
        </div>
        <div>
            <Label htmlFor="amount" >Amount</Label>
            <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />    
        </div>
        <div>
            <Label htmlFor="price" >Price</Label>
            <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />    
        </div>
        <Button type="submit">Add Product</Button>
    </form>
  )
}

export default ProductRegistration