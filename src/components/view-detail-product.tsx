import { Card, CardContent } from "@/components/ui/card"
import { Product } from '../App'

interface ViewDetailProductProps {
  product: Product; // Corrigido para refletir que um único produto é esperado
}

const ViewDetailProduct = ({ product }: ViewDetailProductProps) => {
  const {
    id,
    name,
    price,
    amount,
    coastprice,
    lastpurchase,
    lastupdate,
    categories,
    supplier,
  } = product;

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img 
              src="https://placehold.co/150x150" 
              alt="imagem" 
              className="rounded-lg object-cover"
              width={150}
              height={150}
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-4">{name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID do Produto</p>
                <p className="font-semibold">{id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preço</p>
                <p className="font-semibold text-green-600">{price}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quantidade em Estoque</p>
                <p className="font-semibold">{amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preço de Custo</p>
                <p className="font-semibold">{coastprice}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Compra</p>
                <p className="font-semibold">{formatDate(lastpurchase)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fornecedor</p>
                <p className="font-semibold">{supplier?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
                <p className="font-semibold">{formatDate(lastupdate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                <p className="font-semibold">{categories?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ViewDetailProduct