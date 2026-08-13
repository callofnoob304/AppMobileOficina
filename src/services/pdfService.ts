import { formatBRL, formatDataHora, diasRestantes } from '../utils/format';
import { DadosOficina, OFICINA_PADRAO } from '../types/oficina';
import { generatePDF } from 'react-native-html-to-pdf';
import { StorageService } from './storageService';
import { Orcamento } from '../types/orcamento';
import Share from 'react-native-share';

function escapeHtml(texto?: string): string {
	if (!texto) return '';
	return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function linhaInfo(label: string, valor?: string): string {
	if (!valor) return '';
	return `
    <tr>
      <td class="info-label">${escapeHtml(label)}</td>
      <td class="info-valor">${escapeHtml(valor)}</td>
    </tr>
  `;
}

function montarHtml(orcamento: Orcamento, oficina: DadosOficina): string {
	const dias = diasRestantes(orcamento.criadoEm);
	const validadeTexto = dias > 0 ? `Válido por mais ${dias} dia${dias > 1 ? 's' : ''}` : 'Expira hoje';

	const itensHtml = orcamento.itens
		.map(
			item => `
		        <div class="item-linha">
		          <span class="col-desc">${escapeHtml(item.descricao)}</span>
		          <span class="col-qtd">${item.quantidade}</span>
		          <span class="col-valor">${formatBRL(item.valorUnitario)}</span>
		          <span class="col-subtotal">${formatBRL(item.quantidade * item.valorUnitario)}</span>
		        </div>
	      `,
		)
	.join('');

	return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, Helvetica, Arial, sans-serif;
            color: #1A1A1A;
            padding: 24px;
            margin: 0;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 4px solid #F2B705;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .oficina-nome {
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 4px 0;
          }
          .oficina-dado {
            font-size: 12px;
            color: #555;
            margin: 0;
          }
          .orcamento-numero {
            font-size: 22px;
            font-weight: 700;
            color: #B8262B;
            text-align: right;
            margin: 0;
          }
          .orcamento-data {
            font-size: 12px;
            color: #555;
            text-align: right;
            margin: 2px 0 0 0;
          }
          .validade {
            font-size: 12px;
            color: #8A6D00;
            text-align: right;
            margin: 4px 0 0 0;
          }
          .secao-titulo {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 20px 0 8px 0;
            color: #1A1A1A;
            border-left: 4px solid #F2B705;
            padding-left: 8px;
          }
          table.info { width: 100%; border-collapse: collapse; }
          .info-label { font-size: 12px; color: #777; padding: 3px 0; width: 35%; }
          .info-valor { font-size: 13px; color: #1A1A1A; padding: 3px 0; font-weight: 600; }
          .itens-cabecalho, .item-linha {
            display: flex;
            align-items: center;
          }
          .itens-cabecalho {
            font-size: 11px;
            text-transform: uppercase;
            color: #777;
            border-bottom: 2px solid #DDD;
            padding: 6px 4px;
            margin-top: 6px;
          }
          .item-linha {
            font-size: 13px;
            padding: 8px 4px;
            border-bottom: 1px solid #EEE;
          }
          .col-desc { flex: 1 1 0; padding-right: 8px; word-break: break-word; }
          .col-qtd { flex: 0 0 40px; text-align: center; }
          .col-valor { flex: 0 0 90px; text-align: right; }
          .col-subtotal { flex: 0 0 90px; text-align: right; }
          .total-row {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 12px;
            margin-top: 16px;
            padding-top: 12px;
            border-top: 2px solid #1A1A1A;
          }
          .total-label { font-size: 14px; font-weight: 700; }
          .total-valor { font-size: 22px; font-weight: 700; color: #B8262B; }
          .footer {
            margin-top: 32px;
            font-size: 11px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <p class="oficina-nome">${escapeHtml(oficina.nome)}</p>
            ${oficina.responsavel ? `<p class="oficina-dado">${escapeHtml(oficina.responsavel)}</p>` : ''}
            ${oficina.telefone ? `<p class="oficina-dado">Tel: ${escapeHtml(oficina.telefone)}</p>` : ''}
            ${oficina.endereco ? `<p class="oficina-dado">${escapeHtml(oficina.endereco)}</p>` : ''}
            ${oficina.cnpj ? `<p class="oficina-dado">CNPJ: ${escapeHtml(oficina.cnpj)}</p>` : ''}
          </div>
          <div>
            <p class="orcamento-numero">Orçamento Nº ${orcamento.numero}</p>
            <p class="orcamento-data">${escapeHtml(formatDataHora(orcamento.criadoEm))}</p>
            <p class="validade">${validadeTexto}</p>
          </div>
        </div>

        <div class="secao-titulo">Cliente</div>
        <table class="info">
          ${linhaInfo('Nome', orcamento.cliente.nome)}
          ${linhaInfo('Telefone', orcamento.cliente.telefone)}
          ${linhaInfo('CPF/CNPJ', orcamento.cliente.cpfCnpj)}
        </table>

        <div class="secao-titulo">Veículo</div>
        <table class="info">
          ${linhaInfo('Veículo', orcamento.veiculo.nome)}
          ${linhaInfo('Modelo', orcamento.veiculo.modelo)}
          ${linhaInfo('Ano', orcamento.veiculo.ano)}
          ${linhaInfo('Placa', orcamento.veiculo.placa)}
          ${linhaInfo('Km', orcamento.veiculo.km)}
        </table>

        <div class="secao-titulo">Serviços e peças</div>
        <div class="itens-cabecalho">
          <span class="col-desc">Descrição</span>
          <span class="col-qtd">Qtd</span>
          <span class="col-valor">Valor unit.</span>
          <span class="col-subtotal">Subtotal</span>
        </div>
        ${itensHtml}

        <div class="total-row">
          <span class="total-label">TOTAL</span>
          <span class="total-valor">${formatBRL(orcamento.total)}</span>
        </div>

        <p class="footer">Orçamento gerado pelo app ${escapeHtml(oficina.nome)} — sujeito a alteração sem aviso prévio.</p>
      </body>
    </html>
  `;
}

export const PdfService = {
	async gerar(orcamento: Orcamento): Promise<string> {
		const oficina = (await StorageService.get('oficina')) ?? OFICINA_PADRAO;
		const html = montarHtml(orcamento, oficina);

		const resultado = await generatePDF({
			html,
			fileName: `orcamento-${orcamento.numero}`,
			base64: false,
		});

		return resultado.filePath;
	},

	async compartilhar(orcamento: Orcamento): Promise<void> {
		const filePath = await this.gerar(orcamento);

		await Share.open({
			title: `Orçamento Nº ${orcamento.numero}`,
			url: `file://${filePath}`,
			type: 'application/pdf',
			filename: `Orcamento_${orcamento.numero}`,
			failOnCancel: false,
		});
	},
};
