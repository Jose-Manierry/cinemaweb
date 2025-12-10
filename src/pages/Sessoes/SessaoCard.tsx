interface SessaoCardProps {
    filme: {
        titulo: string;
        imagem?: string;
    };
    sala: {
        nome: string;
    };
    horario: string;
}

export default function SessaoCard({ filme, sala, horario }: SessaoCardProps) {
    const dataFormatada = new Date(horario).toLocaleString('pt-BR');

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
            {filme.imagem && <img src={filme.imagem} alt={filme.titulo} style={{ width: '100px', marginRight: '20px' }} />}
            <div>
                <h2>{filme.titulo}</h2>
                <p><strong>Sala:</strong> {sala.nome}</p>
                <p><strong>Horário:</strong> {dataFormatada}</p>
            </div>
        </div>
    );
}