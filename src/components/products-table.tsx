import { motion } from "framer-motion"

const products = [
  { id: 1, name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { id: 2, name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { id: 3, name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { id: 4, name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { id: 5, name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
]

export default function ProductsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Quantity</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: "hsl(var(--color-muted) / 0.5)" }}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4 text-sm">{product.name}</td>
                <td className="py-3 px-4 text-sm">{product.price}</td>
                <td className="py-3 px-4 text-sm">{product.quantity}</td>
                <td className="py-3 px-4 text-sm font-semibold">{product.amount}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
