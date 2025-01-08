import { Product } from '../App';

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from 'react';

interface ProductUpdateProps {
  products: Product[];
}

export function ProductUpdate({ products = [] }: ProductUpdateProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  // Busca o produto selecionado com base no ID
  const selectedProduct = products.find((product) => product.id.toString() === value);

  console.log("Products array:", products);
  console.log("Selected value (ID):", value);
  console.log("Selected product:", selectedProduct);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedProduct ? selectedProduct.name : "Select a product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
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

      {/* Exibição dos dados do produto selecionado */}
      {selectedProduct && (
        <div className="mt-4 p-4 border rounded">
          <h3>Product Details</h3>
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Amount:</strong> {selectedProduct.amount}</p>
          <p><strong>Price:</strong> {selectedProduct.price}</p>
        </div>
      )}
    </div>
  );
}
