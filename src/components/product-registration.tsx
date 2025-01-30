/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

export interface ProductCreate {
    id: string;
    name: string;
    amount: number;
    price: number;
    coastprice?: number;
    lastpurchase?: Date;
    lastupdate?: Date;
    idcategorie: number;  
    idsupplier: number;   
}

interface ProductRegistrationProps {
    addProduct: (newProduct: ProductCreate) => void; 
  }
  
const ProductRegistration = ({addProduct}: ProductRegistrationProps) => {
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [coastprice, setCoastprice] = useState<number>(0)
    const [lastPurchase, setLastPurchase] = useState<Date>()
    const [supplier, setSupplier] = useState<string>("")
    const [lastUpdate, setLastUpdate] = useState<Date>()
    const [categorie, setCategorie] = useState<string>("")

    const [porcent, setPorcent] = useState<number>(0)
    const [percentage, setPercentage] = useState<number>(0);

    // Novos estados para as listas
    const [suppliers, setSuppliers] = useState<Array<{id: number, name: string}>>([])
    const [categories, setCategories] = useState<Array<{id: number, name: string}>>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newProduct: ProductCreate = {
            id,
            name,
            amount: parseFloat(amount),
            price: price,
            coastprice: coastprice,
            lastpurchase: lastPurchase,
            lastupdate: lastUpdate,
            idcategorie: parseInt(categorie), 
            idsupplier: parseInt(supplier)     
        }

        addProduct(newProduct)

        setId("");
        setName("");
        setAmount("");
        setPrice(0);
        setCoastprice(0);
        setSupplier("");
        setCategorie("");
        setPorcent(0)
    }

    useEffect(() => {
        setPrice(coastprice * (1 + porcent / 100)); 
    }, [coastprice, porcent]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Buscar fornecedores
                const suppliersResponse = await fetch('https://api-estoque-d5wc.onrender.com/supplier')
                const suppliersData = await suppliersResponse.json()
                setSuppliers(suppliersData.data || [])

                // Buscar categorias
                const categoriesResponse = await fetch('https://api-estoque-d5wc.onrender.com/categories')
                const categoriesData = await categoriesResponse.json()
                setCategories(categoriesData.data || [])
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            }
        }

        fetchData()
    }, [])

    // Função para calcular o preço baseado na porcentagem
    const calculatePrice = (coastPrice: number, percentage: number) => {
        const markup = 1 + (percentage / 100);
        setPrice(coastPrice * markup);
    };

    // Handler para mudança no preço de custo
    const handleCoastPriceChange = (value: number) => {
        setCoastprice(value);
        calculatePrice(value, percentage);
    };

    // Handler para mudança na porcentagem
    const handlePercentageChange = (value: number) => {
        setPercentage(value);
        if (coastprice) {
            calculatePrice(coastprice, value);
        }
    };

  return (
    <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primeira coluna */}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="id">ID</Label>
                    <Input 
                        type="text"
                        name="id"
                        placeholder="ID"
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input 
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>

            {/* Segunda coluna */}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="coastprice">Coast Price</Label>
                    <Input 
                        type="number"
                        name="coastprice"
                        placeholder="Coast Price"
                        onChange={(e) => handleCoastPriceChange(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <Label htmlFor="percentage">Markup Percentage (%)</Label>
                    <Input 
                        type="number"
                        name="percentage"
                        placeholder="Percentage"
                        value={percentage}
                        onChange={(e) => handlePercentageChange(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <Label htmlFor="price">Final Price</Label>
                    <Input 
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={price}
                        readOnly
                        className="bg-gray-100"
                    />
                </div>

                <div>
                    <Label htmlFor="lastpurchase">Last Purchase</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !lastPurchase && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {lastPurchase ? format(lastPurchase, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={lastPurchase}
                                onSelect={setLastPurchase}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Terceira coluna */}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="lastUpdate">Last Update</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !lastUpdate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {lastUpdate ? format(lastUpdate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={lastUpdate}
                                onSelect={setLastUpdate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <select 
                        name="supplier"
                        onChange={(e) => setSupplier(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">Select a supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label htmlFor="categorie">Category</Label>
                    <select 
                        name="categorie"
                        onChange={(e) => setCategorie(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {/* Botão de submit centralizado abaixo do grid */}
        <div className="mt-6 flex justify-center">
            <Button type="submit" className="px-8">
                Add Product
            </Button>
        </div>
    </form>
  )
}

export default ProductRegistration