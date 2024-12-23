import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRef, useState, useEffect, FormEvent } from "react"
import { Product } from '../App'

interface ProductUpdateProps {
    products: Product[]
    onUpdateProduct: (product: Product) => void
    onDeleteProduct: (id: string) => void
}


export function ProductUpdate({ products, onUpdateProduct, onDeleteProduct }: ProductUpdateProps) {
  const [open, setOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === selectedProductId)
    if (selectedProduct) {
        setName(selectedProduct.name)
        setAmount(selectedProduct.amount.toString())
        setPrice(selectedProduct.price.toString())
    }
  }, [selectedProductId, products])

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()
    const selectedProduct = products.find(p => p.id === selectedProductId)
    if (selectedProduct) {
        onUpdateProduct({
            ...selectedProduct,
            name,
            amount: parseInt(amount),
            price: parseFloat(price)
        })
        resetForm()
    }
}
const handleDelete = () => {
    if(selectedProductId) {
        onDeleteProduct(selectedProductId)
        resetForm()
    }

}
const resetForm = () => {
    setSelectedProductId("")
    setName("")
    setAmount("")
    setPrice("")
}
  return (
    <div>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
            >
            {selectedProductId
                ? products.find((product) => product.id === selectedProductId)?.name
                : "Select framework..."}
            <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent  style={{
            minWidth: buttonRef.current?.offsetWidth || "auto", // Sincroniza o tamanho do PopoverContent com o botão
          }}>
            <Command className="w-full">
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                {products.map((product) => (
                    <CommandItem
                    key={product.id}
                    value={product.id}
                    onSelect={(currentValue) => {
                        setSelectedProductId(currentValue === selectedProductId ? "" : currentValue)
                        setOpen(false)
                    }}
                    
                    >
                    {product.name}
                    <Check
                        className={cn(
                        "ml-auto",
                        selectedProductId === product.id ? "opacity-100" : "opacity-0"
                        )}
                    />
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>

        {selectedProductId && (
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <Label htmlFor="update-name">Product Name</Label>
                    <Input
                        id="update-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="update-amount">Amount</Label>
                    <Input
                        id="update-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="update-price">Price</Label>
                    <Input
                        id="update-price"
                        type="number"
                        step="0.01"
                        value={price}
                	    onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="space-x-2">
            	    <Button type="submit">Update Product</Button>
                    <Button type="button" variant="destructive" onClick={handleDelete}>Delete Product</Button>
                </div>
            </form>
        )}

    </div>
  )
}
