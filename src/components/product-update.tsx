import { Product } from '../App'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
import { FormEvent, useEffect, useState } from 'react'

interface ProductUpdateProps {
  products: Product[]
  onUpdate: (updatedProduct: Product) => void
}

export function ProductUpdate({ products = [], onUpdate }: ProductUpdateProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const [sucess, setSucess] = useState(false)

  const [editName, setEditName] = useState<string>("")
  const [editAmount, setEditAmount] = useState<number>(0)
  const [editPrice, setEditPrice] = useState<number>(0)

  // Busca o produto selecionado com base no ID
  const selectedProduct = products.find((product) => product.id.toString() === value)

  useEffect(() => {
    if(selectedProduct) {
      setEditName(selectedProduct.name)
      setEditAmount(selectedProduct.amount)
      setEditPrice(selectedProduct.price)
    }
  }, [selectedProduct])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(!selectedProduct) return

    const updatedProduct = {
      id: selectedProduct.id,
      name: editName,
      amount: editAmount,
      price: editPrice,
    }

    onUpdate(updatedProduct)
    setSucess(true)
    setTimeout(() => {
      setSucess(false);
    }, 3000);
    
    setValue("");
    setEditName("");
    setEditAmount(0);
    setEditPrice(0);
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedProduct ? selectedProduct.name : "Select a product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100vh] p-0">
          <Command>
            <CommandInput placeholder="Search products..." />
            <CommandList>
              <CommandEmpty>No products found.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id.toString()} // Use o ID como valor
                    onSelect={(currentValue) => {
                      setValue(currentValue); // Atualiza o estado com o ID
                      setOpen(false); // Fecha o popover
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {product.name} {/* Mostra o nome do produto */}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedProduct && (
        <div className="mt-4 p-4 border rounded">
          <h3>Atualização de Produto</h3>
          <form onSubmit={handleSubmit}>
            <Label>ID</Label>
            <Input type="text" value={selectedProduct.id} disabled />

            <Label>Name</Label>
            <Input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />

            <Label>Amount</Label>
            <Input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(Number(e.target.value))}
            />

            <Label>Price</Label>
            <Input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
            />

            <div className="pt-5">
              <Button
                type="submit"
                variant="secondary" 
              >
                {sucess ? "Atualizado!" : "Editar"}
              </Button>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
}
