import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Product } from '../App'
import { Button } from "./ui/button"
import { useState } from "react"
import ViewDetailProduct  from "./view-detail-product"

interface productListProps {
    products: Product[],
    onDelete: (productId: string) => Promise<void>
}

const ProductList = ({ products = [], onDelete }: productListProps) => {
    const [isViewProduct, setIsViewProduct] = useState<Product | null>(null);

    const handleViewProduct = (product: Product) => {
        setIsViewProduct(product);
      };
    
      const handleBackToList = () => {
        setIsViewProduct(null);
      };

  return (
    <div>
        {isViewProduct ? (
                <div>
                    <Button onClick={handleBackToList} variant="outline" className="mb-4">
                        Voltar para a lista
                    </Button>
                    <ViewDetailProduct product={isViewProduct} />
                </div>
        ) : (
            <Table>
                <TableCaption>A list of your products</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.categories?.name}</TableCell>
                            <TableCell>{product.amount}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Button onClick={() => onDelete(product.id)} variant="destructive">Delete</Button>
                                <Button onClick={() => handleViewProduct(product)} variant="outline">Ver</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </div>
  )
}

export default ProductList