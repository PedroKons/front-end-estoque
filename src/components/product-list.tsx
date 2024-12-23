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

interface productListProps {
    products: Product[]
}
const ProductList = ({ products = [] }: productListProps) => {
  return (
    <Table>
        <TableCaption>A list of your products</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ProductList