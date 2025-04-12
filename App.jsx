
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CatalogoOnline() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Camiseta Estampada", preco: 59.9, imagem: "https://via.placeholder.com/150" },
    { id: 2, nome: "Tênis Esportivo", preco: 199.9, imagem: "https://via.placeholder.com/150" },
    { id: 3, nome: "Relógio Digital", preco: 299.9, imagem: "https://via.placeholder.com/150" },
  ]);

  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "", imagem: "" });
  const [busca, setBusca] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const adicionarProduto = () => {
    const id = produtos.length + 1;
    setProdutos([...produtos, { id, ...novoProduto }]);
    setNovoProduto({ nome: "", preco: "", imagem: "" });
  };

  const editarProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  };

  const excluirProduto = (id) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const gerarLinkWhatsapp = (produto) => {
    if (!whatsapp) return "#";
    const texto = \`Olá! Tenho interesse no produto: \${produto.nome} por R$ \${produto.preco.toFixed(2)}\`;
    return \`https://wa.me/\${whatsapp.replace(/\D/g, "")}?text=\${encodeURIComponent(texto)}\`;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catálogo de Produtos</h1>

      <Input
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="max-w-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} className="rounded-2xl shadow">
            <CardContent className="p-4 space-y-2">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded-xl" />
              <Input
                value={produto.nome}
                onChange={(e) => editarProduto(produto.id, "nome", e.target.value)}
              />
              <Input
                type="number"
                value={produto.preco}
                onChange={(e) => editarProduto(produto.id, "preco", parseFloat(e.target.value))}
              />
              <Input
                value={produto.imagem}
                onChange={(e) => editarProduto(produto.id, "imagem", e.target.value)}
              />
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => excluirProduto(produto.id)}>Excluir</Button>
                <a
                  href={gerarLinkWhatsapp(produto)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Comprar via WhatsApp</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Adicionar Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Nome do produto"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          />
          <Input
            placeholder="Preço"
            type="number"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })}
          />
          <Input
            placeholder="URL da imagem"
            value={novoProduto.imagem}
            onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
          />
        </div>
        <Button onClick={adicionarProduto} className="mt-2">Adicionar</Button>
      </div>

      <div className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold">Configurar WhatsApp</h2>
        <Input
          placeholder="Digite seu número com DDD (somente números)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
}
