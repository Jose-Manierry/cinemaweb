type IngressoProps = {
  filme: string;
  sala: string;
  sessao: string;
  assento: string;
  preco: number;
};

export default function IngressoCard({ filme, sala, sessao, assento, preco }: IngressoProps) {
  return (
    <div className="ingresso-card">
      <h3>{filme}</h3>
      <p><strong>Sala:</strong> {sala}</p>
      <p><strong>Sessão:</strong> {sessao}</p>
      <p><strong>Assento:</strong> {assento}</p>
      <p><strong>Preço:</strong> R$ {preco.toFixed(2)}</p>
    </div>
  );
}
