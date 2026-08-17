export async function gerarIdCidade(): Promise<string> {
  const url = process.env.GERADOR_ID_URL as string;

  const resposta = await fetch(`${url}/gerar-id`);
  const dados = (await resposta.json()) as { id: string };

  return dados.id;
}
